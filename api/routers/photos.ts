import express from 'express';
import { imagesUpload } from '../multer';
import mongoose from 'mongoose';
import auth, {RequestWithUser} from "../middleware/auth";
import Photo from "../models/Photo";
import {IPhoto} from "../types";
import config from "../config";
import * as fs from "fs";

const photosRouter = express.Router();

photosRouter.get('/', async (req, res) => {
    try {
        if (req.query.user) {
            const queryId = req.query.user as string;
            const result = await Photo.find({ user: queryId })
                .populate('user', 'displayName');
            return res.send(result);
        }

        const photo = await Photo.find().populate('user', 'displayName');
        return res.send(photo);

    } catch {
        return res.sendStatus(500);
    }
});


photosRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
        const user = (req as RequestWithUser).user;

        if (!req.body.name) return res.status(400).send({ error: "Name is required!" });

        if (!req.file) return res.status(400).send({ error: "Photo is required!" });

        const photoData: IPhoto = {
            name: req.body.name,
            image: req.file.filename,
            user: user._id.toString()
        };

        const photo = new Photo(photoData);

        try {
            await photo.save();
            return res.send({message: 'Success', photo});
        } catch (e) {
            if (e instanceof mongoose.Error.ValidationError) {
                return res.status(400).send(e);
            }

            next(e);
        }
    },
);

photosRouter.delete("/:id", auth, async (req, res, next) => {
    try {
        const photo_id = req.params.id;
        const photo = await Photo.findOne({ _id: photo_id });

        if (!photo) {
            return res.status(404).send({ error: "Not found!" });
        }

        await Photo.deleteOne({ _id: photo_id });

        const filePath = config.publicPath + '/' + photo.image;
        fs.unlinkSync(filePath);

        return res.send("Photo deleted");
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(error);
        }

        return next(error);
    }
});

export default photosRouter;