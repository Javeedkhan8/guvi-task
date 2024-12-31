import axios from 'axios';

const API_BASE_URL = 'https://guvi-task-9-yc6g.onrender.com/api/vehicles'; 

// Fetch all vehicles with optional filters
export const fetchVehicles = async (filters) => {
  try {
    const response = await axios.get(API_BASE_URL, { params: filters });
    return response.data;
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    throw error;
  }
};

// Add a new vehicle
export const addVehicle = async (vehicleData) => {
  try {
    const response = await axios.post(API_BASE_URL, vehicleData,{
      headers:{
        "Content-Type":"application/json"
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error adding vehicle:', error);
    throw error;
  }
};

// Update a vehicle
export const updateVehicle = async (id, updatedData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error updating vehicle:', error);
    throw error;
  }
};

// Delete a vehicle
export const deleteVehicle = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/${id}`);
  } catch (error) {
    console.error('Error deleting vehicle:', error);
    throw error;
  }
};

export const fetchRentalHistory = async (vehicleId, userId) => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await axios.get(`${API_BASE_URL}/${vehicleId}/${userId}/rental-history`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching rental history:', error);
    throw error;
  }
};

  
  // Fetch rental history report for a vehicle
  export const fetchRentalReport = async (vehicleId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/reports/${vehicleId}/report`);
      return response.data;
    } catch (error) {
      console.error('Error fetching rental report:', error);
      throw error;
    }
  };