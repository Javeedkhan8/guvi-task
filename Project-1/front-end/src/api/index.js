// src/api/index.js
import axios from 'axios';

// Set up Axios instance
const api = axios.create({
  baseURL: 'https://guvi-task-9-yc6g.onrender.com/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to register a new user
export const registerUser = async (name, email, password) => {
  try {
    const response = await api.post('/auth/register', { name, email, password });
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

// Function to log in a user
export const loginUser = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    const { token } = response.data;

    // Decode the token to extract the userId (optional if you need to store it separately)
    const decoded = JSON.parse(atob(token.split('.')[1])); // Decode JWT to get userId

    // Store token in localStorage
    localStorage.setItem('authToken', token); // Store the token for future requests
    localStorage.setItem('userId', decoded.userId); // Store userId for later use (if needed)

    return response.data; // Return the response as needed
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
};


// Function to fetch the user profile
export const fetchUserProfile = async (token) => {
  try {
    const token = localStorage.getItem('apiKey');
    const response = await api.get('/auth/profile', {
      headers: { 
        Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

// Function to fetch user bookings
export const fetchUserBookings = async (token) => {
  try {
    const response = await api.get('/dashboard/bookings', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw error;
  }
};

// Function to fetch user reviews
export const fetchUserReviews = async (token) => {
  try {
    const response = await api.get('/dashboard/reviews', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw error;
  }
};

// Function to update user profile
export const updateUserProfile = async (token, updatedUserData) => {
  try {
    const response = await api.put('/dashboard/profile', updatedUserData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

// Function to submit a review for a vehicle
export const submitReview = async (vehicleId, rating, reviewText, token) => {
  try {
    const userId = localStorage.getItem('userId'); // Retrieve the user ID from localStorage
    if (!userId) throw new Error('User is not logged in.');

    const response = await api.post(
      '/reviews',
      {
        user: userId, // Include the user ID
        vehicle: vehicleId,
        rating,
        review_text: reviewText, // Keep field naming consistent with your backend
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include token for authentication
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error submitting review:', error);
    throw error;
  }
};


// Function to fetch vehicle reviews
export const fetchVehicleReviews = async (vehicleId) => {
  try {
    const response = await api.get(`/reviews/${vehicleId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching vehicle reviews:', error);
    throw error;
  }
};
