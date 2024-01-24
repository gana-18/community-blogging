import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    posts: [],
    followingPosts:[],
    author:[],
    followers:[],
    following:[],
    likes:[],
    bookmarks:[],
    status: "idle",
    error: null,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setFollowingPosts: (state, action) => {
        state.followingPosts = action.payload;
    },
    setAuthor: (state, action) => {
      state.author = action.payload;
    },
    setFollowers: (state, action) => {
      state.followers = action.payload;
    }
    ,
    setFollowing: (state, action) => {
      state.following = action.payload;
    }
    ,
    setLikes: (state, action) => {
      state.likes = action.payload;
    }
    ,
    setBookmarks: (state, action) => {
      state.bookmarks = action.payload;
    }
  },
});

export const {setPosts,setFollowingPosts,setAuthor,setFollowAuthor,setLikes,setBookmarks} = postSlice.actions;
export const selectAuthor= (state) => state.post.author;

export default postSlice.reducer;