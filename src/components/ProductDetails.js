import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import addItemToCart from './AddItemToCart'; // Import the addItemToCart function
import '../style/ProductDetails.css'; // Import CSS file for styling

const ProductDetails = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`https://shopease.programmingwizards.tech/api/v1/products/${slug}`)
      .then(response => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching product details. Please try again later.');
        setLoading(false);
      });
  }, [slug]);

  const handleAddToCart = () => {
    if (product) {
      addItemToCart(product.id, 1, localStorage.getItem('token')); // Assuming 1 quantity for now
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>Product not found.</div>;

  return (
    <div className="product-details-container">
      <h2 className="product-details-title">Product Details</h2>
      <div className="product-details-content">
        <div className="product-details-info">
          <p className="product-details-label">Name:</p>
          <p className="product-details-value">{product.name}</p>
          <p className="product-details-label">Description:</p>
          <p className="product-details-value">{product.description}</p>
          <p className="product-details-label">Price:</p>
          <p className="product-details-value">${product.price}</p>
          <p className="product-details-label">Category:</p>
          <p className="product-details-value">{product.category.name}</p>
          <p className="product-details-label">Stock:</p>
          <p className="product-details-value">{product.stock}</p>
          <button onClick={handleAddToCart}>Add to Cart</button> {/* Button to add the product to the cart */}
        </div>
        <div className="product-details-images">
          <p className="product-details-label">Images:</p>
          <div className="product-images-container">
            {product.images.map((image, index) => (
              <img key={index} src={image.url} alt={`Product ${index + 1}`} className="product-image" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
