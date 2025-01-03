import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { fetchUserProfile, fetchUserBookings, fetchUserReviews } from '../api/index';
import { cancelBooking } from '../api/bookingApi';

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // States
  const [userId, setUserId] = useState(location.state?.userId || localStorage.getItem('userId'));
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (!userId) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const token = localStorage.getItem('apiKey');
        const userResponse = await fetchUserProfile(token);
        setUser(userResponse);

        const bookingsResponse = await fetchUserBookings(token);
        setBookings(bookingsResponse);

        const reviewsResponse = await fetchUserReviews(token);
        setReviews(reviewsResponse);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userId, navigate]);

  if (!user) return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-xl font-semibold text-gray-600">Loading...</p>
    </div>
  );

  // Handle Cancel Booking
  const handleCancel = async (bookingId) => {
    try {
      await cancelBooking(bookingId);

      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking._id !== bookingId)
      );

      alert('Booking canceled successfully');
    } catch (error) {
      console.error('Error canceling booking:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-400 text-white">
      {/* Navbar */}
      <nav className="bg-black p-4">
        <div className="flex justify-between items-center container mx-auto">
          <Link to="/" className="text-2xl font-bold text-white">Rental System</Link>
          <div className="space-x-4">
            <Link 
              to={`/profile/${userId}`} 
              className="text-blue-500 hover:text-blue-700 font-semibold text-lg"
            >
              Edit Profile
            </Link>
            <button
              onClick={() => navigate('/vehiclelist')}
              className="text-blue-500 px-6 py-2 rounded-md hover:text-blue-700 text-lg font-semibold transition-colors"
            >
              Go to Vehicle List
            </button>
          </div>
        </div>
      </nav>
      <h1 className="text-3xl p-4 font-bold mb-8 text-gray-600 bg-white text-center">Dashboard</h1>

      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-semibold mb-6 text-center">Welcome, {user.name}</h1>

        {/* Bookings Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Your Bookings</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {bookings.map((booking) => (
              <div key={booking._id} className="p-6 bg-white border border-2 shadow-lg">
                {/* Booking Image */}
                {booking.vehicle && booking.vehicle.image ? (
                  <img
                    src={booking.vehicle.image} 
                    alt={`${booking.vehicle.make} ${booking.vehicle.model}`}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-600 rounded-lg mb-4"></div> // Placeholder if no image
                )}
                <h3 className="text-xl text-gray-800 font-semibold mb-2">
                  {booking.vehicle ? `${booking.vehicle.make} ${booking.vehicle.model}` : 'Vehicle details not available'}
                </h3>
                <p className="text-gray-400 text-sm mb-2">Start Date: {new Date(booking.start_date).toLocaleDateString()}</p>
                <p className="text-gray-400 text-sm mb-2">End Date: {new Date(booking.end_date).toLocaleDateString()}</p>
                <p className="text-lg font-bold text-gray-800">Total Price: ${booking.total_price}</p>
                <button
                  onClick={() => handleCancel(booking._id)}
                  className="mt-4 bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors"
                >
                  Cancel Booking
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Your Reviews</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <div key={review._id} className="p-6 bg-gray-800 rounded-lg shadow-lg flex-none w-80">
                {/* Review Image */}
                {review.vehicle && review.vehicle.image ? (
                  <img
                    src={review.vehicle.image}
                    alt={`${review.vehicle.make} ${review.vehicle.model}`}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-600 rounded-lg mb-4"></div> // Placeholder if no image
                )}
                <h3 className="text-xl font-semibold mb-2">
                  {review.vehicle ? `${review.vehicle.make} ${review.vehicle.model}` : 'Vehicle details not available'}
                </h3>
                <p className="text-gray-400 text-sm mb-2">Rating: {review.rating}</p>
                <p className="text-gray-300">{review.review_text}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
