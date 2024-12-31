import { useState, useEffect } from 'react';
import { fetchApplications, updateApplicationStatus } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const UpdateApplicationStatus = () => {
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState('');
  const [status, setStatus] = useState('Submitted');
  const navigate = useNavigate();

  // Fetch all applications on mount
  useEffect(() => {
    const loadApplications = async () => {
      const data = await fetchApplications();
      setApplications(data);
    };
    loadApplications();
  }, []);

  const handleStatusChange = async (e) => {
    e.preventDefault();
    try {
      await updateApplicationStatus(selectedApplication, status);
      alert('Application status updated successfully!');
      // Optionally, refetch the applications list to reflect changes
      const data = await fetchApplications();
      setApplications(data);
    } catch (error) {
      alert('Error updating status: ' + error.message);
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

        <h2 className="text-3xl font-bold text-gradient bg-clip-text text-transparent bg-blue-500 mb-6 text-center">
          Update Application Status
        </h2>
        <form onSubmit={handleStatusChange}>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Select Application
            </label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
              value={selectedApplication}
              onChange={(e) => setSelectedApplication(e.target.value)}
              required
            >
              <option value="">Select Application</option>
              {applications.map((application) => (
                <option key={application._id} value={application._id}>
                  {application.student.name} - {application.company.name} - {application.jobTitle}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Select Status
            </label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="Submitted">Submitted</option>
              <option value="Reviewed">Reviewed</option>
              <option value="Shortlisted">Shortlisted</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Update Status
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateApplicationStatus;
