import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { fetchUserProfile, fetchUserBookings, fetchUserReviews } from '../api/index';
import { modifyBooking, cancelBooking } from '../api/bookingApi';

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

  // Handle Modify Booking (redirect to Vehicle List with booking data)
  const handleModify = (booking) => {
    navigate('/vehiclelist', {
      state: { bookingDetails: booking },
    });
  };

  // Handle Cancel Booking
  const handleCancel = async (bookingId) => {
    try {
      await cancelBooking(bookingId);

      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking._id !== bookingId)
      );

      const storedBookings = JSON.parse(localStorage.getItem('bookings')) || [];
      const updatedBookings = storedBookings.filter((booking) => booking._id !== bookingId);
      localStorage.setItem('bookings', JSON.stringify(updatedBookings)); 

      alert('Booking canceled successfully');
    } catch (error) {
      console.error('Error canceling booking:', error);
    }
  };

  return (
    <div className="min-h-screen bg-blue-500 text-white">
      {/* Navbar */}
      <nav className="bg-gray-800 p-4">
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
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Go to Vehicle Page
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto p-8">
        <h1 className="text-5xl font-bold mb-8">Dashboard</h1>
        <h1 className="text-3xl font-bold mb-6">Welcome, {user.name} </h1>

        {/* Bookings Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Your Bookings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bookings.map((booking) => (
              <div key={booking._id} className="p-6 bg-gray-800 rounded-lg shadow-lg">
                <img
                  src={booking.vehicle.image} 
                  alt={`${booking.vehicle.make} ${booking.vehicle.model}`}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">
                  {booking.vehicle.make} {booking.vehicle.model}
                </h3>
                <p className="text-gray-400 text-sm mb-2">Start Date: {new Date(booking.start_date).toLocaleDateString()}</p>
                <p className="text-gray-400 text-sm mb-2">End Date: {new Date(booking.end_date).toLocaleDateString()}</p>
                <p className="text-lg font-bold text-gray-100">Total Price: ${booking.total_price}</p>

                <div className="mt-4 flex justify-between space-x-4">
                  <button
                    onClick={() => handleModify(booking)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Modify Booking
                  </button>
                  <button
                    onClick={() => handleCancel(booking._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                  >
                    Cancel Booking
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Reviews Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Your Reviews</h2>
          <div className="flex overflow-x-auto space-x-8">
            {reviews.map((review) => (
              <div key={review._id} className="p-6 bg-gray-800 rounded-lg shadow-lg flex-none w-80">
                <img
                  src={review.vehicle.image}
                  alt={`${review.vehicle.make} ${review.vehicle.model}`}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">
                  {review.vehicle.make} {review.vehicle.model}
                </h3>
                <p className="text-gray-400 text-sm mb-2">Rating: {review.rating}</p>
                <p className="text-gray-300">{review.review_text}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
