import './App.css';
import Login from './pages/Login';
import {useSelector } from 'react-redux';
import { selectUser } from './reducers/authReducer';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from "./pages/Home";
import Header from "./components/Header";
import BlogInput from "./pages/Blog";
import Profile from "./pages/Profile";
import Post from "./pages/Post";
import Bookmarks from "./pages/Bookmarks";
import Following from "./pages/Following";
import Signup from './pages/Signup';
import TopicPage from './pages/TopicPage';
import EditBlog from './pages/EditBlog';
function App() {
  const user=useSelector(selectUser);
  return (
    <>
      <div>
        <Header user={user}/>
          <Routes>
            <Route path="/" element={user? <Navigate to ="/home"/>:<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/home" element={user?<Home/>:<Navigate to ="/"/>}/>
            <Route path={user? `/home/following/${user._id}` : `/`} element={<Home/>}/>
            <Route path= {user ? `/post/create/${user._id}` : '/'} element={<BlogInput/>}/>
            <Route path="/profile/:id" element={<Profile/>}/>
            <Route path="/post/:id" element={<Post/>}/>
            <Route path="/edit/:id" element={<EditBlog/>}/>
            <Route path="/bookmarks" element={<Bookmarks/>}/>
            <Route path="/user/following" element={<Following/>}/>
            <Route path="/topics/:id" element={<TopicPage/>}/>
          </Routes>
        </div>
    </>
  );
}

export default App;
