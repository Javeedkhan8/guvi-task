import React from 'react';
import { Link } from 'react-router-dom';

function Company() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-black flex items-center justify-center">
      <div className="bg-gray-800 shadow-md rounded-lg p-8 w-full max-w-lg text-center">
        <h1 className="text-3xl font-bold text-white mb-6">Company</h1>
        <div className="space-y-4">
          <Link
            to="/create-company"
            className="block w-full bg-blue-600 text-white text-lg font-medium py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Create Company
          </Link>
          <Link
            to="/companieslist"
            className="block w-full bg-green-600 text-white text-lg font-medium py-3 rounded-lg hover:bg-green-700 transition duration-300"
          >
            Company List
          </Link>
          <Link
            to="/companies"
            className="block w-full bg-indigo-600 text-white text-lg font-medium py-3 rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            Company Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Company;
