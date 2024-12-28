import React from 'react';
import VehicleList from '../components/VehicleList';

function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white">
      <div className="container mx-auto p-8">
        <h1 className="text-5xl font-extrabold text-teal-400 text-center mb-8">Dashboard</h1>
        
        <div className="bg-gray-900 rounded-lg p-6 shadow-xl">
          <h2 className="text-3xl font-semibold text-gray-200 mb-4">Available Vehicles</h2>
          
          {/* Vehicle List */}
          <VehicleList />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
