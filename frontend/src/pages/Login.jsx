import React, { useState,useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { loginUser , loginGoogleUser} from '../actions/authActions';
import { googleLogout, useGoogleLogin} from '@react-oauth/google';
import GoogleButton from 'react-google-button'
import { redirect, useNavigate } from 'react-router-dom';
import IMAGES from '../images/images';
import Loading from '../loading';
import axios from 'axios';
import { selectUser } from '../reducers/authReducer';
import {toast} from 'react-toastify';
const Login = () => {
  const dispatch = useDispatch();
  const user=useSelector(selectUser);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg,setErrorMsg]= useState('')
  const [clicked,setClicked]=useState(false)
  const [ userData, setUserData ] = useState([]);
  const [ profile, setProfile ] = useState(null);


   //alert server
   useEffect(()=>{
    const alertServer= async()=>{
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}`);
    }
    alertServer();
  },[clicked])

  //handle login
  const handleLogin = async(e) => {
    e.preventDefault();
    const res= await dispatch(loginUser({ email, password }));
    if(res=="200"){
      toast.success("Login successful")
    }
    else if(res=="401"){
      toast.error("Invalid credentials")
      setErrorMsg("Invalid credentials")
    }
    else{
      toast.error("Internal Server Error.Try refreshing the page")
      setErrorMsg("Internal Server Error.Try refreshing the page")
    }
  };

  //google login
  const login =useGoogleLogin({
    onSuccess: (codeResponse) => setUserData(codeResponse),
    onError: (error) => console.log('Login Failed:', error)
  });

  useEffect(()=>{
    if (userData) {
    const sigInUser = async () => {
      
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${userData.access_token}`, {
                headers: {
                    Authorization: `Bearer ${userData.access_token}`,
                    Accept: 'application/json'
                }
            })
            .then((res) => {
                setProfile(res.data);
            })
            .catch((err) => console.log(err));
    }
    sigInUser();
  }
  },[userData,user])

  useEffect(() => {
    if (profile) {
      dispatch(loginGoogleUser(profile));
    }
  }, [profile, dispatch]);
  return (
    <>
    <div className='login'>
    <div className="login-text">
        <p>"It's amazing to see how fast devs go
              from 0 to Blog 🤯. It reminds me a lot of
              what Substack did for journalists."</p>
        <p>Guillermo Rauch</p><span>CEO, Vercel</span>
      </div>
      <div className='main'>
        <h2>Welcome Back🚀</h2>
        <div className='login-input'>
        <form onSubmit={(e)=>{handleLogin(e)}}>
            <input type="email" className='text' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" className='text' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className='login-submit' type="submit" onClick={()=>setClicked(true)}>{!errorMsg && clicked?<Loading/>:"Login"}</button>
        </form>
        <p style={{marginBottom:'10px'}}>or</p>
        <GoogleButton onClick={login}>Sign in with Google 🚀 </GoogleButton>
      </div>
      <p>New to InsideCode? <a href="/signup">Sign up now</a></p>
      </div>
      <div className="kidimg">
        <img src={IMAGES.avatar} alt="kid"/>
      </div>
    </div>
    <div className="github">
        <h4>Github repository🚀:</h4>
        <h4><a href="https://github.com/gana-18/community-blogging"> Project</a></h4>
      </div>
    </>
  );
};

export default Login;

