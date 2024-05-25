import React, { useState, useEffect } from 'react';
import AddAddressForm from './AddAddressForm';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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

    fetchUserProfile();
  }, []);

  const handleAddAddressSuccess = () => {
    // Fetch user profile again to update addresses
    fetchUserProfile();
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <h3>Addresses:</h3>
      <ul>
        {user.addresses.map((address) => (
          <li key={address.id}>
            {address.label}: {address.address1}, {address.address2 ? `${address.address2}, ` : ''}{address.phone_number}
          </li>
        ))}
      </ul>
      <AddAddressForm onSuccess={handleAddAddressSuccess} />
    </div>
  );
};

export default UserProfile;
