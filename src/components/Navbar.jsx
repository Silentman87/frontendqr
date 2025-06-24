import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isopen, setisopen] = useState(false);
  const navigate = useNavigate();

  const handlelogout = () => {
    localStorage.removeItem('utoken');
    navigate('/login');
  };

  return (
    <nav className='bg-gray-800 p-4 shadow-md relative'>
      <div className='container mx-auto flex justify-between items-center'>
        {/* Logo */}
        <Link to="/dashboard" className='text-white text-xl font-bold'>
          QR Generator
        </Link>

        {/* Desktop Menu */}
        <div className='hidden md:flex space-x-6 items-center'>
          <Link to="/dashboard" className='text-white hover:text-gray-300'>Dashboard</Link>
          <Link to="/loginqr" className='text-white hover:text-gray-300'>Add Link</Link>
          <Link to="/visitqr" className='text-white hover:text-gray-300'>Show QR</Link>
          <button className='text-white border px-3 py-1 rounded hover:bg-red-600' onClick={handlelogout}>
            Logout
          </button>
        </div>

        {/* Mobile Hamburger Icon */}
        <div className='md:hidden'>
          <button className='text-white text-2xl' onClick={() => setisopen(!isopen)}>
            {isopen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isopen && (
        <div className='md:hidden bg-gray-800 text-white px-4 py-2 space-y-3 absolute top-full left-0 w-full z-10'>
          <Link to="/dashboard" className='block py-2 border-b' onClick={() => setisopen(false)}>Dashboard</Link>
          <Link to="/loginqr" className='block py-2 border-b' onClick={() => setisopen(false)}>Add Link</Link>
          <Link to="/showqr" className='block py-2 border-b' onClick={() => setisopen(false)}>Show QR</Link>
          <button className='w-full text-left py-2 border-b' onClick={() => { setisopen(false); handlelogout(); }}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
