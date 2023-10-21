import React from 'react';
import {IPhoto} from "../../../types";
import {apiUrl} from "../../../constants";

interface IProps {
    photo: IPhoto;
}

const PhotoItem: React.FC<IProps> = ({photo}) => {
    return (
        <div className="card">
            <img src={apiUrl + '/' + photo.image} alt="image" />

            <div className="card-content">
                <p>{photo.name}</p>
                <p>{photo.user.displayName}</p>
            </div>
        </div>


    );
};

export default PhotoItem;