import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="relative min-h-screen bg-red-600 overflow-hidden">

      {/* Navbar */}
      <nav className="bg-transparent absolute top-0 left-0 w-full py-6 px-8 z-20">
        <div className="flex justify-between items-center">
          <div className="text-white text-3xl font-bold">
            <Link to="/">Vehicle Rental</Link>
          </div>
          <div className="space-x-6">
            <Link to="/login" className="text-white hover:text-teal-300 text-lg font-semibold transition-colors">Login</Link>
            <Link to="/register" className="text-white hover:text-teal-300 text-lg font-semibold transition-colors">Register</Link>
          </div>
        </div>
      </nav>

      {/* Background Image */}
      <div className="absolute top-0 left-0 w-full h-full bg-cover bg-fixed opacity-40" style={{ backgroundImage: "url('https://via.placeholder.com/1500x1000.png?text=Vehicle+Rental')" }}></div>

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col justify-center items-center min-h-screen text-center text-white px-6 py-8">
        <h1 className="text-5xl font-extrabold leading-tight text-white mb-8 transform transition duration-500 hover:scale-105 hover:text-teal-400">
          Welcome to the Online Vehicle Rental App
        </h1>
        
        <p className="text-xl opacity-90 transform transition duration-500 hover:opacity-100">
          Find the perfect vehicle and enjoy the freedom of the road.
        </p>
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
