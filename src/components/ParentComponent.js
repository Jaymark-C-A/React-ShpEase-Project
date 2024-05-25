// ParentComponent.js

import React, { useState } from 'react';
import ProductCatalog from './ProductCatalog';

const ParentComponent = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Example: Assume the user is logged in initially

  // Function to handle logout
  const handleLogout = () => {
    // Perform any logout logic here, e.g., clearing local storage, resetting state, etc.
    setIsLoggedIn(false); // Set isLoggedIn to false to simulate logout
  };

  return (
    <div>
      {/* Pass isLoggedIn and handleLogout as props to ProductCatalog */}
      <ProductCatalog isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
    </div>
  );
};

export default ParentComponent;
