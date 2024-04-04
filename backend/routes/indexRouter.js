const express=require('express')
const router=express.Router()
const {getPosts,getFollowingPosts,getUser,addFollowing,getDraft,removeFollowing,getFollowers,getDrafts,getFollowing,likePost,addBookmark}=require('../controllers/indexControllers')
const verifyToken = require('../middleware/auth')

router.get('/',(req,res)=>{
    res.send("login")
})

router.get('/user/:id',getUser)

router.post('/like/:id',likePost)

router.post('/follow/:authorId',addFollowing)

router.post('/unfollow/:authorId',removeFollowing)

router.get('/drafts/:id',getDrafts)

router.get('/draft/:id',getDraft)

router.get('/home',getPosts)

router.get('/following/:id',getFollowingPosts)

router.get('/followers/:id',getFollowers)

router.get('/following/:id',getFollowing)

router.post('/bookmark/:id',addBookmark)





module.exports=router