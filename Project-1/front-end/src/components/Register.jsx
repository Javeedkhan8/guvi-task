import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/index';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await registerUser(name, email, password);
      const { apiKey } = response;
      localStorage.setItem('apiKey', apiKey);
      navigate('/');  // Redirect to login after successful registration
    } catch (err) {
      setError('Error registering. Please try again.');
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-blue-500 to-teal-500 overflow-hidden">
      {/* Background Animation */}
      <div className="absolute top-0 left-0 w-full h-full bg-cover bg-fixed opacity-40" style={{ backgroundImage: "url('https://via.placeholder.com/1500x1000.png?text=Vehicle+Rental')" }}></div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen text-center text-white px-4 py-8">
        <div className="max-w-sm w-full p-8 bg-gray-100 border border-gray-300 rounded-lg shadow-lg z-20">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Register</h2>
          <form onSubmit={handleRegister}>
            {/* Name Input */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-200 text-gray-800"
                required
              />
            </div>

            {/* Email Input */}
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-200 text-gray-800"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Register
            </button>
          </form>

          {/* Error Message */}
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}

          {/* Link to Login Page */}
          <p className="mt-4 text-center text-gray-600">
            Already have an account?{' '}
            <button
              className="text-blue-500 hover:text-blue-600 font-semibold"
              onClick={() => navigate('/')} // Redirect to login page
            >
              Login here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
