import axios from 'axios';
import {setPosts,setFollowingPosts,setAuthor,setFollowAuthor,setLikes,setBookmarks} from '../reducers/postReducer';
import {createAsyncThunk} from '@reduxjs/toolkit';

export const fetchPosts = () => async (dispatch) => {
    try {
        const url=`${import.meta.env.VITE_BACKEND_URL}/home`
        const response= await axios.get(url);

            const posts=response.data;
            // Dispatch action to update the Redux store
            dispatch(setPosts(posts));
    } catch (error) {
      console.error('post fetch failed:', error);
      // Dispatch action for login failure if needed
       dispatch({ type: 'post_fetch_failure', payload: { error: 'post fetch failed' } });
    }
  };

export const fetchFollowingPosts = (id) => async (dispatch) => {
        try {
            const url=`${import.meta.env.VITE_BACKEND_URL}/following/${id}`
            const response= await axios.get(url);
            if(response.status==200){
                const posts=response.data;
                // Dispatch action to update the Redux store
                dispatch(setFollowingPosts(posts));
            } else {
                throw new Error(" following post rendering has failed!");
              }
        } catch (error) {
          console.error('post fetch failed:', error);
          // Dispatch action for login failure if needed
           dispatch({ type: 'follwing_post_fetch_failure', payload: { error: 'post fetch failed' } });
        }
}

export const fetchAuthor = (id) => async (dispatch) => {
    try {
        const url=`${import.meta.env.VITE_BACKEND_URL}/user/${id}`
        const response= await axios.get(url);
        if(response.status==200){
            const author= response.data;
            // Dispatch action to update the Redux store
            dispatch(setAuthor(author));
            return author;
        } else {
            throw new Error(" author rendering has failed!");
          }
    } catch (error) {
      console.error('author fetch failed:', error);
      // Dispatch action for login failure if needed
       dispatch({ type: 'author_fetch_failure', payload: { error: 'author fetch failed' } });
    }
}

export const fetchFollowers = (id) => async (dispatch) => {
    try {
        const url=`${import.meta.env.VITE_BACKEND_URL}/followers/${id}`
        const response= await axios.get(url);
        if(response.status==200){
            const followers= await response.json();
            // Dispatch action to update the Redux store
            dispatch(setFollowAuthor(followers));
        } else {
            throw new Error(" followers rendering has failed!");
          }
    } catch (error) {
      console.error('followers fetch failed:', error);
      // Dispatch action for login failure if needed
       dispatch({ type: 'followers_fetch_failure', payload: { error: 'followers fetch failed' } });
    }
}

export const fetchFollowing = (id) => async (dispatch) => {
    try {
        const url=`${import.meta.env.VITE_BACKEND_URL}/following/${id}`
        const response= await axios.get(url);
        if(response.status==200){
            const following= await response.json();
            // Dispatch action to update the Redux store
            dispatch(setFollowAuthor(following));
        } else {
            throw new Error(" following rendering has failed!");
          }
    } catch (error) {
      console.error('following fetch failed:', error);
      // Dispatch action for login failure if needed
       dispatch({ type: 'following_fetch_failure', payload: { error: 'following fetch failed' } });
    }
}

export const addFollowing = (authorId,userId) => async(dispatch)=>{
    try {
        const url=`${import.meta.env.VITE_BACKEND_URL}/follow/${authorId}`
        const response= await axios.post(url,{followingUser:userId})
        const resObject = await response.data;
        return resObject;
    } catch (error) {
      console.error('following fetch failed:', error);
      // Dispatch action for login failure if needed
       dispatch({ type: 'following_fetch_failure', payload: { error: 'following fetch failed' } });
    }
}

export const removeFollowing = (authorId,userId) => async(dispatch)=>{
    try {
        const url=`${import.meta.env.VITE_BACKEND_URL}/unfollow/${authorId}`
        const response= await axios.post(url,{followingUser:userId})
        const resObject = await response.data;
        return resObject; 
    } catch (error) {
      console.error('following fetch failed:', error);
      // Dispatch action for login failure if needed
       dispatch({ type: 'following_fetch_failure', payload: { error: 'following fetch failed' } });
    }
}

export const updateLikes = (id,userId) => async(dispatch)=>{
    try {
         const url=`${import.meta.env.VITE_BACKEND_URL}/like/${id}`
        const response= await axios.post(url,{likedUser:userId});
            const resObject = await response.data;
            dispatch(setLikes(resObject));
            return resObject; 
    } catch (error) {
      console.error('following fetch failed:', error);
      // Dispatch action for login failure if needed
       dispatch({ type: 'following_fetch_failure', payload: { error: 'following fetch failed' } });
    }
}

export const updateBookmarks = (id,userId) => async(dispatch)=>{
    try {
        const url=`${import.meta.env.VITE_BACKEND_URL}/bookmark/${id}`
        const response= await axios.post(url,{userId});
            const resObject = await response.data;
            dispatch(setBookmarks(resObject));
            return resObject;
    } catch (error) {
      console.error('following fetch failed:', error);
      // Dispatch action for login failure if needed
       dispatch({ type: 'following_fetch_failure', payload: { error: 'following fetch failed' } });
    }
}

export const deletePost = (id) => async(dispatch)=>{
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/post/${id}`, {
            method: "PUT",
          });
          return response;
    } catch (error) {
      console.error('following fetch failed:', error);
      // Dispatch action for login failure if needed
       dispatch({ type: 'following_fetch_failure', payload: { error: 'following fetch failed' } });
    }
}