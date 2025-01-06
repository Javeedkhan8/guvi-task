import React from "react";
import { Link } from "react-router-dom";

function MainPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-indigo-200 flex flex-col justify-center items-center">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-800 text-white py-16 w-full shadow-xl">
        <h1 className="text-6xl font-extrabold text-center tracking-wide uppercase text-shadow-md">
          Placement Management System
        </h1>
        <p className="text-center text-lg mt-2 font-medium">
          Seamlessly manage your placements, from admin to student access.
        </p>
      </header>

      {/* Main Content */}
      <div className="flex flex-col gap-8 mt-16 text-center px-6">
        {/* Introduction Text */}
        <p className="text-2xl text-gray-800 font-semibold mb-12 leading-relaxed max-w-3xl mx-auto">
          Welcome to the Placement Management System! This platform allows
          administrators to oversee and manage placement data, while students can
          access their personalized placement updates and important information.
          Choose your role below to proceed:
        </p>

        {/* Admin Login */}
        <Link
          to="/adminlogin"
          className="relative z-10 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-16 py-8 text-2xl font-semibold rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300"
        >
          Admin Login
        </Link>

        {/* Student Login */}
        <Link
          to="/login"
          className="relative z-10 bg-gradient-to-r from-green-500 to-teal-600 text-white px-16 py-8 text-2xl font-semibold rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300"
        >
          Student Login
        </Link>

        {/* Additional Call to Action */}
        <div className="mt-10 text-lg text-gray-700">
          <p className="font-medium mb-4">Don't have an account?</p>
          <Link
            to="/register"
            className="text-blue-600 hover:text-blue-800 font-semibold underline"
          >
            Sign Up here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
