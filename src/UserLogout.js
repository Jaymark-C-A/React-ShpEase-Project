import React from 'react';
import axios from 'axios';

const UserLogout = () => {
  const logoutUser = () => {
    // Send logout request to the server
    axios.post('http://localhost:5000/api/logout')
      .then(response => {
        console.log('User logged out successfully:', response.data);
        // Redirect to home page or display a success message
      })
      .catch(error => console.error('Error logging out:', error));
  };

  return (
    <div>
      <button onClick={logoutUser}>Logout</button>
    </div>
  );
};

export default UserLogout;
