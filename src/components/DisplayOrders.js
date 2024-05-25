import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import axios from 'axios';
import '../style/ProductCatalog.css'; // Import CSS file for styling


const DisplayOrders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (token) {
      fetchOrders(token);
    }
  }, [token]);

  const fetchOrders = (authToken) => {
    axios.get('https://shopease.programmingwizards.tech/api/v1/users/orders', {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    })
      .then(response => {
        console.log('Orders fetched successfully:', response.data);
        setOrders(response.data);
      })
      .catch(error => console.error('Error fetching orders:', error));
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
      <h2>All Orders</h2>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            <p>Order ID: {order.id}</p>
            <p>Date Ordered: {order.date_ordered}</p>
            <p>Status: {order.status}</p>
            <h3>Order Items:</h3>
            <ul>
              {order.items.map(item => (
                <li key={item.id}>
                  <p>Product ID: {item.product_id}</p>
                  <p>Price: ${item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DisplayOrders;
