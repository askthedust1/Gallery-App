import React from "react";
import "./App.css";
import AppToolbar from "./components/AppToolbar/AppToolbar";
import { Route, Routes } from "react-router-dom";
import Login from "./features/users/Login";
import Register from "./features/users/Register";
import PhotosMain from "./features/photos/PhotosMain";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import PhotoForm from "./features/photos/Components/PhotoForm";
import { useAppSelector } from "./app/hook";
import { selectUser } from "./features/users/usersSlice";
import UserPhoto from "./features/photos/UserPhoto";

const App = () => {
  const user = useAppSelector(selectUser);

  return (
    <div className="App">
      <AppToolbar />
      <Routes>
        <Route path="/" element={<PhotosMain />} />
        <Route path="/photos/:id" element={<UserPhoto />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/add_photo"
          element={
            <ProtectedRoute isAllowed={!!user}>
              <PhotoForm />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
