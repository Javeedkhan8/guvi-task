import React from 'react';
import { Link } from 'react-router-dom';

function StudentDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-6 flex flex-col justify-center">
      <div className="w-full max-w-screen-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-semibold text-center text-blue-700 mb-6">Student Dashboard</h1>
        
        <p className="text-lg text-gray-600 mb-8 text-center">
          Welcome to the Placement Management System! This platform allows students to access their personalized placement updates, track opportunities, and stay informed about important placement-related events and information.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card for Company List */}
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h3 className="text-2xl font-semibold text-blue-600 mb-4">Company List</h3>
            <p className="text-gray-500 mb-4">Explore the list of companies participating in the placement process.</p>
            <Link
              to="/companieslist"
              className="text-blue-500 hover:text-blue-600 font-semibold inline-block px-6 py-3 border border-blue-500 rounded-md hover:bg-blue-50 transition-colors"
            >
              View Companies
            </Link>
          </div>

          {/* Card for Application Form */}
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h3 className="text-2xl font-semibold text-blue-600 mb-4">Application Form</h3>
            <p className="text-gray-500 mb-4">Fill out the application form to apply for the placement opportunities.</p>
            <Link
              to="/applications/new"
              className="text-blue-500 hover:text-blue-600 font-semibold inline-block px-6 py-3 border border-blue-500 rounded-md hover:bg-blue-50 transition-colors"
            >
              Apply Now
            </Link>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h3 className="text-2xl font-semibold text-blue-600 mb-4">Application Updates</h3>
            <p className="text-gray-500 mb-4">See the Updates of Your Application</p>
            <Link
              to="/readonlydashboard"
              className="text-blue-500 hover:text-blue-600 font-semibold inline-block px-6 py-3 border border-blue-500 rounded-md hover:bg-blue-50 transition-colors "
            >
              view Updates
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
