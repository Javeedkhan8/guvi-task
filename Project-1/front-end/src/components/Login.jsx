import React, { useState } from 'react';
<<<<<<< HEAD
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
=======
import api from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token); // Save token
      navigate("/dashboard");
    } catch (error) {
      setError("Invalid email or password");
>>>>>>> d98f03bd2c26482d7aa5c4510ef50d7d7954ad4e
    }
  };

  return (
<<<<<<< HEAD
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
=======
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-600 to-purple-600">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-sm transform transition duration-500 hover:scale-105">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Login</h2>
        
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out">
            Login
          </button>

          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        </form>

        <div className="mt-4 text-center">
          <span className="text-gray-600">Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Register Now</Link></span>
>>>>>>> d98f03bd2c26482d7aa5c4510ef50d7d7954ad4e
        </div>
      </div>
    </div>
  );
<<<<<<< HEAD
};
=======
}
>>>>>>> d98f03bd2c26482d7aa5c4510ef50d7d7954ad4e

export default Login;
