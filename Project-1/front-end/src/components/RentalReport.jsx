import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchRentalReport } from '../api/vehicleApi';

const RentalReport = () => {
  const { vehicleId } = useParams();
  const [report, setReport] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const getReport = async () => {
      try {
        const reportData = await fetchRentalReport(vehicleId);
        setReport(reportData);
      } catch (err) {
        setError('Error fetching rental report');
      }
    };
    getReport();
  }, [vehicleId]);

  return (
    <div className="bg-gray-900 text-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-green-400">Rental History Report</h2>

      {error && (
        <div className="bg-red-700 text-white p-4 rounded-md mb-6">
          <p>{error}</p>
        </div>
      )}

      {report ? (
        <div className="space-y-4">
          <div className="bg-gray-800 p-6 rounded-md shadow-md">
            <p className="text-xl">
              <span className="font-bold text-green-400">Total Bookings:</span> {report.totalBookings}
            </p>
            <p className="text-xl">
              <span className="font-bold text-green-400">Total Rental Duration:</span> {report.totalDuration} days
            </p>
            <p className="text-xl">
              <span className="font-bold text-green-400">Total Earnings:</span> ${report.totalEarnings}
            </p>
          </div>

          <h3 className="text-2xl font-semibold text-gray-300 mt-8">Booking Details</h3>
          <div className="bg-gray-800 p-6 rounded-md shadow-md space-y-4">
            {report.bookings.length > 0 ? (
              report.bookings.map((booking, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-700 rounded-md shadow hover:bg-gray-600 transition-colors"
                >
                  <p>
                    <span className="font-bold text-green-400">From:</span> {booking.start_date}
                  </p>
                  <p>
                    <span className="font-bold text-green-400">To:</span> {booking.end_date}
                  </p>
                  <p>
                    <span className="font-bold text-green-400">Duration:</span> {booking.duration} days
                  </p>
                  <p>
                    <span className="font-bold text-green-400">Price:</span> ${booking.total_price}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No bookings available for this vehicle.</p>
            )}
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <p className="text-gray-400 animate-pulse">Loading report...</p>
        </div>
      )}
    </div>
  );
};

export default RentalReport;
