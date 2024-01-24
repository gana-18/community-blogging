import React from 'react'
import axios from 'axios'
import {useState,useEffect} from 'react'
function Signup() {
    const [formData, setFormData] = useState({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });

    const handleData=(e)=>{
        const {name,value}=e.target;
        setFormData((prevData)=>({
            ...prevData,
            [name]:value,
        }))
        console.log(formData);
    }

    const submitData=async(e)=>{
        e.preventDefault();
        const url=`${import.meta.env.VITE_BACKEND_URL}/auth/signup`
        const response=await axios.post(url,formData);
        if(response.status===201){   
            console.log(response.data);
            alert("Registered Successfully, Please Login");
            window.location.href="/";
        }   
        else{
            alert("User with the provided email or username already exists.");
        }
    }

  return (
    <div className='signup'>
      <div className='main'>
        <h2>Signup</h2>
        <div className='login-input'>
            <form onSubmit={submitData}>
                <input className='text' type="text" placeholder='Username' value={formData.username} onChange={handleData} name='username' />
                <input className='text' type="text" placeholder='First Name' value={formData.firstName} onChange={handleData} name='firstName' />
                <input className='text' type="text" placeholder='Last Name' value={formData.lastName} onChange={handleData} name='lastName' />
                <input className='text' type="text" placeholder='Email' value={formData.email} onChange={handleData} name='email'/>
                <input className='text' type="password" placeholder='Password' value={formData.passowrd} onChange={handleData} name='password' />
                <button className='login-submit' type='submit'>Register</button>
            </form>
        </div>
      </div>
    </div>
  )
}

export default Signup