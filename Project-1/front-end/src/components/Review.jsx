import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { submitReview } from '../api/index';

const Review = () => {
  const { vehicleId } = useParams(); // Extract vehicleId from URL
  const navigate = useNavigate(); // For navigation
  const [rating, setRating] = useState(1);
  const [reviewText, setReviewText] = useState('');

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await submitReview(vehicleId, rating, reviewText, token);
      alert('Review submitted successfully');
      navigate('/vehiclelist'); // Redirect to vehicle list after successful review submission
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const handleClose = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 to-indigo-900 flex items-center justify-center">
      <div className="max-w-lg w-full p-8 border border-gray-700 bg-gray-800 rounded-lg shadow-lg relative">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-white text-2xl font-semibold hover:text-gray-400"
        >
          &times;
        </button>

        <h2 className="text-3xl font-bold text-center text-white mb-6">Leave a Review for Vehicle</h2>
        <h3 className="text-xl text-center text-gray-300 mb-4">Vehicle ID: {vehicleId}</h3>
        <form onSubmit={handleSubmitReview}>
          <div className="mb-4">
            <label className="block text-white mb-2" htmlFor="rating">
              Rating (1 to 5):
            </label>
            <input
              type="number"
              id="rating"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              required
              className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label className="block text-white mb-2" htmlFor="reviewText">
              Review:
            </label>
            <textarea
              id="reviewText"
              placeholder="Write your review"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              required
              className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default Review;
