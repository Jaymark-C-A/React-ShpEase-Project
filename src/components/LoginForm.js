import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Login.css'; // Import CSS for styling

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://shopease.programmingwizards.tech/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Login successful
        console.log('Login successful:', data);
        localStorage.setItem('authToken', data.token);
        navigate('/product-catalog');
      } else {
        // Login failed
        console.error('Login failed:', data);
        setErrorMessage(data.message || 'Failed to log in. Check your credentials.');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setErrorMessage('An unexpected error occurred. Please try again later.');
    }
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div className="login-container">
      <h2 className="login-heading">Login</h2>
      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <button type="submit" className="btn-login">Login</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <button onClick={handleRegister} className="btn-register">Register</button>
    </div>
  );
};

export default UserLogin;
