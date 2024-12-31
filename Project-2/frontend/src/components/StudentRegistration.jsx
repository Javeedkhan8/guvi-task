import React, { useState } from 'react';
import { registerStudent } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const StudentRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    resume: '',
    coverLetter: '',
  });

  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerStudent(formData);
      alert('Registration Successful!');
      setFormData({ name: '', email: '', resume: '', coverLetter: '' }); 
    } catch (error) {
      console.error(error.message);
      alert('Error during registration. Please try again.');
    }
  };

  const handleClose = () => {
    navigate('/home'); // Navigate back to homepage on close
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 relative">
      {/* Close Button */}
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-all"
      >
        Close
      </button>

      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Student Registration</h2>
        
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
            required
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">Resume URL</label>
          <input
            type="url"
            name="resume"
            value={formData.resume}
            onChange={handleChange}
            className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">Cover Letter</label>
          <textarea
            name="coverLetter"
            value={formData.coverLetter}
            onChange={handleChange}
            className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default StudentRegistration;
