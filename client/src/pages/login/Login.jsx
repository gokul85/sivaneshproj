import React from 'react'
import { FaUser, FaLock } from "react-icons/fa";
import './Login.css'
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token") != null) {
      if (localStorage.getItem("role") == "owner") {
        navigate('/owner/dashboard');
      }
      else {
        navigate('/dashboard');
      }
    }
  }, []);
  const HandleSubmit = () => {
    if (email != "" && password != "") {
      axios.post("/api/auth/login",
        {
          email: email,
          password: password,
        }
      ).then((data => {
        console.log(data.data);
        toast.success("User Login Successful");
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("role", data.data.role);
        if (data.data.role === 'owner') {
          navigate('/owner/dashboard');
        }
        else {
          navigate('/dashboard');
        }
      }))
        .catch(error => {
          console.log(error.response);
          toast.error(error.response.data.message);
        })
    }
    else {
      toast.error("Please Fill all the required fields");
    }
  }


  return (
    <div className="loginbox">
      <div className='wrapper'>
        <h2>Login</h2>
        <div className='input-box'>
          <input type="email" name="email" placeholder='Username' value={email} onChange={e => setEmail(e.target.value)} required />
          <FaUser className='icon' />
        </div>
        <div className='input-box'>
          <input type="password" name="password" placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} required />
          <FaLock className='icon' />
        </div>
        <div className='remember-forgot'>
          <label><input type="checkbox" />Remeber me</label>
          <a href="#">Forgot Password?</a>
        </div>
        <button type='submit' onClick={HandleSubmit}>Login</button>
        <div className='register-link'>
          <p>Don't have an account?<Link to='/register'>Register</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Login