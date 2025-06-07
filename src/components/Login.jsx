import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import { Eye, EyeOff } from 'lucide-react'; // for password toggle icon

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [userdt, setUserdt] = useState({
    uemail: '',
    pass: ''
  });

  const msg = () => {
    toast.error(error || 'An error occurred', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: 'dark',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserdt({ ...userdt, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const logindt = await axios.post('http://localhost:5000/testuser/loguser', userdt);
      if (logindt.data.loginsts === "0") {
        localStorage.setItem("utoken", logindt.data.token);
        toast.success("Login successful!");
        navigate('/dashboard');
      } else {
        setError(logindt.data.msg);
        msg();
      }
    } catch (error) {
      console.error("❌ Error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login Page</title>
      </Helmet>

  

      <div className='flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-100 to-blue-200'>
        <div className='bg-white shadow-xl p-8 rounded-xl w-full max-w-md'>
          <h2 className='text-3xl font-extrabold text-center mb-6'>Login</h2>

          <form onSubmit={handleSubmit}>

            <label className='block mb-2 text-gray-700'>Email</label>
            <input
              type='email'
              name='uemail'
              required
              placeholder='Enter your email'
              className='w-full px-4 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400'
              onChange={handleInputChange}
            />

            <label className='block mb-2 text-gray-700'>Password</label>
            <div className='relative'>
              <input
                type={showPassword ? 'text' : 'password'}
                name='pass'
                required
                placeholder='Enter password'
                className='w-full px-4 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400'
                onChange={handleInputChange}
              />
              <div
                className='absolute right-3 top-3 cursor-pointer'
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
            </div>

            <button
              type='submit'
              disabled={loading}
              className={`w-full py-2 rounded text-white font-bold transition ${
                loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'
              }`}
            >
              {loading ? 'Logging in...' : 'Submit'}
            </button>
          </form>

          <p className='mt-4 text-center text-sm'>
            Don’t have an account?
            <Link
              to='/register'
              className='ml-2 text-xl text-green-600 hover:underline font-semibold'
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
