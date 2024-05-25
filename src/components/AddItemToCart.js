import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import axios from 'axios';
import '../style/ProductDetails.css'; // Import CSS file for styling


const AddItemToCart = ({ token }) => {
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState(1);

  const [cart, setCart] = useState([]);

  const setToken = (token) => {
    // Set token logic here
  };

  const fetchCartData = (token) => {
    // Fetch cart data logic here
  };

  const addItem = () => {
    axios.post('https://shopease.programmingwizards.tech/api/v1/users/carts/items', {
      product_id: productId,
      quantity: quantity
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        console.log('Successfully added item to cart:', response.data);
      })
      .catch(error => console.error('Error adding item to cart:', error));
  };

  useEffect(() => {
    // Call the login or signup API to get the token
    axios.post('https://shopease.programmingwizards.tech/api/v1/login', { username: 'yourUsername', password: 'yourPassword' })
      .then(response => {
        const authToken = response.data.token;
        setToken(authToken);
  
        // Fetch cart data using the obtained token
        fetchCartData(authToken);
      })
      .catch(error => console.error('Error logging in:', error));
  }, [fetchCartData]); // Include fetchCartData in the dependency array
  

  return (
    <div className="product-catalog-container">
        <nav className="navbar">
        <ul className="navbar-list">
          <li className="navbar-item"><Link to="/product-catalog" className="navbar-link">Catalog</Link></li>
          <li className="navbar-item"><Link to="/new-order" className="navbar-link">New Orders</Link></li>
          <li className="navbar-item"><Link to="/add-item" className="navbar-link">Add To Cart</Link></li>
          <li className="navbar-item"><Link to="/cart" className="navbar-link">Shopping Cart</Link></li>
          <li className="navbar-item"><Link to="/orders" className="navbar-link">Order History</Link></li>
            <div className='nav'> 
              <li className="navbar-item"><Link to="/profile" className="navbar-link">Profile</Link></li>
              <li className="navbar-item"><button className="logout-button"><Link to="/logout" className="navbar-link">Logout</Link></button></li>
            </div>
        </ul>
      </nav>
      <h2>Add Item to Cart</h2>
      <input
        type="text"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
        placeholder="Product ID"
      />
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        min="1"
      />
      <button onClick={addItem}>Add to Cart</button>
    </div>
  );
};

export default AddItemToCart;
