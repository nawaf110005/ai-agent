import React from 'react'
import { Routes, Route } from 'react-router-dom'
import PrivateRouter from './PrivateRouter'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'

export default function Router() {
  return (
    <Routes>
      <Route element={<PrivateRouter />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  )
}
