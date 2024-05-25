import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders data from the server
    axios.get('http://localhost:5000/api/orders')
      .then(response => {
        console.log('Orders fetched successfully:', response.data);
        setOrders(response.data);
      })
      .catch(error => console.error('Error fetching orders:', error));
  }, []);

  return (
    <div>
      <h2>Orders</h2>
      <ul>
        {orders.map(order => (
          <li key={order.id}>{order.orderDetails}</li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;
