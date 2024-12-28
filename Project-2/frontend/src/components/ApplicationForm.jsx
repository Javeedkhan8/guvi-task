import { useState, useEffect } from 'react';
import { submitApplication, fetchCompanies, fetchStudents } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const ApplicationForm = () => {
  const [student, setStudent] = useState('');
  const [company, setCompany] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [students, setStudents] = useState([]);
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();

  // Fetch students and companies on mount
  useEffect(() => {
    const loadData = async () => {
      const fetchedStudents = await fetchStudents();
      const fetchedCompanies = await fetchCompanies();
      setStudents(fetchedStudents);
      setCompanies(fetchedCompanies);
    };
    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const applicationData = { student, company, jobTitle };

    try {
      await submitApplication(applicationData);
      alert('Application submitted successfully!');
    } catch (error) {
      alert('Error submitting application: ' + error.message);
    }
  };

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

        {/* Form Title */}
        <h2 className="text-3xl font-bold text-gradient bg-clip-text text-transparent bg-blue-500 mb-6">
          Create Application
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Student Dropdown */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Student
            </label>
            <select
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={student}
              onChange={(e) => setStudent(e.target.value)}
              required
            >
              <option value="">Select Student</option>
              {students.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* Company Dropdown */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Company
            </label>
            <select
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            >
              <option value="">Select Company</option>
              {companies.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Job Title Input */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Job Title
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplicationForm;
