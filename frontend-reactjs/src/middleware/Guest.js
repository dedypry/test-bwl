import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const Guest = () => {
  const isAuth = localStorage.getItem('token')
  return !isAuth ? <Outlet /> : <Navigate to="/dashboard" />
}
export default Guest
