import React from 'react';
import {IPhoto} from "../../../types";
import {apiUrl} from "../../../constants";
import {Link} from "react-router-dom";

interface IProps {
    photo: IPhoto;
    openModal: () => void;
    isUser: boolean;
}

const PhotoItem: React.FC<IProps> = ({photo, openModal, isUser}) => {
    return (
        <div className="card">
            <img onClick={openModal} src={apiUrl + '/' + photo.image} alt="image" />

            <div className="card-content">
                <p>{photo.name}</p>
                {isUser ? null : <Link to={'/photos/' + photo.user._id}>By: {photo.user.displayName}</Link>}
            </div>
        </div>


    );
};

export default PhotoItem;