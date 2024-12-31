// components/RentalReport.jsx
import React, { useState, useEffect } from 'react';
import { fetchRentalReport } from '../api/vehicleApi';

const RentalReport = ({ vehicleId }) => {
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
    <div>
      <h2>Rental History Report</h2>
      {error && <p className="text-red-500">{error}</p>}
      {report ? (
        <div>
          <p>Total Bookings: {report.totalBookings}</p>
          <p>Total Rental Duration: {report.totalDuration} days</p>
          <p>Total Earnings: ${report.totalEarnings}</p>
          <h3>Booking Details</h3>
          <ul>
            {report.bookings.map((booking, index) => (
              <li key={index} className="border-b py-4">
                <p>
                  User: {booking.user} <br />
                  From: {booking.start_date} <br />
                  To: {booking.end_date} <br />
                  Duration: {booking.duration} days <br />
                  Price: ${booking.total_price}
                </p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading report...</p>
      )}
    </div>
  );
};

export default RentalReport;
