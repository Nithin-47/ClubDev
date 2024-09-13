import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './auth/login/login'
import Register from './auth/register/register'
import {Route, Router, Routes } from 'react-router-dom'
import Home from './pages/home'
import Layout from './pages/Layout'
import RequireAuth from './components/RequireAuth'
import CreateClub from './pages/createClub'

// const ROLES = {
//   ADMIN: 5150,
//   USER: 2001,
//   STAFF: 1984,
// }




function App() {

  return (
    <>
    
      <Routes>
        <Route path="/" element={<Layout />}> 
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/pages/createClub" element={<CreateClub />} />

          {/* Protected Route for user */}
          <Route element={<RequireAuth allowedRoles={[2001]} />}>
            <Route path="/" element={<Home />} />
          </Route>

          {/* Protected Route for admin or staff add here similar to up */}
          <Route element={<RequireAuth allowedRoles={[5051,1984]} /> }> 
            

          </Route>
          {/* Catch all */}
          


        </Route>
        
      </Routes>
 
    </>
  )
}

export default App
