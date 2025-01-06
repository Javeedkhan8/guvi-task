import { useState, useEffect } from 'react';
import { fetchApplications, updateApplicationStatus } from '../utils/api';

const DashboardPage = () => {
  const [applications, setApplications] = useState([]);

  // Fetch applications on mount
  useEffect(() => {
    const loadApplications = async () => {
      const data = await fetchApplications();
      setApplications(data);
    };
    loadApplications();
  }, []);

  const handleStatusChange = async (applicationId, newStatus) => {
    try {
      await updateApplicationStatus(applicationId, newStatus);

      // Update the local state to reflect the status change
      setApplications((prevApplications) =>
        prevApplications.map((app) =>
          app._id === applicationId ? { ...app, status: newStatus } : app
        )
      );
      alert('Application status updated successfully!');
    } catch (error) {
      alert('Error updating status: ' + error.message);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-gradient-to-r from-blue-50 to-blue-100 shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center text-blue-700 mb-6">Applications Dashboard</h2>
      
      {/* Table Wrapper for Responsiveness */}
      <div className="overflow-x-auto"> {/* Make table scrollable on small screens */}
        <table className="w-full table-auto border-collapse shadow-md bg-white rounded-lg">
          <thead>
            <tr className="bg-blue-200 text-gray-700">
              <th className="border px-6 py-3 text-sm sm:text-lg font-semibold">Student</th>
              <th className="border px-6 py-3 text-sm sm:text-lg font-semibold">Company</th>
              <th className="border px-6 py-3 text-sm sm:text-lg font-semibold">Job Title</th>
              <th className="border px-6 py-3 text-sm sm:text-lg font-semibold">Status</th>
              <th className="border px-6 py-3 text-sm sm:text-lg font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => (
              <tr
                key={application._id}
                className="hover:bg-blue-50 transition-all duration-300"
              >
                <td className="border px-6 py-4 text-sm sm:text-base text-gray-800">{application.student.name}</td>
                <td className="border px-6 py-4 text-sm sm:text-base text-gray-800">{application.company.name}</td>
                <td className="border px-6 py-4 text-sm sm:text-base text-gray-800">{application.jobTitle}</td>
                <td className="border px-6 py-4 text-sm sm:text-base text-gray-800">{application.status}</td>
                <td className="border px-6 py-4">
                  <select
                    className="px-3 py-1 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 text-sm sm:text-base"
                    value={application.status}
                    onChange={(e) =>
                      handleStatusChange(application._id, e.target.value)
                    }
                  >
                    <option value="Submitted">Submitted</option>
                    <option value="Reviewed">Reviewed</option>
                    <option value="Shortlisted">Shortlisted</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardPage;
