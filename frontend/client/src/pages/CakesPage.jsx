import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
  FaShoppingCart, 
  FaStar, 
  FaHeart, 
  FaRegHeart,
  FaTrash,
  FaEdit,
  FaSearch,
  FaSpinner
} from 'react-icons/fa';
import { MdFilterList } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';
import './Cakes.css';
import Navbar from '../components/Navbar'; 
import { AuthContext } from '../context/AuthContext';
import Model from '../components/Model';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';

const CakesPage = () => {
  const [cakes, setCakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const { isOpen, setIsOpen, onClose, cart, setCart, cartLength, setCartLength, isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
      navigate("/");
    }
  }, [setIsOpen, navigate]);

  useEffect(() => {
    const fetchCakes = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND||"http://localhost:5000"}/cakes`);
        setCakes(response.data || []);
        setLoading(false);
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

  const flavors = [...new Set(cakes
    .map(cake => cake.flavor ? cake.flavor.toLowerCase() : '')
    .filter(flavor => flavor !== '')
  )];

  const addToCart = (cake) => {
  const cakeWithQuantity = { ...cake, quantity: 1 };

  const updatedCart = [...cart, cakeWithQuantity];
  setCart(updatedCart);
  setCartLength(updatedCart.length);

  // ✅ save properly to localStorage
  localStorage.setItem("cart", JSON.stringify(updatedCart));

  navigate("/cart");
};


  const showError = (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const showSuccess = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const confirmDelete = (cakeId) => {
    toast.info(
      <div>
        <p>Are you sure you want to delete this cake?</p>
        <div className="toast-actions">
          <button 
            className="toast-confirm-btn"
            onClick={() => {
              toast.dismiss();
              handleDelete(cakeId);
            }}
          >
            Yes, Delete
          </button>
          <button 
            className="toast-cancel-btn"
            onClick={() => toast.dismiss()}
          >
            Cancel
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeButton: false,
        draggable: false,
      }
    );
  };

  const handleDelete = async (cakeId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${import.meta.env.VITE_BACKEND||"http://localhost:5000"}/cakes/${cakeId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCakes(prev => prev.filter(c => c._id !== cakeId));
      showSuccess("Cake deleted successfully!");
    } catch (err) {
      showError("Failed to delete cake: " + err.message);
    }
  };

  if (loading) return (
    <motion.div 
      className="loading-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="spinner"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      >
        <FaSpinner size={50} />
      </motion.div>
      <p>Loading our delicious cakes...</p>
    </motion.div>
  );

  if (error) return (
    <motion.div 
      className="error-container"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
    >
      <h2>Oops!</h2>
      <p>We couldn't load the cakes: {error}</p>
      <motion.button 
        onClick={() => window.location.reload()} 
        className="retry-btn"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Try Again
      </motion.button>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Navbar />
      <ToastContainer />
      <div className="cakes-page">
        <motion.div 
          className="hero-section"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1>Our Delicious Cakes</h1>
          <p>Handcrafted with love and the finest ingredients</p>
        </motion.div>
        
        <motion.div 
          className="controls"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search cakes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="filter-container">
            <MdFilterList className="filter-icon" />
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
        </motion.div>
        
        <AnimatePresence>
          {filteredCakes.length === 0 ? (
            <motion.div 
              className="no-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h3>No cakes found matching your criteria</h3>
              <motion.button 
                onClick={() => {
                  setSearchTerm('');
                  setFilter('all');
                }}
                className="reset-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Reset Filters
              </motion.button>
            </motion.div>
          ) : (
            <div className="cakes-grid">
              <AnimatePresence>
                {filteredCakes.map((cake) => (
                  <motion.div 
                    key={cake._id}
                    className="cake-card"
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="image-container">
                      <motion.img 
                        alt={cake.image || 'Cake image'} 
                        src={`${import.meta.env.VITE_BACKEND||"http://localhost:5000"}/images/${cake.image}`}
                        className="cake-image"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/default-cake.jpg';
                        }}
                      />
                      <motion.button 
                        className="favorite-btn"
                        onClick={() => toggleFavorite(cake._id)}
                        aria-label={favorites.has(cake._id) ? "Remove from favorites" : "Add to favorites"}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {favorites.has(cake._id) ? 
                          <FaHeart className="favorite-icon" /> : 
                          <FaRegHeart className="favorite-icon" />
                        }
                      </motion.button>
                      {cake.isNew && (
                        <motion.div 
                          className="new-badge"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 500 }}
                        >
                          New!
                        </motion.div>
                      )}
                    </div>
                    <div className="cake-details">
                      <div className="cake-header">
                        <h3>{cake.name || 'Unnamed Cake'}</h3>
                        <div className="rating">
                          <FaStar className="star-icon" />
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
                      <motion.button 
                        onClick={() => addToCart(cake)} 
                        className="add-to-cart-btn"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <FaShoppingCart className="cart-icon" /> Add to Cart
                      </motion.button>
                      {isAdmin && (
                        <div className="admin-actions">
                          <motion.button
                            className="edit-btn"
                            onClick={() => navigate(`/edit-cake/${cake._id}`)}
                            title="Edit cake"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <FaEdit className="action-icon" />
                          </motion.button>
                          <motion.button
                            className="delete-btn"
                            onClick={() => confirmDelete(cake._id)}
                            title="Delete cake"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <FaTrash className="action-icon" />
                          </motion.button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </AnimatePresence>
      </div>
      {isOpen && (
        <Model>
          <AuthForm onClose={onClose}/>
        </Model>
      )}
    </motion.div>
  );
};

export default CakesPage;