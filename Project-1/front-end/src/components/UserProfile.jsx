import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Added useNavigate for navigation
import { fetchUserProfile, updateUserProfile } from '../api/index';
import UserBookings from './UserBookings';

const UserProfile = () => {
  const { userId } = useParams(); // Get userId from the URL params
  const navigate = useNavigate(); // Hook for navigation
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bookings, setBookings] = useState([]); // Initialize as an empty array
  const [isEditing, setIsEditing] = useState(false);
  const token = localStorage.getItem('apiKey'); // Get the token from localStorage

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!token) {
          console.error('Token is missing!');
          return;
        }

        // Fetch user profile based on userId
        const data = await fetchUserProfile(userId, token);
        setUser(data);
        setName(data.name);
        setEmail(data.email);
        setBookings(data.bookings || []); // Ensure bookings is always an array
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    if (userId && token) {
      fetchProfile();
    }
  }, [userId, token]);

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await updateUserProfile(token, { name, email });
      setUser(updatedUser); // Update the user state with the new data
      setIsEditing(false); // Exit edit mode
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  // Close button handler
  const handleClose = () => {
    navigate(-1); // This will navigate to the previous page
  };

  return (
    <div className="p-4 max-w-3xl mx-auto ">
      {user ? (
        <>
          <h1 className="text-2xl font-bold text-gray-800 mb-6">User Profile</h1>

          {/* Close Button */}
          <button 
            onClick={handleClose} 
            className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full"
          >
            Close
          </button>

          {/* Profile Form */}
          <form onSubmit={handleSubmit} className="mb-6">
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={!isEditing}
                className="w-full border border-gray-300 rounded-md p-2 mt-2"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!isEditing}
                className="w-full border border-gray-300 rounded-md p-2 mt-2"
              />
            </div>
            <button
              type="submit"
              className={`${
                isEditing ? 'bg-blue-500' : ''
              } text-white px-4 py-2 mt-10 rounded-md`}
              disabled={!isEditing}
            >
              {isEditing ? 'Save Changes' : ''}
            </button>

            {!isEditing && (
              <button
                type="button"
                onClick={handleEditToggle}
                className="ml-4 bg-green-500 text-white px-4 py-2 rounded-md"
              >
                Edit Profile
              </button>
            )}
          </form>
          
          <UserBookings bookings={bookings} />
          
        </>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default UserProfile;
