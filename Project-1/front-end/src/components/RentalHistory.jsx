import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchRentalHistory } from '../api/vehicleApi';

const RentalHistory = () => {
  const location = useLocation();
  const { vehicleId, userId } = location.state || {}; // Retrieve props from state

  const [rentalHistory, setRentalHistory] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!vehicleId || !userId) {
      setError('Invalid vehicle ID or user ID');
      return;
    }

    const getRentalHistory = async () => {
      try {
        const history = await fetchRentalHistory(vehicleId, userId);
        setRentalHistory(history);
      } catch (err) {
        setError('Error fetching rental history');
      }
    };
    getRentalHistory();
  }, [vehicleId, userId]);

  return (
    <div>
      <h2>Rental History</h2>
      {error && <p className="text-red-500">{error}</p>}
      {rentalHistory.length === 0 ? (
        <p>No rental history available for this vehicle.</p>
      ) : (
        <ul>
          {rentalHistory.map((booking) => (
            <li key={booking._id} className="border-b py-4">
              <h3>{booking.user.name} ({booking.user.email})</h3>
              <p>
                From: {new Date(booking.start_date).toLocaleDateString()} <br />
                To: {new Date(booking.end_date).toLocaleDateString()} <br />
                Total Price: ${booking.total_price} <br />
                Duration: {Math.ceil((new Date(booking.end_date) - new Date(booking.start_date)) / (1000 * 60 * 60 * 24))} days
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RentalHistory;
