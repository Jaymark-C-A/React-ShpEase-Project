import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory

const Logout = ({ authToken }) => {
  const navigate = useNavigate(); // Replace useHistory with useNavigate

  const handleLogout = () => {
    axios.post('https://turistahanan.programmingwizards.tech/api/v1/user/logout', null, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    })
    .then(response => {
      console.log(response.data.message);
      // Clear user data and navigate to the login page
      navigate('/');
    })
    .catch(error => {
      console.error('Error logging out:', error);
      // Navigate to the login page even if there's an error
      navigate('/product-catalog');
    });
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;
