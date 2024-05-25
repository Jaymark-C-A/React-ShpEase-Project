import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Login.css'; // Import CSS for styling

const UserRegistration = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://shopease.programmingwizards.tech/api/v1/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: username,
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Registration successful
        console.log('Registration successful:', data);
        localStorage.setItem('authToken', data.token);
        setSuccessMessage('Registration successful. Redirecting to login page...');
        setTimeout(() => {
          navigate('/login');
        }, 3000); // Redirect after 3 seconds
      } else {
        // Registration failed
        console.error('Registration failed:', data);
        setError(data.message || 'Registration failed. Please check the form for errors.');
        if (data.errors) {
          const errorMessages = [];
          if (data.errors.name) errorMessages.push(data.errors.name[0]);
          if (data.errors.email) errorMessages.push(data.errors.email[0]);
          if (data.errors.password) {
            errorMessages.push("Password requirements: " + data.errors.password.join(", "));
          }
          setError(errorMessages.join(' '));
        }
      }
    } catch (error) {
      console.error('Registration failed', error);
      setError('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-heading">Register</h2>
      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
      <form onSubmit={handleRegister} className="login-form">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoFocus
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
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
        <button type="submit" className="btn-login">Register</button>
      </form>
    </div>
  );
};

export default UserRegistration;
