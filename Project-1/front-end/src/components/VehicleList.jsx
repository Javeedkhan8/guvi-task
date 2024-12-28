import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import api from '../api/axiosConfig';

function VehicleList() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    api.get('/vehicles')
      .then(response => setVehicles(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="container mx-auto p-6 bg-gradient-to-r from-gray-800 via-gray-900 to-black">
      <h1 className="text-3xl font-bold text-white text-center mb-8">Our Vehicle Collection</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {vehicles.map(vehicle => (
          <div key={vehicle._id} className="bg-gray-900 rounded-lg shadow-lg hover:shadow-2xl transform transition duration-500 hover:scale-105">
            <img
              src={vehicle.images[0]}
              alt={vehicle.model}
              className="w-full h-64 object-cover rounded-t-lg transition-transform duration-300 hover:scale-110"
            />
            <div className="p-6 bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-b-lg">
              <h2 className="text-2xl font-semibold">{vehicle.make} {vehicle.model}</h2>
              <p className="mt-3 text-lg text-gray-300">{vehicle.description}</p>
              <p className="text-xl font-bold mt-4">Price per day: <span className="text-teal-400">${vehicle.pricePerDay}</span></p>
              <div className="mt-5 flex justify-between items-center">
                <Link 
                  to={`/vehicle/${vehicle._id}`} 
                  className="text-teal-400 hover:text-teal-500 hover:underline transition duration-300"
                >
                  View Details
                </Link>
                <Link to="/bookings" className="py-2 px-1 bg-teal-500 text-white rounded-lg shadow-md hover:bg-teal-600 hover:shadow-xl transition duration-300 transform hover:scale-105">
                            Book Now
                          </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VehicleList;
