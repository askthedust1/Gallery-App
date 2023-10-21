import {IPhoto} from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import {fetchPhotos} from "./photosThunk";

interface PhotosState {
    photos: IPhoto[];
    fetchLoading: boolean;
    createLoading: boolean;
    delLoading: boolean;
}

const initialState: PhotosState = {
    photos: [],
    fetchLoading: false,
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

        // builder.addCase(createAlbum.pending, (state) => {
        //     state.createLoading = true;
        // });
        //
        // builder.addCase(createAlbum.fulfilled, (state) => {
        //     state.createLoading = false;
        // });
        //
        // builder.addCase(createAlbum.rejected, (state) => {
        //     state.createLoading = false;
        // });
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
export const selectPhotosDel = (state: RootState) => state.photos.delLoading;
export const selectPhotosCreateLoading = (state: RootState) => state.photos.createLoading;