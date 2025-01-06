import React, { useEffect, useState } from "react";
import { fetchApplications } from "../utils/api";
import { useNavigate } from "react-router-dom";

const ReadOnlyDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadApplications = async () => {
      try {
        const data = await fetchApplications();
        setApplications(data);
      } catch (err) {
        setError("Failed to fetch applications. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadApplications();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-6 flex flex-col justify-center">
      <div className="w-full max-w-screen-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-semibold text-center text-blue-700 mb-6">
          Application Updates
        </h1>
        <button
          onClick={() => navigate(-1)} // Navigate back to the previous page
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 focus:outline-none"
        > <svg
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
      </svg></button>

        <p className="text-lg text-gray-600 mb-8 text-center">
          View the current status of your placement applications. All data is
          read-only.
        </p>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : applications.length === 0 ? (
          <p className="text-center text-gray-500">
            No applications found at this time.
          </p>
        ) : (
          <table className="w-full table-auto border-collapse bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-blue-200 text-gray-700">
                <th className="border px-4 py-2 text-lg font-semibold">
                  Student
                </th>
                <th className="border px-4 py-2 text-lg font-semibold">
                  Company
                </th>
                <th className="border px-4 py-2 text-lg font-semibold">
                  Job Title
                </th>
                <th className="border px-4 py-2 text-lg font-semibold">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {applications.map((application) => (
                <tr
                  key={application._id}
                  className="hover:bg-blue-50 transition-all duration-300"
                >
                  <td className="border px-4 py-2 text-gray-800">
                    {application.student.name}
                  </td>
                  <td className="border px-4 py-2 text-gray-800">
                    {application.company.name}
                  </td>
                  <td className="border px-4 py-2 text-gray-800">
                    {application.jobTitle}
                  </td>
                  <td className="border px-4 py-2 text-gray-800">
                    {application.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ReadOnlyDashboard;
