import Article from "../components/Article";
import { useState, useEffect } from 'react';
import { Routes, Route, NavLink, Link, useLocation } from "react-router-dom";
import {useSelector,useDispatch} from 'react-redux';
import {fetchPosts,fetchFollowingPosts} from '../actions/postActions';
import IMAGES from '../images/images';
function Home() {
  const {user} = useSelector((state) => state.auth);
  console.log(user)
  const {posts} = useSelector((state) => state.post);
  console.log(posts)
  const {followingPosts} = useSelector((state) => state.post);
  console.log("followposts",followingPosts)
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts())
    dispatch(fetchFollowingPosts(user._id))
  },[ dispatch])

  const cards = posts?.map(item => (
    <Article
      key={item._id}
      item={item}
    />
  ));

  const followcards = followingPosts?.map(item => (
    <Article
      key={item._id}
      item={item}
    />
  ));
const url=user? `/home/following/${user._id}` : `/`;
  
  return (
    <>
      <div className="home">
        <div className="homelinks">
          <div>
          <NavLink to="/home" style={{ textDecoration: 'none',display:'flex',alignItems:'center',justifyContent:'center', color: location.pathname === "/home" ? '#3B82F6' : 'black' }}
              activestyle={{ color: 'black' }}>
               <img src={IMAGES.magic} alt="magic" /> Personalized
        </NavLink>
          </div>
        <div>
        <NavLink to={url} style={{ textDecoration: 'none',display:'flex',alignItems:'center',justifyContent:'center',color: location.pathname === "/home/following" ? '#3B82F6' : 'black' }}
              activestyle={{ color: '#3B82F6' }}
            >
             <img src={IMAGES.following} alt="following"/> Following
        </NavLink>
        </div>
        
       </div>
          {location.pathname ===(url) ? followcards : cards}
      </div>
    </>
  )
}

export default Home;
