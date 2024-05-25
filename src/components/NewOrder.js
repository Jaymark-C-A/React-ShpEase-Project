import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import axios from 'axios';
import '../style/ProductCatalog.css'; // Import CSS file for styling


const NewOrder = ({ token, cartItems, totalAmount }) => {
  const [orderStatus, setOrderStatus] = useState('');

  const handlePlaceOrder = () => {
    const orderItems = cartItems.map(item => ({
      product_id: item.product.id,
      quantity: item.quantity,
      price: item.product.price
    }));

    const orderData = {
      items: orderItems,
      total: totalAmount
    };

    axios.post('https://shopease.programmingwizards.tech/api/v1/users/orders', orderData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        console.log('Order placed successfully:', response.data);
        setOrderStatus('Order placed successfully!');
      })
      .catch(error => {
        console.error('Error placing order:', error);
        setOrderStatus('Error placing order. Please try again.');
      });
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
      <h2>New Order</h2>
      <button onClick={handlePlaceOrder}>Place Order</button>
      {orderStatus && <p>{orderStatus}</p>}
    </div>
  );
};

export default NewOrder;
