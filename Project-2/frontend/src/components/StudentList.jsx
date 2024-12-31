import React, { useState, useEffect } from 'react';
import { fetchStudents } from '../utils/api'; // Ensure the correct import path

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getStudents = async () => {
      try {
        const data = await fetchStudents();
        setStudents(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    getStudents();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  if (loading) return <p className="text-center text-xl text-blue-500">Loading students...</p>;
  if (error) return <p className="text-center text-xl text-red-500">Error: {error}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-teal-100 p-8">
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-8 shadow-lg">
        Student List
      </h2>
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-2xl border-t-4 border-teal-500">
        <table className="min-w-full table-auto">
          <thead className="bg-teal-700 text-white shadow-md">
            <tr>
              <th className="px-6 py-4 text-lg font-semibold">Name</th>
              <th className="px-6 py-4 text-lg font-semibold">Email</th>
              <th className="px-6 py-4 text-lg font-semibold">Resume</th>
              <th className="px-6 py-4 text-lg font-semibold">Cover Letter</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr
                key={student._id}
                className="border-b hover:bg-teal-50 transition duration-300"
              >
                <td className="px-6 py-4 text-sm">{student.name}</td>
                <td className="px-6 py-4 text-sm">{student.email}</td>
                <td className="px-6 py-4 text-sm">
                  <a
                    href={student.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-600 hover:underline transition duration-200"
                  >
                    View Resume
                  </a>
                </td>
                <td className="px-6 py-4 text-sm">
                  {student.coverLetter ? (
                    <span className="text-green-500 font-semibold">Available</span>
                  ) : (
                    <span className="text-gray-500">N/A</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentList;
