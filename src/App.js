import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import ProductCatalog from './components/ProductCatalog';
import ProductDetails from './components/ProductDetails';
import ShoppingCart from './components/ShoppingCart';
import NewOrder from './components/NewOrder';
import DisplayOrders from './components/DisplayOrders';
import ReviewForm from './components/ReviewForm';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Logout from './components/Logout';
import UserProfile from './components/UserProfile';
import AddAddressForm from './components/AddAddressForm';
import AddItemToCart from './components/AddItemToCart'
import EditAddressForm from './components/EditAddressForm';
import Home from './components/Home';
import './style/Navigation.css';

const API_URL = 'https://shopease.programmingwizards.tech/api/v1';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      axios.get(`${API_URL}/user`, { headers: { Authorization: `Bearer ${storedToken}` } })
        .then(response => {
          setUser(response.data);
          setToken(storedToken);
          setIsLoggedIn(true);
        })
        .catch(error => console.error('Error fetching user:', error));
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchCartData(token);
    }
  }, [token]);

  const fetchCartData = (authToken) => {
    axios.get(`${API_URL}/users/carts`, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    })
      .then(response => {
        console.log('Cart data fetched successfully:', response.data);
        setCartItems(response.data.available_items);
        calculateTotal(response.data.available_items);
      })
      .catch(error => console.error('Error fetching cart data:', error));
  };

  const calculateTotal = (items) => {
    const total = items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
    setTotalAmount(total);
  };

  const handleLogin = (userData) => {
    axios.post(`${API_URL}/login`, userData)
      .then(response => {
        const authToken = response.data.token;
        localStorage.setItem('token', authToken);
        setUser(response.data.user);
        setToken(authToken);
        setIsLoggedIn(true);
      })
      .catch(error => console.error('Error logging in:', error));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setToken('');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/product-catalog" element={<ProductCatalog />} />
          <Route path="/product/:slug" element={<ProductDetails />} />
          <Route
            path="/cart"
            element={<ShoppingCart token={token} cartItems={cartItems} />}
          />
          <Route
            path="/orders"
            element={<DisplayOrders token={token} />}
          />
          <Route
            path="/new-order"
            element={<NewOrder token={token} cartItems={cartItems} totalAmount={totalAmount} />}
          />
          <Route path="/review/:id" element={<ReviewForm />} />
          <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/" element={<Home isLoggedIn={isLoggedIn} handleLogout={handleLogout} />} />
          <Route path="/logout" element={<Logout onLogout={handleLogout} />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/address-form" element={<AddAddressForm />} />
          <Route path="/add-item" element={<AddItemToCart />} />
          <Route path="/edit-address-form" element={<EditAddressForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
