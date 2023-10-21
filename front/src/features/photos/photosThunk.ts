import { createAsyncThunk } from "@reduxjs/toolkit";
import {IPhoto, PhotoMutation, RegisterMutation, RegisterResponse, ValidationError} from "../../types";
import axiosApi from "../../axiosApi";
import {isAxiosError} from "axios";

export const fetchPhotos = createAsyncThunk<IPhoto[]>
('photos/fetchAll', async () => {
    const photosResponse = await axiosApi.get<IPhoto[]>('/photos');
    return photosResponse.data;
});

export const createPhoto = createAsyncThunk<
    void,
    PhotoMutation,
    { rejectValue: ValidationError }
>(
    'photos/create',
    async (photoMutation, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            const keys = Object.keys(photoMutation) as (keyof PhotoMutation)[];

            keys.forEach((key) => {
                const value = photoMutation[key];

                if (value !== null) {
                    formData.append(key, value);
                }
            });

            await axiosApi.post('/photos', formData);
        } catch (e) {
            if (isAxiosError(e) && e.response && e.response.status === 400) {
                return rejectWithValue(e.response.data);
            }

            throw e;
        }
    },
);