import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function WelcomePage() {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  return (
    <div
      className={`relative min-h-screen flex flex-col justify-between items-center bg-gradient-to-br from-blue-100 to-blue-300 text-gray-800 transition-opacity duration-1000 ${
        fadeIn ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Decorative Circles */}
      <div className="absolute top-10 left-10 w-36 h-36 bg-blue-500 rounded-full opacity-20 blur-2xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-48 h-48 bg-blue-700 rounded-full opacity-30 blur-3xl"></div>

      {/* Main Content */}
      <div className="relative text-center p-10 max-w-4xl mx-auto">
        <h1 className="text-6xl md:text-7xl font-extrabold mb-6 text-blue-800 drop-shadow-lg tracking-wide animate-fade-in">
          Welcome to <span className="text-blue-600">Your Job Portal</span>
        </h1>
        <p className="text-lg md:text-xl mb-10 text-gray-700 leading-relaxed animate-fade-in animate-delay-1s">
          Simplify your career journey with our platform. Track placements, explore opportunities, and connect with top companies to launch your dream career.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/mainpage"
            className="bg-blue-600 text-white px-8 py-4 rounded-full text-xl font-semibold shadow-lg hover:bg-blue-500 transition-all duration-300 transform hover:scale-110"
          >
            Get Started
          </Link>
          <Link
            to="/about"
            className="bg-transparent border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full text-xl font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-110"
          >
            Learn More
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative bg-blue-50 text-blue-700 text-center py-8 w-full shadow-inner">
        <p className="text-sm md:text-base">
          &copy; {new Date().getFullYear()} College Placement Management. All rights reserved.
        </p>
        <p className="text-sm md:text-base mt-2">
          Empowering students to achieve their career aspirations.
        </p>
      </footer>
    </div>
  );
}

export default WelcomePage;
