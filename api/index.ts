import express from 'express';
import mongoose from 'mongoose';
import usersRouter from './routers/users';
import cors from 'cors';
import config from './config';

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/users', usersRouter);

const run = async () => {
    await mongoose.connect(config.db);

    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    });

    process.on('exit', () => {
        mongoose.disconnect();
    });
};

run().catch((e) => console.error(e));