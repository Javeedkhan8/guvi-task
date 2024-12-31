import { useState, useEffect } from 'react';
import { fetchStudents, fetchCompanies, scheduleInterview } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const InterviewSchedule = () => {
  const [students, setStudents] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [jobTitle, setJobTitle] = useState('');
  const [interviewDate, setInterviewDate] = useState('');
  const [interviewTime, setInterviewTime] = useState('');
  const [interviewFormat, setInterviewFormat] = useState('In-Person');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const navigate = useNavigate();

  // Fetch students and companies
  useEffect(() => {
    const loadStudents = async () => {
      const data = await fetchStudents();
      setStudents(data);
    };
    const loadCompanies = async () => {
      const data = await fetchCompanies();
      setCompanies(data);
    };
    loadStudents();
    loadCompanies();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const interviewData = {
      student: selectedStudent,
      company: selectedCompany,
      jobTitle,
      interviewDate,
      interviewTime,
      interviewFormat
    };
    try {
      const response = await scheduleInterview(interviewData);
      alert('Interview scheduled successfully!');
    } catch (error) {
      alert('Error scheduling interview: ' + error.message);
    }
  };

  return (
    <div className=" flex items-center justify-center bg-blue-50 text-gray-800">
      <div className="relative max-w-full sm:max-w-md w-full bg-white rounded-xl shadow-lg p-6 m-8">
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
          Schedule Interview
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Select Student</label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
              required
            >
              <option value="">Select Student</option>
              {students.map((student) => (
                <option key={student._id} value={student._id}>
                  {student.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Select Company</label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              required
            >
              <option value="">Select Company</option>
              {companies.map((company) => (
                <option key={company._id} value={company._id}>
                  {company.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Job Title</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Interview Date</label>
            <input
              type="date"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
              value={interviewDate}
              onChange={(e) => setInterviewDate(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Interview Time</label>
            <input
              type="time"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
              value={interviewTime}
              onChange={(e) => setInterviewTime(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Interview Format</label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
              value={interviewFormat}
              onChange={(e) => setInterviewFormat(e.target.value)}
              required
            >
              <option value="In-Person">In-Person</option>
              <option value="Virtual">Virtual</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Schedule Interview
          </button>
        </form>
      </div>
    </div>
  );
};

export default InterviewSchedule;
