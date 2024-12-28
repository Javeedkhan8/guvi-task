import React, { useState } from 'react';
import api from '../api/axiosConfig';

function BookingForm() {
  const [vehicleId, setVehicleId] = useState('');
  const [userId, setUserId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [message, setMessage] = useState('');

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/bookings', {
        vehicleId,
        userId,
        startDate,
        endDate,
        totalAmount,
      });
      if (!vehicleId || !userId || !startDate || !endDate || !totalAmount) {
        setMessage('Please fill in all fields.');
        return;
      }
      setMessage(response.data.message);
    } catch {
      setMessage('Booking failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center p-6">
      <div className="max-w-lg w-full bg-gray-900 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-white text-center mb-6">Create Booking</h2>

        <form onSubmit={handleBooking}>
          <div className="mb-4">
            <label className="text-white font-medium">Vehicle ID</label>
            <input
              type="text"
              value={vehicleId}
              onChange={(e) => setVehicleId(e.target.value)}
              className="w-full p-3 mt-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="mb-4">
            <label className="text-white font-medium">User ID</label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full p-3 mt-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="mb-4">
            <label className="text-white font-medium">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-3 mt-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="mb-4">
            <label className="text-white font-medium">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full p-3 mt-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="mb-4">
            <label className="text-white font-medium">Total Amount</label>
            <input
              type="number"
              value={totalAmount}
              onChange={(e) => setTotalAmount(e.target.value)}
              className="w-full p-3 mt-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-teal-400 text-white font-semibold rounded-md hover:from-blue-600 hover:to-teal-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Book Now
          </button>
        </form>

        {message && <p className="text-green-400 text-center mt-4">{message}</p>}
      </div>
    </div>
  );
}

export default BookingForm;
