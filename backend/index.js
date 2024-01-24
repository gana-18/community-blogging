const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session=require('express-session');
const MongoStore=require('connect-mongo')
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const User=require('./models/User');
const cors = require('cors');
const connectDB=require('./config/db')

connectDB();
const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

app.use(
    express.urlencoded({ extended: true })
);
    
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store:MongoStore.create({
      mongoUrl:process.env.MONGO_URL,
  collectionName: "sessions",
  stringify: false
  }),
  cookie:{
      maxAge:1000*60*60*24
  }
}))

// JWT secret key
const secretKey = process.env.SECRET_KEY;

// Signup/Login route
app.use('/auth',require('./routes/authRouter'))
app.use('/',require('./routes/indexRouter'))
app.use('/post',require('./routes/postRouter'));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
