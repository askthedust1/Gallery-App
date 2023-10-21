import React, {useEffect} from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import {selectPhotos, selectPhotosLoading} from "./photosSlice";
import {fetchPhotos} from "./photosThunk";
import SpinnerLoading from '../../components/UI/SpinnerLoading/ SpinnerLoading';
import PhotoItem from "./Components/PhotoItem";
import './photo.css';

const PhotosMain = () => {
    const dispatch = useAppDispatch();
    const photos = useAppSelector(selectPhotos);
    const loading = useAppSelector(selectPhotosLoading);

    useEffect(() => {
        dispatch(fetchPhotos());
    }, [dispatch]);

    return (
        <section>
            {loading ? <SpinnerLoading/> :
                <div className="wrap">
                    {photos.map((item) => (
                        <PhotoItem
                            key={item._id}
                            photo={item}
                        />
                    ))}
                </div>}
        </section>
    );
};

export default PhotosMain;