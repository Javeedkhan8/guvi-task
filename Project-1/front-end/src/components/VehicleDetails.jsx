import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axiosConfig';
import { Link } from 'react-router-dom';

function VehicleDetails() {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);

  useEffect(() => {
    api.get(`/vehicles/${id}`)
      .then(response => setVehicle(response.data))
      .catch(error => console.error(error));
  }, [id]);

  if (!vehicle) return <div className="text-center text-gray-400">Loading...</div>;

  return (
    <div className="container mx-auto p-8 bg-gradient-to-r from-gray-800 via-gray-900 to-black min-h-screen">
      <div className="max-w-2xl mx-auto bg-gray-900 p-8 rounded-lg shadow-2xl">
        <h2 className="text-4xl font-extrabold text-teal-400 text-center mb-6">{vehicle.make} {vehicle.model}</h2>

        <div className="mb-6 flex justify-center">
          <img
            src={vehicle.images[0]}
            alt={vehicle.model}
            className="w-2/3 h-auto rounded-lg shadow-lg transform transition duration-300 hover:scale-105"
          />
        </div>

        <p className="text-lg text-gray-300 mb-4">{vehicle.description}</p>

        <p className="text-xl font-semibold text-teal-400 mb-4">Price per day: ${vehicle.pricePerDay}</p>

        <div className="text-center mt-6">
          <Link to="/bookings" className="py-3 px-8 bg-teal-500 text-white rounded-lg shadow-md hover:bg-teal-600 hover:shadow-xl transition duration-300 transform hover:scale-105">
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default VehicleDetails;
