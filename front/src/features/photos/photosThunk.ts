import { createAsyncThunk } from "@reduxjs/toolkit";
import {IPhoto} from "../../types";
import axiosApi from "../../axiosApi";

export const fetchPhotos = createAsyncThunk<IPhoto[]>
('photos/fetchAll', async () => {
    const photosResponse = await axiosApi.get<IPhoto[]>('/photos');
    return photosResponse.data;
});