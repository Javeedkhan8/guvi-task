import axios from 'axios';


const API_BASE_URL = 'http://localhost:2002/api/bookings';

// Create a booking
export const createBooking = async (bookingData) => {
  try {
    console.log('Booking Data Sent to Backend:', bookingData);
    const response = await axios.post(API_BASE_URL, bookingData);
    return response.data;
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
};

export const fetchUserBookings = async (userId) => {
  try {
    const token = localStorage.getItem('apiKey');
    const response = await axios.get(`http://localhost:2002/api/dashboard/bookings`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw error;
  }
};

// Modify a booking
export const modifyBooking = async (id, updatedData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error modifying booking:', error);
    throw error;
  }
};

// Cancel a booking
export const cancelBooking = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/${id}`);
  } catch (error) {
    console.error('Error cancelling booking:', error);
    throw error;
  }
};
