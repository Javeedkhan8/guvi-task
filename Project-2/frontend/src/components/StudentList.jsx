import React, { useEffect, useState } from "react";
import { fetchStudents } from "../utils/api"; // Update the path as needed

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getStudents = async () => {
      try {
        const data = await fetchStudents();
        setStudents(data);
      } catch (err) {
        setError("Failed to fetch students. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getStudents();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Student List</h2>
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : students.length === 0 ? (
          <p className="text-center text-gray-500">No students found.</p>
        ) : (
          <div className="overflow-x-auto"> {/* Make table scrollable on small screens */}
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 border text-sm sm:text-base">ID</th>
                  <th className="px-4 py-2 border text-sm sm:text-base">Name</th>
                  <th className="px-4 py-2 border text-sm sm:text-base">Email</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id} className="text-center">
                    <td className="px-4 py-2 border text-sm sm:text-base">{student._id}</td>
                    <td className="px-4 py-2 border text-sm sm:text-base">{student.name}</td>
                    <td className="px-4 py-2 border text-sm sm:text-base">{student.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentList;
