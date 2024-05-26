import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Loginform from '../components/Loginform'

const Main = () => {
  return (
    <div>
      <Navbar/>
      <Loginform/>
    </div>
  )
}

export default Main