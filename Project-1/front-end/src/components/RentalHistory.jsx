import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchRentalHistory } from '../api/vehicleApi';

const RentalHistory = () => {
  const { vehicleId, userId } = useParams(); // Retrieve vehicleId and userId from URL params
  const [rentalHistory, setRentalHistory] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!vehicleId || !userId) {
      setError('Invalid vehicle ID or user ID');
      return;
    }

    const getRentalHistory = async () => {
      try {
        const history = await fetchRentalHistory(vehicleId, userId); // Fetch rental history
        setRentalHistory(history);
      } catch (err) {
        setError('Error fetching rental history');
      }
    };

    getRentalHistory();
  }, [vehicleId, userId]);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Rental History</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {rentalHistory.length === 0 ? (
          <p className="text-gray-600">No rental history available for this vehicle.</p>
        ) : (
          <div className="space-y-6">
            {rentalHistory.map((booking, index) => (
              <div
                key={booking._id || index}
                className="border border-gray-200 rounded-lg shadow-sm p-4 bg-gray-50"
              >
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Booking #{index + 1}
                </h3>
                <p className="text-gray-700">
                  <span className="font-medium">From:</span>{' '}
                  {new Date(booking.start_date).toLocaleDateString()}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">To:</span>{' '}
                  {new Date(booking.end_date).toLocaleDateString()}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Total Price:</span> $
                  {booking.total_price || 'N/A'}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Duration:</span>{' '}
                  {Math.ceil(
                    (new Date(booking.end_date) - new Date(booking.start_date)) /
                      (1000 * 60 * 60 * 24)
                  ) || 'N/A'}{' '}
                  days
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RentalHistory;
