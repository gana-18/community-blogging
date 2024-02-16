import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../actions/authActions';
import { redirect, useNavigate } from 'react-router-dom';
import IMAGES from '../images/images';
import Loading from '../loading';
const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg,setErrorMsg]= useState('')
  const [clicked,setClicked]=useState(false)
  const handleLogin = async(e) => {
    e.preventDefault();
    const res= await dispatch(loginUser({ email, password }));
    if(res=="401"){
      setErrorMsg("Invalid credentials")
    }
    else{
      setErrorMsg("Internal Server Error.Try refreshing the page")
    }
  };

  const eStyle={
    color:"red",
    marginTop:"10px"
  };

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
            {errorMsg?<p style={eStyle}>*{errorMsg}🫤</p>:null}
        <button className='login-submit' type="submit" onClick={()=>setClicked(true)}>{!errorMsg && clicked?<Loading/>:"Login"}</button>
        </form>
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

/*import React from 'react';

const Login = ({ email, setEmail, password, setPassword, handleLogin }) => {
  return (
    <div>
      <h2>Login</h2>
      <form>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <br />
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <br />
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;*/

