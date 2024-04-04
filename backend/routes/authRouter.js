const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {signupUser,loginUser,logoutUser,signupGoogleUser}=require('../controllers/authController')


router.post('/signup', signupUser);

router.post('/login',loginUser)

router.get('/logout', logoutUser)

router.post('/signupGoogle',signupGoogleUser)

module.exports = router;