import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductReviews = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');

  useEffect(() => {
    // Fetch reviews for the specified product ID
    axios.get(`api/reviews/product/${productId}`)
      .then(response => {
        setReviews(response.data);
      })
      .catch(error => {
        console.error('Error fetching product reviews:', error);
      });
  }, [productId]);

  const handleReviewSubmit = () => {
    // Post new review for the product
    axios.post('api/reviews', { productId, review: newReview })
      .then(response => {
        // Refresh reviews after posting
        setNewReview('');
        setReviews([...reviews, response.data]);
      })
      .catch(error => {
        console.error('Error posting product review:', error);
      });
  };

  return (
    <div>
      <h2>Product Reviews</h2>
      <ul>
        {reviews.map(review => (
          <li key={review.id}>
            <div>User: {review.user}</div>
            <div>Rating: {review.rating}</div>
            <div>Review: {review.comment}</div>
          </li>
        ))}
      </ul>
      <textarea
        value={newReview}
        onChange={e => setNewReview(e.target.value)}
        placeholder="Write a review..."
      />
      <button onClick={handleReviewSubmit}>Submit Review</button>
    </div>
  );
};

export default ProductReviews;
