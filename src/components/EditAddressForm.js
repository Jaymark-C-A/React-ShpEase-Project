import React, { useState } from 'react';
import axios from 'axios';

const EditAddressForm = ({ addressId, initialData, onUpdateSuccess }) => {
  const [formData, setFormData] = useState(initialData || {});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`https://shopease.programmingwizards.tech/api/v1/users/addresses/${addressId}`, formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      const updatedAddress = response.data.address;
      onUpdateSuccess(updatedAddress);
    } catch (error) {
      console.error('Error updating address:', error);
      // Handle error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="address1">Address 1:</label>
        <input type="text" id="address1" name="address1" value={formData.address1 || ''} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="address2">Address 2:</label>
        <input type="text" id="address2" name="address2" value={formData.address2 || ''} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="barangay_id">Barangay ID:</label>
        <input type="text" id="barangay_id" name="barangay_id" value={formData.barangay_id || ''} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="phone_number">Phone Number:</label>
        <input type="text" id="phone_number" name="phone_number" value={formData.phone_number || ''} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="label">Label:</label>
        <input type="text" id="label" name="label" value={formData.label || ''} onChange={handleChange} />
      </div>
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditAddressForm;
