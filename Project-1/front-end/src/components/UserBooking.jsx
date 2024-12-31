import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig';

function UserBookings() {
  const [userId, setUserId] = useState('');
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const response = await api.get(`/bookings/${userId}`);
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  return (
    <div>
      <h2>View User Bookings</h2>
      <input
        type="text"
        placeholder="Enter User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <button onClick={fetchBookings}>Fetch Bookings</button>
      <ul>
        {bookings.map((booking) => (
          <li key={booking._id}>
            Vehicle: {booking.vehicle.make} {booking.vehicle.model} ({booking.vehicle.year}) <br />
            Start Date: {booking.startDate} <br />
            End Date: {booking.endDate} <br />
            Total Amount: ${booking.totalAmount}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserBookings;
