import React, { useEffect, useState } from 'react';
import { fetchReports } from '../utils/api';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const ReportsPage = () => {
  const [reports, setReports] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadReports = async () => {
      try {
        const data = await fetchReports();
        setReports(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch reports.');
        setLoading(false);
      }
    };
    loadReports();
  }, []);

  if (loading) return <div className="text-center text-3xl text-gray-400">Loading reports...</div>;
  if (error) return <div className="text-center text-3xl text-red-500">{error}</div>;

  // Data for Applications by Status Chart
  const applicationsByStatusData = {
    labels: reports.applicationsByStatus.map((item) => item._id),
    datasets: [
      {
        label: 'Applications by Status',
        data: reports.applicationsByStatus.map((item) => item.count),
        backgroundColor: ['#4CAF50', '#FFC107', '#F44336', '#2196F3', '#9C27B0'],
        borderWidth: 2,
        borderColor: '#fff',
      },
    ],
  };

  // Data for Interviews by Status Chart
  const interviewsByStatusData = {
    labels: reports.interviewsByStatus.map((item) => item._id),
    datasets: [
      {
        label: 'Interviews by Status',
        data: reports.interviewsByStatus.map((item) => item.count),
        backgroundColor: ['#FF9800', '#4CAF50', '#F44336'],
        borderWidth: 2,
        borderColor: '#fff',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 p-8">
      <h1 className="text-4xl font-extrabold text-white mb-12 text-center">Reports and Analytics</h1>

      {/* Placement Success Rate */}
      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl mb-12 hover:shadow-xl transition-shadow duration-300">
        <h2 className="text-2xl font-semibold text-white mb-4">Placement Success Rate</h2>
        <p className="text-3xl text-blue-400 font-semibold">{reports.placementSuccessRate.toFixed(2)}%</p>
      </div>

      {/* Applications by Status */}
      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl mb-12 hover:shadow-xl transition-shadow duration-300">
        <h2 className="text-2xl font-semibold text-white mb-4">Applications by Status</h2>
        <div className="h-80">
          <Bar data={applicationsByStatusData} options={{ maintainAspectRatio: false, responsive: true }} />
        </div>
      </div>

      {/* Interviews by Status */}
      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl mb-12 hover:shadow-xl transition-shadow duration-300">
        <h2 className="text-2xl font-semibold text-white mb-4">Interviews by Status</h2>
        <div className="h-80">
          <Pie data={interviewsByStatusData} options={{ maintainAspectRatio: false, responsive: true }} />
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
