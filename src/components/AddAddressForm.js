import React, { useState } from 'react';

const AddAddressForm = ({ onSuccess }) => {
  const [label, setLabel] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [barangayId, setBarangayId] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleAddAddress = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('authToken');
    if (!token) {
      setError('No token found. Please log in again.');
      return;
    }

    try {
      const bodyData = {
        label,
        address1,
        address2,
        barangay_id: barangayId,
        phone_number: phoneNumber,
      };

      console.log('Sending request with body:', bodyData);

      const response = await fetch('https://shopease.programmingwizards.tech/api/v1/users/addresses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(bodyData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(`Successfully saved new address, "${label}"`);
        onSuccess();
      } else {
        console.error('Failed to save new address:', data);
        setError(data.message || 'Failed to save new address.');
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
      setError('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <form onSubmit={handleAddAddress}>
      <h3>Add New Address</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <div>
        <label>
          Label:
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Address1:
          <input
            type="text"
            value={address1}
            onChange={(e) => setAddress1(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Address2:
          <input
            type="text"
            value={address2}
            onChange={(e) => setAddress2(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Barangay ID:
          <input
            type="text"
            value={barangayId}
            onChange={(e) => setBarangayId(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Phone Number:
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </label>
      </div>
      <button type="submit">Add Address</button>
    </form>
  );
};

export default AddAddressForm;
