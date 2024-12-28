import { useState, useEffect } from 'react';
import { fetchApplications } from '../utils/api';
import { Link, useNavigate } from 'react-router-dom';

const ApplicationsList = () => {
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadApplications = async () => {
      const data = await fetchApplications();
      setApplications(data);
    };
    loadApplications();
  }, []);

  return (
    <div className="h-screen flex items-center justify-center bg-blue-50 text-gray-800">
      <div className="relative max-w-6xl w-full bg-white rounded-xl shadow-lg p-8">
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

        {/* Title */}
        <h2 className="text-3xl font-bold text-gradient bg-clip-text text-transparent bg-blue-500 mb-6 text-center">
          Applications
        </h2>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-blue-100 text-blue-600">
                <th className="border px-6 py-3 text-left font-semibold">Student</th>
                <th className="border px-6 py-3 text-left font-semibold">Company</th>
                <th className="border px-6 py-3 text-left font-semibold">Job Title</th>
                <th className="border px-6 py-3 text-left font-semibold">Status</th>
                <th className="border px-6 py-3 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.length > 0 ? (
                applications.map((application) => (
                  <tr key={application._id} className="hover:bg-blue-50">
                    <td className="border px-6 py-3">{application.student.name}</td>
                    <td className="border px-6 py-3">{application.company.name}</td>
                    <td className="border px-6 py-3">{application.jobTitle}</td>
                    <td className="border px-6 py-3">{application.status}</td>
                    <td className="border px-6 py-3">
                      <Link
                        to={`/applications/${application._id}/status`}
                        className="text-blue-500 hover:underline"
                      >
                        Update Status
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="border px-6 py-3 text-center text-gray-500">
                    No applications found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ApplicationsList;
