import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../style/ProductCatalog.css'; // Import CSS file for styling

const ProductCatalog = ({ isLoggedIn, handleLogout }) => { // Define isLoggedIn and handleLogout as props
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://shopease.programmingwizards.tech/api/v1/products')
      .then(response => {
        setProducts(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching products. Please try again later.');
        setLoading(false);
      });
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
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
          {!isLoggedIn && (
            <div className='nav'> 
              <li className="navbar-item"><Link to="/profile" className="navbar-link">Profile</Link></li>
              <li className="navbar-item"><button onClick={handleLogout} className="logout-button"><Link to="/logout" className="navbar-link">Logout</Link></button></li>
            </div>
          )}
        </ul>
      </nav>
      <h2>Product Catalog</h2>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-input"
      />
      <div className="product-grid">
        {products.map(product => {
          if (product.name.toLowerCase().includes(searchTerm.toLowerCase())) {
            return (
              <div key={product.id} className="product-card">
                <img src={product.images[0].url} alt={product.name} className="product-image" />
                <div className="product-info">
                  <Link to={`/product/${product.slug}`} className="product-name">{product.name}</Link> {/* Use Link component */}
                  <div className="product-price">${product.price}</div>
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default ProductCatalog;
