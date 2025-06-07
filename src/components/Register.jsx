import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from './Navbar';
import { Eye, EyeOff } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [userdt, setUserdt] = useState({
    uname: '',
    uemail: '',
    pass: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserdt({
      ...userdt,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/testuser/reguser', userdt);
      console.log("✅ Server Response:", res.data);
      toast.success("Registration successful!");
      navigate('/login');
    } catch (error) {
      console.error("❌ Error:", error);
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <>
      <Helmet>
        <title>Register Page</title>
      </Helmet>

      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-100 to-blue-200">
        <div className='bg-white shadow-xl p-8 rounded-2xl w-full max-w-md'>
          <h2 className='text-3xl font-extrabold text-center mb-6'>Register</h2>

          <form onSubmit={handleSubmit}>
            <label className='block mb-2 text-gray-700'>Name</label>
            <input
              type="text"
              name="uname"
              placeholder="Enter your name"
              required
              onChange={handleInputChange}
              className='w-full px-4 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400'
            />

            <label className='block mb-2 text-gray-700'>Email</label>
            <input
              type="email"
              name="uemail"
              placeholder="Enter your email"
              required
              onChange={handleInputChange}
              className='w-full px-4 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400'
            />

            <label className='block mb-2 text-gray-700'>Password</label>
            <div className='relative'>
              <input
                type={showPassword ? 'text' : 'password'}
                name="pass"
                placeholder="Enter password"
                required
                onChange={handleInputChange}
                className='w-full px-4 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400'
              />
              <div
                className='absolute right-3 top-3 cursor-pointer'
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
            </div>

            <button
              type="submit"
              className='w-full bg-blue-500 hover:bg-blue-700 text-white py-2 font-bold rounded transition duration-200'
            >
              Submit
            </button>

            <p className='mt-4 text-center text-sm'>
              Already have an account?
              <Link to="/login" className='ml-2 text-xl text-green-600 hover:underline font-semibold'>
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;

