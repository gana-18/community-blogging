const express=require('express')
const router=express.Router()
const {createPost,getPost,deletePost,updatePost}=require('../controllers/postControllers')

// @desc CREATE POST
// @Method POST
router.post('/create/:id',createPost)

// @desc GET POST BY ID OF USER
// @Method GET
router.get('/:id',getPost)

// @desc UPDATE POST BY ID OF USER
// @Method PUT
router.put('/edit/:id',updatePost)

// @desc DELETE POST BY ID OF USER
// @Method DELETE
router.put('/:id',deletePost)

module.exports=router