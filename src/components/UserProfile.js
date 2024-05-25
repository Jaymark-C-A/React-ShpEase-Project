import React, { useState, useEffect } from 'react';
import AddAddressForm from './AddAddressForm';
import EditAddressForm from './EditAddressForm'; // Import EditAddressForm component
import { Link } from 'react-router-dom'; // Import Link from react-router-dom


const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserProfile = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      setError('No token found. Please log in again.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('https://shopease.programmingwizards.tech/api/v1/user', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data);
      } else {
        setError(data.message || 'Failed to fetch user profile.');
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleAddAddressSuccess = () => {
    // Fetch user profile again to update addresses
    fetchUserProfile();
  };

  const handleEditAddressSuccess = (updatedAddress) => {
    // Update the user's addresses with the updated address
    setUser(prevUser => ({
      ...prevUser,
      addresses: prevUser.addresses.map(address => 
        address.id === updatedAddress.id ? updatedAddress : address
      )
    }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

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
      <h2>User Profile</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <h3>Addresses:</h3>
      <ul>
        {user.addresses.map((address) => (
          <li key={address.id}>
            {address.label}: {address.address1}, {address.address2 ? `${address.address2}, ` : ''}{address.phone_number}
            <EditAddressForm
              addressId={address.id}
              initialData={address}
              onUpdateSuccess={handleEditAddressSuccess}
            />
          </li>
        ))}
      </ul>
      <AddAddressForm onSuccess={handleAddAddressSuccess} />
    </div>
  );
};

export default UserProfile;
