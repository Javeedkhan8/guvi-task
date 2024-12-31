import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchUserBookings, cancelBooking } from '../api/bookingApi';

const UserBookings = () => {
  const { userId } = useParams(); // Get userId from URL params
  const navigate = useNavigate(); // Initialize navigate
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const getBookings = async () => {
      try {
        const bookings = await fetchUserBookings(userId); // Fetch bookings for the user
        setBookings(bookings);
      } catch (err) {
        setError('Error fetching bookings');
      }
    };
    if (userId) getBookings();
  }, [userId]);

  const handleCancel = async (bookingId) => {
    try {
      await cancelBooking(bookingId); // Cancel the booking
      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking._id !== bookingId)
      );
    } catch (err) {
      setError('Error canceling booking');
    }
  };

  const handleClose = () => {
    navigate('/dashboard'); // Navigate back to the Dashboard
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      {/* Header with close button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold">Your Bookings</h2>
        <button
          onClick={handleClose}
          className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
        >
          Close
        </button>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* No bookings message */}
      {bookings.length === 0 ? (
        <p className="text-gray-400">No bookings found.</p>
      ) : (
        <div className="space-y-6">
          {/* Booking List */}
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">
                  {booking.vehicle.make} {booking.vehicle.model}
                </h3>
                <span className="text-gray-400 text-sm">
                  {new Date(booking.start_date).toLocaleDateString()} -{' '}
                  {new Date(booking.end_date).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-200 mb-4">
                <strong>Total Price:</strong> ${booking.total_price}
              </p>

              {/* Smaller Cancel Booking Button */}
              <button
                className="bg-red-600 text-white py-1 px-4 rounded-md hover:bg-red-700 transition-colors"
                onClick={() => handleCancel(booking._id)}
              >
                Cancel
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserBookings;
