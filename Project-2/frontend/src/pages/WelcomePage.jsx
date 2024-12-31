import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function WelcomePage() {
  const [fadeIn, setFadeIn] = useState(false);

  // Trigger the fade-in animation after component mounts
  useEffect(() => {
    setFadeIn(true);
  }, []);

  return (
    <div
      className={`min-h-screen flex flex-col justify-center items-center bg-blue-50 text-gray-800 transition-opacity duration-1000 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}
    >
      {/* Navbar */}
      <nav className="bg-white shadow-md fixed top-0 w-full z-20">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">Job Portal</h1>
          <div className="hidden md:flex space-x-6">
            <Link
              to="/applicationpage"
              className="text-blue-600 font-medium hover:text-blue-500 transition"
            >
              Applications
            </Link>
            <Link
              to="/interviewpage"
              className="text-blue-600 font-medium hover:text-blue-500 transition"
            >
              Interviews
            </Link>
            <Link
              to="/dashboard"
              className="text-blue-600 font-medium hover:text-blue-500 transition"
            >
              Dashboard
            </Link>
            <Link
              to="/reports"
              className="text-blue-600 font-medium hover:text-blue-500 transition"
            >
              Reports
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="text-center p-10 animate__animated animate__fadeIn">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-blue-600 animate__animated animate__fadeIn animate__delay-1s">
          Welcome to the Job Portal
        </h1>
        <p className="text-lg mb-8 text-gray-600 animate__animated animate__fadeIn animate__delay-2s">
          Manage your college placements and career opportunities with ease.
          Connect with top companies and get the latest job openings.
        </p>
        <Link
          to="/home"
          className="bg-blue-500 text-white px-6 py-3 rounded-full text-xl font-semibold hover:bg-blue-400 transition-all duration-300 transform hover:scale-105"
        >
          Go to Home
        </Link>
      </div>

      {/* Footer */}
      <footer className="bg-white text-blue-600 text-center py-4 absolute bottom-0 w-full z-10">
        <p>&copy; 2024 College Placement Management</p>
      </footer>
    </div>
  );
}

export default WelcomePage;
