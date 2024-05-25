import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../style/ProductCatalog.css';

const Home = ({ isLoggedIn, handleLogout }) => {
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
          <li className="navbar-item"><Link to="/" className="navbar-link">Home</Link></li>
            <div className='nav'> 
              <li className="navbar-item"><Link to="/login" className="navbar-link">Login</Link></li>
              <li className="navbar-item"><Link to="/register" className="navbar-link">Register</Link></li>
            </div>
        </ul>
      </nav>
      <h2 style={{ margin: '20px 0', fontSize: '36px' }}>Welcome to our online shop!</h2>
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
                  <Link to={`/product/${product.slug}`} className="product-name">{product.name}</Link>
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
}

export default Home;
