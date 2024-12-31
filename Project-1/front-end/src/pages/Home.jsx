import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="relative min-h-screen bg-gradient-to-r from-blue-500 to-teal-500 overflow-hidden">

      {/* Navbar */}
      <nav className="bg-transparent absolute top-0 left-0 w-full py-4 px-6 z-20">
        <div className="flex justify-between items-center">
          <div className="text-white text-2xl font-semibold">
            <Link to="/">Vehicle Rental</Link>
          </div>
          <div className="space-x-6">
            <Link to="/login" className="text-white hover:text-teal-200 text-lg">Login</Link>
            <Link to="/register" className="text-white hover:text-teal-200 text-lg">Register</Link>
          </div>
        </div>
      </nav>


      <div className="absolute top-0 left-0 w-full h-full bg-cover bg-fixed opacity-40" style={{ backgroundImage: "url('https://via.placeholder.com/1500x1000.png?text=Vehicle+Rental')" }}></div>

      <div className="relative z-10 flex flex-col justify-center items-center min-h-screen text-center text-white px-4 py-8">
        <h1 className="text-5xl font-extrabold leading-tight text-white mb-8 transform transition duration-500 hover:scale-105 hover:text-teal-200">
          Welcome to Online Rental Vehicle App
        </h1>
        
        <p className="text-lg mb-8 opacity-90 transform transition duration-500 hover:opacity-100">
          Find your perfect vehicle and experience the freedom of the road.
        </p>


        {/* Button Section */}
        <div className="flex space-x-4">
          <Link
            to="/login"
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-full shadow-lg text-xl transition duration-300 ease-in-out transform hover:scale-105"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="bg-teal-600 hover:bg-teal-700 text-white py-3 px-6 rounded-full shadow-lg text-xl transition duration-300 ease-in-out transform hover:scale-105"
          >
            Register
          </Link>
        </div>

      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <span className="text-white text-sm">Scroll Down</span>
        <svg
          className="w-6 h-6 animate-bounce text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 15l7-7 7 7"
          ></path>
        </svg>
      </div>
    </div>
  );
}

export default Home;
