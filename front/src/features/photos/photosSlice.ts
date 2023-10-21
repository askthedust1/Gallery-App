import {IPhoto, ValidationError} from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import {createPhoto, fetchPhotos} from "./photosThunk";

interface PhotosState {
    photos: IPhoto[];
    fetchLoading: boolean;
    createError: ValidationError | null;
    createLoading: boolean;
    delLoading: boolean;
}

const initialState: PhotosState = {
    photos: [],
    fetchLoading: false,
    createError: null,
    createLoading: false,
    delLoading: false,
};

export const PhotosSlice = createSlice({
    name: 'photo',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPhotos.pending, (state) => {
            state.fetchLoading = true;
        });

        builder.addCase(fetchPhotos.fulfilled, (state, { payload: ph }) => {
            state.fetchLoading = false;
            state.photos = ph;
        });

        builder.addCase(fetchPhotos.rejected, (state) => {
            state.fetchLoading = false;
        });

        builder.addCase(createPhoto.pending, (state) => {
            state.createLoading = true;
            state.createError = null;
        });

        builder.addCase(createPhoto.fulfilled, (state) => {
            state.createLoading = false;
        });

        builder.addCase(createPhoto.rejected, (state, { payload: error }) => {
            state.createLoading = false;
            state.createError = error || null;
        });
        //
        // builder.addCase(delAlbums.pending, (state) => {
        //     state.delLoading = true;
        // });
        //
        // builder.addCase(delAlbums.fulfilled, (state) => {
        //     state.delLoading = false;
        // });
        //
        // builder.addCase(delAlbums.rejected, (state) => {
        //     state.delLoading = false;
        // });
    },
});

export const photosReducer = PhotosSlice.reducer;
export const selectPhotos = (state: RootState) => state.photos.photos;
export const selectPhotosLoading = (state: RootState) => state.photos.fetchLoading;
export const selectPhotosError = (state: RootState) => state.photos.createError;
export const selectPhotosDel = (state: RootState) => state.photos.delLoading;
export const selectPhotosCreateLoading = (state: RootState) => state.photos.createLoading;