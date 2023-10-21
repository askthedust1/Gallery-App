import React from "react";
import { IPhoto } from "../../../types";
import { apiUrl } from "../../../constants";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { selectUser } from "../../users/usersSlice";
import { selectPhotosDel } from "../photosSlice";
import { deletePhoto, fetchPhotos, fetchUserPhotos } from "../photosThunk";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface IProps {
  photo: IPhoto;
  openModal: () => void;
  isUser: boolean;
  id?: string;
}

const PhotoItem: React.FC<IProps> = ({ photo, openModal, isUser, id }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const deleteLoading = useAppSelector(selectPhotosDel);
  const onDelete = async () => {
    if (window.confirm("Delete this photo ?")) {
      try {
        await dispatch(deletePhoto(photo._id));
        if (isUser) {
          dispatch(fetchUserPhotos(photo.user._id));
        } else {
          dispatch(fetchPhotos());
        }
      } catch (e) {
        alert("Not deleted");
      }
    }
  };

  return (
    <div className="card">
      <img
        onClick={openModal}
        src={apiUrl + "/" + photo.image}
        alt={photo.name}
      />

      <div className="card-content">
        <p>{photo.name}</p>
        {isUser ? null : (
          <Link to={"/photos/" + photo.user._id} className="name">
            By: {photo.user.displayName}
          </Link>
        )}
        <div>
          {(user && user?._id === id) || (user && user?.role === "admin") ? (
            <Button
              onClick={onDelete}
              sx={{ color: "white", marginLeft: "20px" }}
              disabled={deleteLoading}
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default PhotoItem;
