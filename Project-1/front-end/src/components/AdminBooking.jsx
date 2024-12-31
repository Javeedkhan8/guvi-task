import React, { useState } from 'react';
import api from '../api/axiosConfig';

function AdminBooking() {
  const [bookingId, setBookingId] = useState('');
  const [booking, setBooking] = useState(null);

  const fetchBooking = async () => {
    try {
      const response = await api.get(`/admin/${bookingId}`);
      setBooking(response.data);
    } catch (error) {
      console.error('Error fetching booking:', error);
    }
  };

  return (
    <div>
      <h2>Admin: View Booking Details</h2>
      <input
        type="text"
        placeholder="Enter Booking ID"
        value={bookingId}
        onChange={(e) => setBookingId(e.target.value)}
      />
      <button onClick={fetchBooking}>Fetch Booking</button>
      {booking && (
        <div>
          <h3>Booking Details</h3>
          <p>User: {booking.user.username} ({booking.user.email})</p>
          <p>
            Vehicle: {booking.vehicle.make} {booking.vehicle.model} ({booking.vehicle.year})
          </p>
          <p>Start Date: {booking.startDate}</p>
          <p>End Date: {booking.endDate}</p>
          <p>Total Amount: ${booking.totalAmount}</p>
        </div>
      )}
    </div>
  );
}

export default AdminBooking;
