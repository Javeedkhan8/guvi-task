import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/index'; // Adjust the import path to match your project structure

const Login = () => {
  const [email, setEmail] = useState(''); // State to store email input
  const [password, setPassword] = useState(''); // State to store password input
  const [error, setError] = useState(''); // State to store error message
  const navigate = useNavigate(); // Hook for navigation

  // Handle form submission and user login
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      // Call the login API
      const response = await loginUser(email, password);
      const { token } = response; // Extract token from the response

      console.log('JWT Token:', token);

      // Decode the JWT to get the userId
      const decoded = JSON.parse(atob(token.split('.')[1])); // Decode the token
      const userId = decoded.userId; // Extract userId from the decoded token

      // Store the token and userId in localStorage
      localStorage.setItem('apiKey', token); // Save token as apiKey
      localStorage.setItem('userId', userId); // Save userId

      console.log('User ID:', userId);

      // Redirect to the Dashboard and pass userId in the state
      navigate('/vehiclelist', { state: { userId } });
    } catch (err) {
      console.error('Login failed:', err);
      setError('Invalid credentials. Please try again.'); // Show error message on failure

    }
  };

  return (

    <div className="relative min-h-screen bg-gradient-to-r from-blue-500 to-teal-500 overflow-hidden">
      {/* Background Animation */}
      <div className="absolute top-0 left-0 w-full h-full bg-cover bg-fixed opacity-40" style={{ backgroundImage: "url('https://via.placeholder.com/1500x1000.png?text=Vehicle+Rental')" }}></div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen text-center text-white px-4 py-8">
        <div className="max-w-sm w-full p-8 bg-gray-100 border border-gray-300 rounded-lg shadow-lg z-20">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>
          <form onSubmit={handleLogin}>
            {/* Email Input */}
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Update email state on change
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-200 text-gray-800"
                required
              />
            </div>

            {/* Password Input */}
            <div className="mb-6">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Update password state on change
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-200 text-gray-800"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Login
            </button>
          </form>

          {/* Error Message */}
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}

          {/* Link to Register Page */}
          <p className="mt-4 text-center text-gray-600">
            Don't have an account?{' '}
            <button
              className="text-blue-500 hover:text-blue-600 font-semibold"
              onClick={() => navigate('/register')} // Redirect to the registration page
            >
              Register here
            </button>
          </p>
        </div>
      </div>
    </div>
  );

};



export default Login;
