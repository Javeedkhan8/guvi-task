// utils/api.js
import axios from 'axios';

// Set your backend API base URL
const API_BASE_URL = 'https://guvi-task-15-14d9.onrender.com/api';

// Student API Endpoints
export const registerStudent = async (studentData) => {
  const response = await axios.post(`${API_BASE_URL}/students/register`, studentData);
  return response.data;
};

export const loginstudent = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/students/login`, { email, password });
    const { token } = response.data;

    // Decode the token to extract the userId (optional if you need to store it separately)
    const decoded = JSON.parse(atob(token.split('.')[1])); // Decode JWT to get userId

    // Store token in localStorage
    localStorage.setItem('token', token); // Store the token for future requests
    localStorage.setItem('studentId', decoded.studentId); 

    return response.data; // Return the response as needed
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
};

export const registerAdmin = async (name, email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/admin/register`, { name, email, password });
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};



export const loginAdmin = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/admin/login`, { email, password });
    const { token } = response.data;

    // Decode the token to extract the userId (optional if you need to store it separately)
    const decoded = JSON.parse(atob(token.split('.')[1])); // Decode JWT to get userId

    // Store token in localStorage
    localStorage.setItem('token', token); // Store the token for future requests
    localStorage.setItem('adminId', decoded.adminId); 

    return response.data; // Return the response as needed
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
};



export const fetchStudents = async () => {
  const response = await axios.get(`${API_BASE_URL}/students`);
  return response.data;
};

// Application API Endpoints
export const fetchApplications = async () => {
  const response = await axios.get(`${API_BASE_URL}/applications`);
  return response.data;
};

export const submitApplication = async (applicationData) => {
  const response = await axios.post(`${API_BASE_URL}/applications/create`, applicationData);
  return response.data;
};

export const updateApplicationStatus = async (applicationId, status) => {
  const response = await axios.patch(`${API_BASE_URL}/applications/${applicationId}/status`, { status });
  return response.data;
};

// Company API Endpoints
export const fetchCompanies = async () => {
  const response = await axios.get(`${API_BASE_URL}/companies`);
  return response.data;
};

export const createCompany = async (companyData) => {
  const response = await axios.post(`${API_BASE_URL}/companies`, companyData);
  return response.data;
};

// Interview Scheduling API Endpoints
export const fetchInterviewSchedules = async () => {
  const response = await axios.get(`${API_BASE_URL}/interviews`);
  return response.data;
};

export const scheduleInterview = async (interviewData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/interviews/schedule`, interviewData);
    return response.data;
  } catch (error) {
    console.error('Error scheduling interview:', error.message);
    throw error;
  }
};

export const confirmInterview = async (interviewId) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/interviews/${interviewId}/confirm`);
    return response.data;
  } catch (error) {
    console.error('Error confirming interview:', error.message);
    throw error;
  }
};

// Utility Functions
export const fetchFromAPI = async (endpoint) => {
  const response = await axios.get(`${API_BASE_URL}${endpoint}`);
  return response.data;
};

export const postToAPI = async (endpoint, data) => {
  const response = await axios.post(`${API_BASE_URL}${endpoint}`, data);
  return response.data;
};

export const fetchReports = async () => {
  const response = await axios.get(`${API_BASE_URL}/reports`);
  return response.data;
};

export const deleteInterviewSchedule = async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/interviews/${id}`);
    return response.data;
  };
