import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import axios from 'axios';
import '../style/ProductDetails.css'; // Import CSS file for styling


const API_URL = 'https://shopease.programmingwizards.tech/api/v1';

const ShoppingCart = ({ token, setToken }) => { // Assuming setToken is passed as a prop
  const [cart, setCart] = useState({ available_items: [], unavailable_items: [] });
  const [editingItemId, setEditingItemId] = useState(null);
  const [newQuantity, setNewQuantity] = useState(1);

  const fetchCartData = (authToken) => {
    axios.get(`${API_URL}/users/carts`, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    })
      .then(response => {
        console.log('Cart data fetched successfully:', response.data);
        setCart(response.data);
      })
      .catch(error => console.error('Error fetching cart data:', error));
  };

  useEffect(() => {
    if (token) {
      fetchCartData(token);
    }
  }, [token]); // Include token in the dependency array

  const removeFromCart = (itemId) => {
    axios.delete(`${API_URL}/users/carts/items/${itemId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        console.log('Item removed from cart successfully:', response.data);
        setCart({
          ...cart,
          available_items: cart.available_items.filter(item => item.id !== itemId)
        });
      })
      .catch(error => console.error('Error removing item from cart:', error));
  };

  const updateCartItem = (itemId) => {
    axios.put(`${API_URL}/users/carts/items/${itemId}`, null, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        quantity: newQuantity
      }
    })
      .then(response => {
        console.log('Successfully updated cart item:', response.data);
        setCart({
          ...cart,
          available_items: cart.available_items.map(item => item.id === itemId ? { ...item, quantity: newQuantity } : item)
        });
        setEditingItemId(null);
      })
      .catch(error => console.error('Error updating cart item:', error));
  };

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
      <h2>Shopping Cart</h2>
      {cart.available_items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cart.available_items.map(item => (
            <li key={item.id}>
              <p>{item.product.name} - ${item.product.price}</p>
              {editingItemId === item.id ? (
                <>
                  <input
                    type="number"
                    value={newQuantity}
                    onChange={(e) => setNewQuantity(e.target.value)}
                    min="1"
                  />
                  <button onClick={() => updateCartItem(item.id)}>Update</button>
                </>
              ) : (
                <>
                  <p>Quantity: {item.quantity}</p>
                  <button onClick={() => { setEditingItemId(item.id); setNewQuantity(item.quantity); }}>Edit</button>
                </>
              )}
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <h3>Unavailable Items</h3>
      {cart.unavailable_items.length === 0 ? (
        <p>No unavailable items</p>
      ) : (
        <ul>
          {cart.unavailable_items.map(item => (
            <li key={item.id}>
              <p>{item.product.name} - ${item.product.price}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Status: Unavailable</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ShoppingCart;
