import React, { useEffect, useState } from 'react';
import api from '../api/axiosConfig';

const AdminDashboard = () => {
  const [popularVehicles, setPopularVehicles] = useState([]);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    api.get('/analytics/popular-vehicles')
      .then(response => setPopularVehicles(response.data));

    axios.get('/analytics/revenue')
      .then(response => setRevenue(response.data.revenue));
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <h3>Popular Vehicles</h3>
      <ul>
        {popularVehicles.map(vehicle => (
          <li key={vehicle._id}>{vehicle.make} {vehicle.model} - Booked {vehicle.bookedCount} times</li>
        ))}
      </ul>

      <h3>Total Revenue</h3>
      <p>${revenue}</p>
    </div>
  );
};

export default AdminDashboard;