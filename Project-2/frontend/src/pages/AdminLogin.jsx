import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../utils/api';

function AdminLogin() {

  const [email, setEmail] = useState(''); // State to store email input
  const [password, setPassword] = useState(''); // State to store password input
  const [error, setError] = useState(''); // State to store error message
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      // Call the login API
      const response = await loginAdmin(email, password);
      const { token } = response; // Extract token from the response

      console.log('JWT Token:', token);

      // Decode the JWT to get the userId
      const decoded = JSON.parse(atob(token.split('.')[1])); // Decode the token
      const adminId = decoded.adminId;

      // Store the token and userId in localStorage
      localStorage.setItem('apiKey', token); // Save token as apiKey
      localStorage.setItem('adminId', adminId);

      // Redirect to the Dashboard and pass userId in the state
      navigate('/home');
    } catch (err) {
      console.error('Login failed:', err);
      setError('Invalid credentials. Please try again.'); // Show error message on failure
    }
  };

  return (
    <div className="relative min-h-screen bg-teal-300 overflow-hidden">
      {/* Background Animation */}
      <div className="absolute top-0 left-0 w-full h-full bg-cover bg-fixed opacity-30" style={{ backgroundImage: "url('https://via.placeholder.com/1500x1000.png?text=Admin+Dashboard')" }}></div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen text-center text-white px-6 py-12">
        <div className="max-w-sm w-full p-8 bg-gradient-to-r from-blue-600 to-indigo-600 border border-gray-300 rounded-xl shadow-2xl z-20">
          <h2 className="text-4xl font-extrabold text-center text-white mb-6">Admin Login</h2>
          <p className="text-lg text-gray-200 mb-6">
            Please enter your credentials to access the Admin Dashboard.
          </p>
          <form onSubmit={handleLogin}>
            {/* Email Input */}
            <div className="mb-6">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Update email state on change
                className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 text-gray-800"
                required
              />
            </div>

            {/* Password Input */}
            <div className="mb-8">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Update password state on change
                className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 text-gray-800"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full p-4 bg-green-600 text-white rounded-md hover:bg-green-800 transition-all duration-300"
            >
              Login
            </button>
          </form>

          {/* Error Message */}
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}

          {/* Link to Register Page */}
          <p className="mt-6 text-center text-gray-300">
            Don't have an account?{' '}
            <button
              className="text-gray-200 hover:underline font-semibold"
              onClick={() => navigate('/adminregister')} // Redirect to the registration page
            >
              Register here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
