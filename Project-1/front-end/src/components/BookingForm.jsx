import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar'; // Calendar for date range selection
import 'react-calendar/dist/Calendar.css'; // Import calendar styles
import { createBooking } from '../api/bookingApi'; // Import API function to create booking
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate

const BookingForm = ({ onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Destructure vehicleId and userId from location.state
  const { vehicleId, userId: locationUserId, pricePerDay } = location.state || {};

  const [userId, setUserId] = useState(locationUserId || ''); // Use location's userId or initialize empty
  const [dates, setDates] = useState([new Date(), new Date()]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const calculatePrice = () => {
      const diffTime = Math.abs(dates[1] - dates[0]);
      const diffDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
      setTotalPrice(diffDays * pricePerDay);
    };
    calculatePrice();
  }, [dates, pricePerDay]);

  const handleBooking = async () => {
    if (!userId) {
      setError('Please enter a User ID to proceed with the booking.');
      return;
    }

    setLoading(true);
    const bookingData = {
      user: userId,
      vehicle: vehicleId,
      start_date: dates[0],
      end_date: dates[1],
      total_price: totalPrice,
    };

    try {
      await createBooking(bookingData);
      alert('Booking confirmed!');
      navigate(`/user/bookings/${userId}`);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating booking');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-blue-600 text-white min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-bold text-gray-100 mb-6">
        Book Your Vehicle
      </h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="mb-6 flex justify-center">
        <label htmlFor="dates" className="block text-lg mb-1 text-xl font-semibold">Select Dates</label>
      </div>

      <div className="mb-6 flex justify-center">
        <Calendar
          className="bg-blue-300 text-black rounded-md p-2"
          value={dates}
          onChange={setDates}
          selectRange
        />
      </div>

      <div className="mb-6">
        <label htmlFor="userId" className="block text-lg mb-2">User ID:</label>
        <input
          type="text"
          id="userId"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="w-full p-2 bg-gray-300 rounded-md"
          placeholder="Enter your User ID"
        />
      </div>

      <div className="mb-6">
        <p className="text-xl font-semibold">Total Price: ${totalPrice}</p>
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={handleBooking}
          className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors text-md"
        >
          {loading ? 'Confirming Booking...' : 'Confirm Booking'}
        </button>
        <button
          onClick={() => navigate('/vehiclelist')}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors text-sm"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default BookingForm;
