import { useState } from 'react'
import './App.css'
import { Routes, Route } from "react-router-dom"
import Login from './components/Login'
import Signup from './components/Signup'
import Home from './components/Home'
import RouteSeting from './components/RouteSeting'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path='/' element={<RouteSeting/>} >
        <Route index element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
      </Route>
    </Routes>
  )
}

export default App
