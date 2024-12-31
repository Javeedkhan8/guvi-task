import { useState, useEffect } from 'react';
import { fetchInterviewSchedules, confirmInterview } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const InterviewDashboard = () => {
  const [interviews, setInterviews] = useState([]);
  const navigate = useNavigate();

  // Fetch interview schedules when the component mounts
  useEffect(() => {
    const loadInterviews = async () => {
      try {
        const data = await fetchInterviewSchedules();
        setInterviews(data);
      } catch (error) {
        console.error('Failed to load interview schedules:', error.message);
      }
    };

    loadInterviews();
  }, []);

  // Handle confirming an interview
  const handleConfirm = async (interviewId) => {
    try {
      const confirmedInterview = await confirmInterview(interviewId);
      alert('Interview confirmed successfully!');
      // Update the interview status in the state
      setInterviews((prevInterviews) =>
        prevInterviews.map((interview) =>
          interview._id === interviewId ? { ...interview, status: 'Confirmed' } : interview
        )
      );
    } catch (error) {
      alert('Error confirming interview: ' + error.message);
    }
  };

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

        <h2 className="text-3xl font-bold text-gradient bg-clip-text text-transparent bg-blue-500 mb-6 text-center">
          Interview Schedules
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-blue-100 text-blue-600">
                <th className="border px-6 py-3 text-left font-semibold">Student</th>
                <th className="border px-6 py-3 text-left font-semibold">Company</th>
                <th className="border px-6 py-3 text-left font-semibold">Job Title</th>
                <th className="border px-6 py-3 text-left font-semibold">Date</th>
                <th className="border px-6 py-3 text-left font-semibold">Time</th>
                <th className="border px-6 py-3 text-left font-semibold">Format</th>
                <th className="border px-6 py-3 text-left font-semibold">Status</th>
                <th className="border px-6 py-3 text-left font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {interviews.length > 0 ? (
                interviews.map((interview) => (
                  <tr key={interview._id} className="hover:bg-blue-50">
                    <td className="border px-6 py-3">{interview.student.name}</td>
                    <td className="border px-6 py-3">{interview.company.name}</td>
                    <td className="border px-6 py-3">{interview.jobTitle}</td>
                    <td className="border px-6 py-3">
                      {new Date(interview.interviewDate).toLocaleDateString()}
                    </td>
                    <td className="border px-6 py-3">{interview.interviewTime}</td>
                    <td className="border px-6 py-3">{interview.interviewFormat}</td>
                    <td className="border px-6 py-3">{interview.status}</td>
                    <td className="border px-6 py-3">
                      {interview.status !== 'Confirmed' && (
                        <button
                          onClick={() => handleConfirm(interview._id)}
                          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                        >
                          Confirm
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="border px-6 py-3 text-center text-gray-500"
                  >
                    No interviews found.
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

export default InterviewDashboard;
