const Post=require('../models/Post')
const User=require('../models/User')
// @desc: GET latest POSTS by time WHEN HONE PAGE LOADS
// @access: Pirvate
// @end point: /home
const getPosts=async(req,res)=>{
    try {
        const posts=await Post.find({}).sort({createdAt:-1})
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

// @desc:GET POSTS BY FOLLOWING USERS
// @access: Private
// @end point: /following
const getFollowingPosts=async(req,res)=>{
    try {
      const { id } = req.params;
      const user=await User.findById(id)
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const followingIds = user.following;
      const followingposts=await Post.find({ user: { $in: followingIds } }).sort({ createdAt: -1 });
      res.status(200).json(followingposts);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

// @desc: GET POST BY ID OF USER
// @access: Private
// @end point: /user/:id
const getUser=async(req,res)=>{
    try {
        const {id}=req.params
        const userData= await User.findById(id)
        if (!userData) {
            // Handle the case where the user data is not found
            return res.status(404).json({ message: 'User not found' });
          }
        res.status(200).json(userData)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

// @desc: ADD FOLLOWING TO USER
// @access: Private
// @end point: /follow/:id
const addFollowing=async(req,res)=>{
    try {
      const { authorId } = req.params;
      const { followingUser } = req.body;
       await User.findByIdAndUpdate(
          followingUser, // ID of the current logged-in user
          { $addToSet: { following:authorId } }, // Using $addToSet to add the user ID to following array if it doesn't already exist (to avoid duplicates)
          { new: true }
        );

        // Add the current logged-in user to the followers list of the author
        await User.findByIdAndUpdate(
          authorId, // ID of the user being followed (the author)
          { $addToSet: { followers: followingUser } }, // Using $addToSet to add the user ID to followers array if it doesn't already exist (to avoid duplicates)
          { new: true }
        );
        res.status(200).json({ message: 'Successfully followed the user' });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}

// @desc: REMOVE FOLLOWING TO USER
// @access: Private
// @end point: /unfollow/:id
const removeFollowing=async(req,res)=>{
  try {
    const { authorId } = req.params;
    const { followingUser } = req.body;

    // Remove the current logged-in user from the following list of the author
    await User.findByIdAndUpdate(
      followingUser, // ID of the current logged-in user
      { $pull: { following: authorId } }, // Using $pull to remove the user ID from following array
      { new: true }
    );

    // Remove the current logged-in user from the followers list of the author
    await User.findByIdAndUpdate(
      authorId, // ID of the user being unfollowed (the author)
      { $pull: { followers: followingUser } }, // Using $pull to remove the user ID from followers array
      { new: true }
    );

    res.status(200).json({ message: 'Successfully unfollowed the user' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
// @desc: GET FOLLOWERS OF USER
// @access: Private
// @end point: /followers/:id
const getFollowers=async(req,res)=>{
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
          // Handle the case where the user data is not found
          return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user.followers);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}

// @desc: GET FOLLOWING OF USER
// @access: Private
// @end point: /following/:id
const getFollowing=async(req,res)=>{
    try {
        const { id } = req.params;
        const user = await User.findById(id).populate('following').exec();
        if (!user) {
          // Handle the case where the user data is not found
          return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user.following);
      } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// @desc: LIKE POST
// @access: Private
// @end point: /like/:id
const likePost=async(req,res)=>{
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id);
        if (!post) {
          // Handle the case where the post data is not found
          return res.status(404).json({ message: 'Post not found' });
        }
        // Check if the user has already liked the post
        if (post.likes.get(userId)) {
          // If the user has already liked the post, then unlike it
          post.likes.delete(userId);
        } else {
          // If the user has not liked the post, then like it
          post.likes.set(userId, true);
        }
        await post.save();
        res.status(200).json(post.likes);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}

// @desc: ADD BOOKMARK
// @access: Private
// @end point: /bookmark/:id
const addBookmark=async(req,res)=>{
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const user = await User.findById(userId);
        if (!user) {
          // Handle the case where the post data is not found
          return res.status(404).json({ message: 'Post not found' });
        }
        // Check if the user has already bookmarked the post
        if (user.bookmarks.get(id)) {
          // If the user has already bookmarked the post, then remove it
          user.bookmarks.delete(id);
        } else {
          // If the user has not bookmarked the post, then bookmark it
          user.bookmarks.set(id, true);
        }
        await user.save();
        res.status(200).json(user.bookmarks);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}

module.exports={
    getPosts,
    getFollowingPosts,
    getUser,
    addFollowing,
    removeFollowing,
    getFollowers,
    getFollowing,
    likePost,
    addBookmark,
}