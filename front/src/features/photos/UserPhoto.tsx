import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {fetchUserPhotos} from "./photosThunk";
import SpinnerLoading from "../../components/UI/SpinnerLoading/ SpinnerLoading";
import PhotoItem from "./Components/PhotoItem";
import ModalUI from "../../components/UI/ModalUI/ModalUI";
import {selectPhotosCreateLoading, selectUserPhotos} from "./photosSlice";
import {selectUser} from "../users/usersSlice";
import {Button} from "@mui/material";
import {Link} from "react-router-dom";

const UserPhoto = () => {
    const { id } = useParams() as { id:string };
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const userPhotos = useAppSelector(selectUserPhotos);
    const loading = useAppSelector(selectPhotosCreateLoading);
    const [show, setShow] = useState(false);
    const [pic, setPic] = useState<string | null>(null);

    const open = async (pic: string) => {
        setPic(pic);
        setShow(true);
    };

    const closeModal = () => {
        setPic(null);
        setShow(false);
    };

    useEffect(() => {
        if (id) {
            dispatch(fetchUserPhotos(id));
        }
    },[dispatch , id]);

    return (
        <section>
            {loading ? <SpinnerLoading/> :
                <div>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <h1
                            style={{ fontSize: '30px'}}>
                            {userPhotos[0]?.user.displayName}'s Gallery</h1>
                        {user?._id === id ? <Button component={Link} to="/add_photo">Add new Photo</Button> : null}
                    </div>
                    <div className="wrap">
                        {userPhotos.map((item) => (
                            <PhotoItem
                                key={item._id}
                                photo={item}
                                openModal={() => open(item.image)}
                                isUser={!!id}
                                id={id}
                            />
                        ))}
                        <ModalUI show={show} image={pic} onClose={closeModal} />
                    </div>
                </div>}
        </section>
    );
};

export default UserPhoto;