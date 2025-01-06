import React, { useState } from "react";
import { Link } from "react-router-dom";
import ReportsPage from "./ReportsPage";

function HomePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <nav className="bg-blue-900 text-white py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-2xl font-bold">Placement System</h1>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link to="/applicationpage" className="hover:underline">
              Applications
            </Link>
            <Link to="/interviewpage" className="hover:underline">
              Interviews
            </Link>
            <Link to="/dashboard" className="hover:underline">
              Dashboard
            </Link>
            <Link to="/company" className="hover:underline">
              View Companies
            </Link>
            <Link to="/students" className="hover:underline">
              Student List
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMobileMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-blue-800 text-white px-4 py-2 space-y-4">
            <Link to="/applicationpage" className="block hover:underline">
              Applications
            </Link>
            <Link to="/interviewpage" className="block hover:underline">
              Interviews
            </Link>
            <Link to="/dashboard" className="block hover:underline">
              Dashboard
            </Link>
            <Link to="/company" className="block hover:underline">
              View Companies
            </Link>
            <Link to="/students" className="block hover:underline">
              Student List
            </Link>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <ReportsPage />
    </div>
  );
}

export default HomePage;
