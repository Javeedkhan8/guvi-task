import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function InterviewPage() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex items-center justify-center bg-blue-50 text-gray-800">
      <div className="relative max-w-lg w-full bg-white rounded-xl shadow-lg p-8">
        {/* Close Button */}
        <button
          onClick={() => navigate(-1)} // Navigate back to the previous page
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h2 className="text-3xl font-bold text-gradient bg-clip-text text-transparent bg-blue-500 mb-6 text-center">
          Interview Management
        </h2>
        <p className="text-lg text-gray-600 mb-6 text-center">
          Manage and schedule your interviews efficiently.
        </p>
        <div className="flex flex-col space-y-4">
          <Link
            to="/interviews"
            className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-500 transition-all duration-300 transform hover:scale-105 text-center"
          >
            Interview Dashboard
          </Link>
          <Link
            to="/interviewsSchedule"
            className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-500 transition-all duration-300 transform hover:scale-105 text-center"
          >
            Interview Schedule
          </Link>
        </div>
      </div>
    </div>
  );
}

export default InterviewPage;
