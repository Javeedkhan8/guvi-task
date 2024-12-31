import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Homepage = () => {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col bg-blue-50 text-gray-800 relative overflow-hidden">
      {/* Background Text */}
      <div className="absolute inset-0 bottom-80 flex justify-center items-center">
        <h1
          className="text-6xl font-extrabold bg-clip-text text-transparent bg-blue-500 opacity-30 tracking-wide"
          style={{ whiteSpace: 'nowrap' }}
        >
          PLACEMENT PORTAL
        </h1>
      </div>

      {/* Navbar */}
      <nav className="bg-white shadow-md fixed top-0 w-full z-20">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">Placement System</h1>
          <button
            className="text-pink-400 md:hidden"
            onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
          >
            ☰
          </button>
          <div className="hidden md:flex space-x-6">
            <Link
              to="/applicationpage"
              className="text-gray-700 font-medium hover:text-blue-500 transition"
            >
              Applications
            </Link>
            <Link
              to="/interviewpage"
              className="text-gray-700 font-medium hover:text-blue-500 transition"
            >
              Interviews
            </Link>
            <Link
              to="/dashboard"
              className="text-gray-700 font-medium hover:text-blue-500 transition"
            >
              Dashboard
            </Link>
            <Link
              to="/reports"
              className="text-gray-700 font-medium hover:text-blue-500 transition"
            >
              Reports
            </Link>
            <Link
              to="/company"
              className="text-gray-700 font-medium hover:text-blue-500 transition"
            >
              View Companies
            </Link>
            <Link
              to="/students"
              className="text-gray-700 font-medium hover:text-blue-500 transition"
            >
              Students List
            </Link>
          </div>
        </div>

        {/* Mega Menu for small and medium screens */}
        {isMegaMenuOpen && (
          <div className="bg-lightblue-100 md:hidden">
            <div className="flex flex-col space-y-2 p-4">
              <Link
                to="/applicationpage"
                className="text-blue-400 hover:text-pink-400"
                onClick={() => setIsMegaMenuOpen(false)}
              >
                Applications
              </Link>
              <Link
                to="/interviewpage"
                className="text-blue-400 hover:text-pink-400"
                onClick={() => setIsMegaMenuOpen(false)}
              >
                Interviews
              </Link>
              <Link
                to="/dashboard"
                className="text-blue-400 hover:text-pink-400"
                onClick={() => setIsMegaMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/reports"
                className="text-blue-400 hover:text-pink-400"
                onClick={() => setIsMegaMenuOpen(false)}
              >
                Reports
              </Link>
              <Link
                to="/company"
                className="text-blue-400 hover:text-pink-400"
                onClick={() => setIsMegaMenuOpen(false)}
              >
                View Companies
              </Link>
              <Link
                to="/students"
                className="text-blue-400 hover:text-pink-400"
                onClick={() => setIsMegaMenuOpen(false)}
              >
                Students List
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Center Content */}
      <div className="flex flex-grow items-center justify-center text-center pt-32 px-6 opacity-90 relative z-10">
        <div className="max-w-4xl space-y-6 p-8 bg-white rounded-xl shadow-lg">
          <h2 className="text-4xl font-bold text-gradient bg-clip-text text-transparent bg-blue-500">Welcome to the Placement Portal</h2>
          <p className="text-lg text-gray-600">
            This platform connects students with leading companies for internship and job opportunities.
            Stay updated with your application statuses, upcoming interviews, and more.
          </p>
          <p className="text-lg text-gray-600">
            Explore available companies, track your interview schedules, and get detailed reports to
            enhance your chances of success in the placement process.
          </p>

          {/* Register Button in the center */}
          <div className="mt-8">
            <Link
              to="/register"
              className="bg-blue-600 text-white px-8 py-3 rounded-full text-xl font-semibold hover:bg-blue-500 transition-all duration-300 transform hover:scale-105"
            >
              Register Now
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white text-blue-600 text-center py-4 absolute bottom-0 w-full z-10">
        &copy; 2024 College Placement Management System | All Rights Reserved
      </footer>
    </div>
  );
};

export default Homepage;
