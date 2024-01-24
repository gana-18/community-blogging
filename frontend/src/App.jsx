import React, { useEffect, useState } from 'react';
import './App.css';
import Login from './pages/Login';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from './actions/authActions';
import { fetchPosts } from './actions/postActions';
import { selectUser } from './reducers/authReducer';
import { setLogin} from './reducers/authReducer';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from "./pages/Home";
import Header from "./components/Header";
import BlogInput from "./pages/Blog";
import Profile from "./pages/Profile";
import Post from "./pages/Post";
import Bookmarks from "./pages/Bookmarks";
import Following from "./pages/Following";
import Signup from './pages/Signup';
function App() {
  const user=useSelector(selectUser);
  return (
    <>
      <div>
        <Header user={user}/>
          <Routes>
            <Route path="/" element={user? <Navigate to ="/home"/>:<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path={user? `/home/following/${user._id}` : `/`} element={<Home/>}/>
            <Route path= {user ? `/post/create/${user._id}` : '/'} element={<BlogInput/>}/>
            <Route path="/profile/:id" element={<Profile/>}/>
            <Route path="/post/:id" element={<Post/>}/>
            <Route path="/bookmarks" element={<Bookmarks/>}/>
            <Route path="/user/following" element={<Following/>}/>
          </Routes>
        </div>
    </>
  );
}

export default App;
