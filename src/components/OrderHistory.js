import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import axios from 'axios';
import '../style/ProductCatalog.css'; // Import CSS file for styling


const OrderHistory = ({ userId, token }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (userId && token) {
      axios.get(`https://shopease.programmingwizards.tech/api/v1/orders/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => {
          setOrders(response.data);
        })
        .catch(error => {
          console.error('Error fetching order history:', error);
        });
    }
  }, [userId, token]);

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
      <h2>Order History</h2>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            <div>Order ID: {order.id}</div>
            <div>Order Date: {order.date}</div>
            {/* Additional order details */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderHistory;
