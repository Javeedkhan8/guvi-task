import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchVehicles, addVehicle, updateVehicle } from '../api/vehicleApi';
import BookingForm from './BookingForm';
import { Link } from 'react-router-dom';

const VehicleList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);
  const [filters, setFilters] = useState({ make: '', location: '', minPrice: '', maxPrice: '' });
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [vehicleFormData, setVehicleFormData] = useState({
    make: '',
    model: '',
    year: '',
    price_per_day: '',
    image: '',
    availability: true,
    average_rating: 0,
    userId: '',
  });

  const userId = localStorage.getItem('userId');

  // Fetch vehicles
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchVehicles(filters);
        setVehicles(data);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    };
    fetchData();
  }, [filters]);

  const handleVehicleSelection = (vehicle) => {
    setSelectedVehicle(vehicle);
    setVehicleFormData({
      make: vehicle.make || '',
      model: vehicle.model || '',
      year: vehicle.year || '',
      price_per_day: vehicle.price_per_day || '',
      image: vehicle.image || '',
      availability: vehicle.availability || true,
      average_rating: vehicle.average_rating || 0,
      userId: '', // Reset userId when editing a vehicle
    });
  };

  const handleAddVehicle = async () => {
    const { userId, ...vehicleData } = vehicleFormData;

    if (!userId) {
      alert('Please enter a valid user ID.');
      return;
    }

    try {
      const addedVehicle = await addVehicle({ ...vehicleData, user: userId });
      setVehicles([...vehicles, addedVehicle]); // Update the list with the new vehicle
      setVehicleFormData({ make: '', model: '', year: '', price_per_day: '', image: '', availability: true, average_rating: 0, userId: '' }); // Reset form
      alert('Vehicle added successfully!');
    } catch (error) {
      console.error('Error adding vehicle:', error);
    }
  };

  const handleUpdateVehicle = async () => {
    try {
      const updatedVehicle = await updateVehicle(selectedVehicle._id, vehicleFormData);
      setVehicles(vehicles.map(v => (v._id === updatedVehicle._id ? updatedVehicle : v))); // Update the list with the updated vehicle
      setSelectedVehicle(null); // Close the modal after updating
      setVehicleFormData({ make: '', model: '', year: '', price_per_day: '', image: '', availability: true, average_rating: 0, userId: '' }); // Reset form
      alert('Vehicle updated successfully!');
    } catch (error) {
      console.error('Error updating vehicle:', error);
    }
  };

  const handleBookClick = (vehicleId, pricePerDay) => {
    navigate(`/book/${vehicleId}`, {
      state: { vehicleId, pricePerDay },
    });
  };

  const handleReviewClick = (vehicleId) => {
    navigate(`/review/${vehicleId}`);
  };

  return (
    <div className="p-8 bg-blue-500 text-white min-h-screen">
      {/* Navbar */}
      <div className="flex justify-between items-center bg-gray-800 p-4 fixed top-0 left-0 w-full z-20">
        <h1 className="text-3xl font-bold text-gray-100">Vehicle Rental System</h1>
        <Link to ="/dashboard" className="text-xl text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors">Dashboard</Link>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSelectedVehicle({})} // Open form with empty data for adding new vehicle
            className="text-xl text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
          >
            Add Vehicle
          </button>
          {userId && (
            <div className="bg-gray-300 text-black px-4 py-2 rounded-md">
              User ID: {userId}
            </div>
          )}
        </div>
      </div>

      <div className="pt-20"> {/* Add padding top to prevent content from being hidden under navbar */}
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Explore Our Vehicles</h1>

        {/* Vehicle Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {vehicles.map((vehicle) => (
            <div
              key={vehicle._id}
              className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
            >
              <img
                src={vehicle.image}
                alt={`${vehicle.make} ${vehicle.model}`}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h2 className="text-2xl font-semibold text-gray-100">{vehicle.make} {vehicle.model}</h2>
              <p className="text-gray-100 text-sm mb-2">{vehicle.year}</p>
              <p className="text-gray-100 text-lg font-bold">${vehicle.price_per_day}/day</p>

              <div className="mt-4 flex justify-between">
                {/* Book Button */}
                <button
                  onClick={() => handleBookClick(vehicle._id, vehicle.price_per_day)}
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
                >
                  Book
                </button>

                {/* Review Button */}
                <button
                  onClick={() => handleReviewClick(vehicle._id)}
                  className="bg-yellow-600 text-white px-6 py-2 rounded-md hover:bg-yellow-700 transition-colors duration-200"
                >
                  Review
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Vehicle Form Modal */}
        {(selectedVehicle !== null) && (
          <div className="fixed inset-0 bg-gray-700 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-10 rounded-2xl shadow-2xl max-w-lg mx-auto text-white">
              <h2 className="text-3xl font-bold mb-8 text-center">
                {selectedVehicle._id ? 'Update Vehicle' : 'Add New Vehicle'}
              </h2>

              {/* Vehicle Form */}
              <div className="flex flex-col gap-4">
                <div className="mb-4">
                  <label htmlFor="userId" className="block text-sm font-semibold">User ID</label>
                  <input
                    type="text"
                    id="userId"
                    value={vehicleFormData.userId}
                    onChange={(e) => setVehicleFormData({ ...vehicleFormData, userId: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 rounded-md text-white"
                    placeholder="Enter user ID"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="make" className="block text-sm font-semibold">Make</label>
                  <input
                    type="text"
                    id="make"
                    value={vehicleFormData.make}
                    onChange={(e) => setVehicleFormData({ ...vehicleFormData, make: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 rounded-md text-white"
                    placeholder="Enter vehicle make"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="model" className="block text-sm font-semibold">Model</label>
                  <input
                    type="text"
                    id="model"
                    value={vehicleFormData.model}
                    onChange={(e) => setVehicleFormData({ ...vehicleFormData, model: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 rounded-md text-white"
                    placeholder="Enter vehicle model"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="year" className="block text-sm font-semibold">Year</label>
                  <input
                    type="text"
                    id="year"
                    value={vehicleFormData.year}
                    onChange={(e) => setVehicleFormData({ ...vehicleFormData, year: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 rounded-md text-white"
                    placeholder="Enter vehicle year"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="price_per_day" className="block text-sm font-semibold">Price per Day</label>
                  <input
                    type="number"
                    id="price_per_day"
                    value={vehicleFormData.price_per_day}
                    onChange={(e) => setVehicleFormData({ ...vehicleFormData, price_per_day: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 rounded-md text-white"
                    placeholder="Enter price per day"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="image" className="block text-sm font-semibold">Image URL</label>
                  <input
                    type="text"
                    id="image"
                    value={vehicleFormData.image}
                    onChange={(e) => setVehicleFormData({ ...vehicleFormData, image: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 rounded-md text-white"
                    placeholder="Enter image URL"
                  />
                </div>

                <div className="flex justify-center gap-4">
                  <button
                    onClick={selectedVehicle._id ? handleUpdateVehicle : handleAddVehicle}
                    className="bg-blue-600 text-white px-6 py-3 w-full rounded-md hover:bg-blue-700 transition-colors text-lg"
                  >
                    {selectedVehicle._id ? 'Update Vehicle' : 'Add Vehicle'}
                  </button>
                  <button
                    onClick={() => setSelectedVehicle(null)}
                    className="bg-red-600 text-white px-6 py-3 w-full rounded-md hover:bg-red-700 transition-colors text-lg"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VehicleList;
