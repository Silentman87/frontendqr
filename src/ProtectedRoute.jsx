import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import {jwtDecode } from 'jwt-decode';



const ProtectedRoute = () => {
  const utoken = localStorage.getItem('utoken'); // ❌ was "LocatStorage"

  if (!utoken) {
    return <Navigate to="/login" />;
  }

  try {
    const decodedToken = jwtDecode(utoken); // ✅ correct function usage
    const currentTime = Math.floor(Date.now() / 1000);

    if (decodedToken.exp < currentTime) {
      localStorage.removeItem('utoken'); // ❌ spelling was "remoceItem"
      return <Navigate to="/login" />;
    }

    return <>
       <Navbar />
       < Outlet />; 
      </> 
  } catch (error) {
    localStorage.removeItem('utoken'); // ❌ "LocatStorage", extra space in key
    return <Navigate to="/login" />; // ❌ was "Navigator"
  }
};

export default ProtectedRoute;
