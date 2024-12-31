import React,{useState} from 'react'
import api from '../api/axiosConfig';

function ReviewForm() {
    const [rating, setRating] = useState(1);
    const [reviewText, setReviewText] = useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const reviewData = { vehicleId, userId, rating, reviewText };
  
      await api.post('/reviews', reviewData);
      setRating(1);
      setReviewText('');
    };
  return (
    <div><form onSubmit={handleSubmit}>
    <div>
      <label>Rating (1-5)</label>
      <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} min="1" max="5" />
    </div>
    <div>
      <label>Review</label>
      <textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)} />
    </div>
    <button type="submit">Submit Review</button>
  </form></div>
  )
}

export default ReviewForm