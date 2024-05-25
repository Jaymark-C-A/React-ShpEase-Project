import React, { useState } from 'react';
import axios from 'axios';

const ReviewForm = ({ productId, onReviewSubmit }) => {
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Submit review
    axios.post('api/reviews', { productId, rating, comment })
      .then(response => {
        onReviewSubmit(response.data);
        setRating('');
        setComment('');
      })
      .catch(error => {
        console.error('Error submitting review:', error);
      });
  };

  return (
    <div>
      <h2>Write a Review</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Rating:</label>
          <input type="number" min="1" max="5" value={rating} onChange={(e) => setRating(e.target.value)} required />
        </div>
        <div>
          <label>Comment:</label>
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} required />
        </div>
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default ReviewForm;
