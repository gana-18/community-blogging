const User=require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY;


const signupUser = async (req, res) => {
    try {
      const {username,firstName,lastName,email,password,profilePic} = req.body;
      const existingUser = await User.findOne({ $or: [{ email }, { username }] });

      if (existingUser) {
        return res.status(200).json({ message: 'User with the provided email or username already exists.' });
      }
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new User({
          username:username,
          firstName:firstName,
          lastName:lastName,
          email:email,
          password:hashedPassword,
          profilePic:profilePic
      });
      await user.save();
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const signupGoogleUser = async (req, res) => {
    try {
       const {email,family_name,given_name,name,picture}=req.body;
        const existingUser = await User.findOne({email:email});
        if (existingUser) {
          return res.status(200).json(existingUser);
        }
        const user = new User({
          username:name,
          firstName:given_name,
          lastName:family_name,
          email:email,
          profilePic:picture,
          password:Math.random().toString(16)
        });
        await user.save();
        res.status(201).json(user);
    } catch (error) {
      
    }
  };

const loginUser = async (req, res) => {
        try {
          const { email, password } = req.body;
      
          // Find the user by email
          const user = await User.findOne({ email });
      
          if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
          }
      
          // Compare the provided password with the hashed password
          const passwordMatch = await bcrypt.compare(password, user.password);
      
          if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
          }
      
          // Generate JWT token
          const token = jwt.sign({ userId: user._id }, secretKey);
          delete user.password;
          
          res.status(200).json({user,token});
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
};


const logoutUser = async (req, res) => {
    try {
      res.clearCookie('token');
      res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

module.exports={
        signupUser,
        loginUser,
        logoutUser,
        signupGoogleUser
}