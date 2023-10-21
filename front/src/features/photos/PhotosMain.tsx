import React, {useEffect, useState} from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import {selectPhotos, selectPhotosLoading} from "./photosSlice";
import {fetchPhotos} from "./photosThunk";
import SpinnerLoading from '../../components/UI/SpinnerLoading/ SpinnerLoading';
import PhotoItem from "./Components/PhotoItem";
import './photo.css';
import ModalUI from "../../components/UI/ModalUI/ModalUI";
import {useParams} from "react-router-dom";

const PhotosMain = () => {
    const { id } = useParams() as { id:string };
    const dispatch = useAppDispatch();
    const photos = useAppSelector(selectPhotos);
    const loading = useAppSelector(selectPhotosLoading);
    const [show, setShow] = useState(false);
    const [pic, setPic] = useState<string | null>(null);

    useEffect(() => {
        dispatch(fetchPhotos());
    }, [dispatch]);

    const open = async (pic: string) => {
        setPic(pic);
        setShow(true);
    };

    const closeModal = () => {
        setPic(null);
        setShow(false);
    };

    return (
        <section>
            {loading ? <SpinnerLoading/> :
                <div className="wrap">
                    {photos.map((item) => (
                        <PhotoItem
                            key={item._id}
                            photo={item}
                            openModal={() => open(item.image)}
                            isUser={!!id}
                        />
                    ))}
                    <ModalUI show={show} image={pic} onClose={closeModal} />
                </div>}
        </section>
    );
};

export default PhotosMain;