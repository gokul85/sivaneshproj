import React from 'react'
import { FaUser, FaLock } from "react-icons/fa";
import '../App.css'
import { Link } from 'react-router-dom';
const Loginform = () => {
  return (
    <div className='wrapper'>
      <form action="">
        <h2>Login</h2>
        <div className='input-box'>
          <input type="email" name="email" placeholder='Username' required />
          <FaUser className='icon' />
        </div>
        <div className='input-box'>
          <input type="password" name="password" placeholder='Password' required />
          <FaLock className='icon' />
        </div>
        <div className='remember-forgot'>
          <label><input type="checkbox" />Remeber me</label>
          <a href="#">Forgot Password?</a>
        </div>
        <button type='submit'>Login</button>
        <div className='register-link'>
          <p>Don't have an account?<Link to='/register'>Register</Link></p>
        </div>
      </form>
    </div>
  )
}

export default Loginform