

import React from 'react'; 
import { BrowserRouter, Route, Routes } from 'react-router-dom';


import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HelmetProvider } from 'react-helmet-async';
import Loginqr from './components/Loginqr';
import AllLinkQr from './components/AllLinkQr';

const App = () => {
  return (
   <HelmetProvider>
      <BrowserRouter>
      
           
       <Routes>
          
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
           <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/loginqr" element={<Loginqr />} />
            

           <Route element={<ProtectedRoute />}>
           
            <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/showqr" element={<AllLinkQr />} />
           </Route>
        
        
            
        </Routes>

         
            </BrowserRouter>
      <ToastContainer position="top-center" autoClose={1500} theme="dark" />
    </HelmetProvider>
        
        
    
  );
};

export default App;





