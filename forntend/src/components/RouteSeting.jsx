import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

function RouteSeting() {
  return (
    <div>
        <Navbar/>
        <Outlet/>
    </div>
  )
}

export default RouteSeting