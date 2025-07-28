// src/pages/CakesPage.js
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { FaShoppingCart, FaStar, FaHeart, FaRegHeart } from 'react-icons/fa';
import './Cakes.css';
import Navbar from '../components/Navbar'; // Adjust the import path as necessary
import { AuthContext } from '../context/AuthContext';
import Model from '../components/Model';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm'; // Adjust the import path as necessary
const CakesPage = () => {
  const [cakes, setCakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const {isOpen, setIsOpen,onClose, setOnClose,cart,setCart,cartLength, setCartLength} = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
      if(localStorage.getItem("token")){
        setIsOpen(false)
      }else{
        setIsOpen(true)
        navigate("/")
      }
  })

  useEffect(() => {
    const fetchCakes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/cakes');
        setCakes(response.data || []); // Ensure we always have an array
        setLoading(false);
        console.log(response.data);
        
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchCakes();
  }, []);

  const toggleFavorite = (id) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

const filteredCakes = cakes.filter(cake => {
  const cakeName = (cake.name || '').toLowerCase();
  const cakeFlavor = Array.isArray(cake.flavors)
    ? cake.flavors.join(', ').toLowerCase()
    : (cake.flavors ? cake.flavors.toLowerCase() : '');

    const searchTermLower = searchTerm.toLowerCase();
    
    const matchesSearch = cakeName.includes(searchTermLower) || 
                         cakeFlavor.includes(searchTermLower);
    const matchesFilter = filter === 'all' || cakeFlavor === filter;
    return matchesSearch && matchesFilter;
  });

  // Get unique flavors with null check
  const flavors = [...new Set(cakes
    .map(cake => cake.flavor ? cake.flavor.toLowerCase() : '')
    .filter(flavor => flavor !== '')
  )];

  // Rest of the component remains the same...
  if (loading) return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Loading our delicious cakes...</p>
    </div>
  );

  if (error) return (
    <div className="error-container">
      <h2>Oops!</h2>
      <p>We couldn't load the cakes: {error}</p>
      <button onClick={() => window.location.reload()} className="retry-btn">
        Try Again
      </button>
    </div>
  );
  
 const addToCart = (cake) => {
  const cakeWithQuantity = { ...cake, quantity: 1 };
  setCart([...cart, cakeWithQuantity]);
  setCartLength(cartLength + 1);
  navigate("/cart");
}

  return (
    <>
      <Navbar />
    <div  className="cakes-page">
      <div className="hero-section">
        <h1>Our Delicious Cakes</h1>
        <p>Handcrafted with love and the finest ingredients</p>
      </div>
      
      <div className="controls">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search cakes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
            />
        </div>
        
        <div className="filter-container">
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="filter-select"
            >
            <option value="all">All Flavors</option>
            {flavors.map(flavor => (
              <option key={flavor} value={flavor}>
                {flavor.charAt(0).toUpperCase() + flavor.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {filteredCakes.length === 0 ? (
        <div className="no-results">
          <h3>No cakes found matching your criteria</h3>
          <button 
            onClick={() => {
              setSearchTerm('');
              setFilter('all');
            }}
            className="reset-btn"
            >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="cakes-grid">
          {filteredCakes.map((cake) => (
            <div  key={cake._id} className="cake-card">
              <div className="image-container">
                <img 
                 alt={cake.image || 'Cake image'} 
                 src={`http://localhost:5000/images/${cake.image}`}
                 className="cake-image"
                 onError={(e) => {
                   e.target.onerror = null;
                   e.target.src = '/default-cake.jpg';
                  }}
                  />
                <button 
                  className="favorite-btn"
                  onClick={() => toggleFavorite(cake._id)}
                  aria-label={favorites.has(cake._id) ? "Remove from favorites" : "Add to favorites"}
                  >
                  {favorites.has(cake._id) ? <FaHeart color="red" /> : <FaRegHeart />}
                </button>
                {cake.isNew && <div className="new-badge">New!</div>}
              </div>

              
              
              <div className="cake-details">
                <div className="cake-header">
                  <h3>{cake.name || 'Unnamed Cake'}</h3>
                  <div className="rating">
                    <FaStar color="#FFD700" />
                    <span>{cake.rating || '4.5'}</span>
                  </div>
                </div>
                
                <p className="flavor">
  Flavor: {
    cake.flavors && Array.isArray(cake.flavors)
      ? cake.flavors.join(', ')
      : (cake.flavors || 'Unknown')
  }
</p>

                <p className="weight">Weight: {cake.weight || 'N/A'}g</p>
                
                <div className="price-container">
                  <p className="price">₹{cake.price || '0'}</p>
                  {cake.originalPrice && (
                    <p className="original-price">₹{cake.originalPrice}</p>
                  )}
                </div>
                
                <button onClick={()=>addToCart(cake)}  className="add-to-cart-btn">
                  <FaShoppingCart /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
        {isOpen && (
                    <Model>
                        <AuthForm onClose={onClose}/>
                    </Model>
                )}
      </>
  );
};

export default CakesPage;