import React from 'react';
import './App.css';
import AppToolbar from "./components/AppToolbar/AppToolbar";
import {Route, Routes } from 'react-router-dom';
import Login from "./features/users/Login";
import Register from "./features/users/Register";
import PhotosMain from "./features/photos/PhotosMain";

const App = () => {
  return (
    <div className="App">
      <AppToolbar/>
        <Routes>
            <Route path='/' element={<PhotosMain/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
        </Routes>

    </div>
  );
};

export default App;
