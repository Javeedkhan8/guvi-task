import React, { useState } from 'react';
import { createCompany } from '../utils/api';

const CreateCompanyForm = () => {
  const [companyData, setCompanyData] = useState({
    name: '',
    email: '',
    phone: '',
    website: '',
    description: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompanyData({ ...companyData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createCompany(companyData);
      setSuccessMessage(`Company "${response.name}" created successfully!`);
      setErrorMessage('');
      setCompanyData({
        name: '',
        email: '',
        phone: '',
        website: '',
        description: '',
      });
    } catch (error) {
      setErrorMessage('Failed to create company. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-8">
      <div className="bg-gray-800 shadow-xl rounded-lg p-8 w-full max-w-xl">
        <h1 className="text-3xl font-semibold text-white mb-6 text-center">Create a New Company</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-lg text-gray-300 mb-2">Company Name</label>
            <input
              type="text"
              name="name"
              value={companyData.name}
              onChange={handleInputChange}
              required
              className="w-full p-3 rounded-lg border-2 border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter company name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-lg text-gray-300 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={companyData.email}
              onChange={handleInputChange}
              required
              className="w-full p-3 rounded-lg border-2 border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter company email"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-lg text-gray-300 mb-2">Job Openings</label>
            <input
              type="text"
              name="phone"
              value={companyData.jobOpenings}
              onChange={handleInputChange}
              required
              className="w-full p-3 rounded-lg border-2 border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Job Openings"
            />
          </div>

          {/* Contact Number */}
          <div>
            <label className="block text-lg text-gray-300 mb-2">Contact Number</label>
            <input
              type="text"
              name="phone"
              value={companyData.contactNumber}
              onChange={handleInputChange}
              required
              className="w-full p-3 rounded-lg border-2 border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter company contact number"
            />
          </div>

          {/* Website */}
          <div>
            <label className="block text-lg text-gray-300 mb-2">Website</label>
            <input
              type="url"
              name="website"
              value={companyData.website}
              onChange={handleInputChange}
              className="w-full p-3 rounded-lg border-2 border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter company website (optional)"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-lg text-gray-300 mb-2">Description</label>
            <textarea
              name="description"
              value={companyData.description}
              onChange={handleInputChange}
              className="w-full p-3 rounded-lg border-2 border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter company description"
              rows="4"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          >
            Create Company
          </button>
        </form>

        {/* Success/Error Messages */}
        {successMessage && (
          <p className="mt-6 text-green-400 text-center">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="mt-6 text-red-400 text-center">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default CreateCompanyForm;
