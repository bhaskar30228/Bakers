import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './EditCake.css';

const EditCake = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cake, setCake] = useState({
    name: '',
    price: 0,
    weight: 0,
    flavors: [],
    image: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCake = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND||"http://localhost:5000"}/cakes/${id}`);
        setCake(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        showErrorToast('Failed to load cake data');
      }
    };
    fetchCake();
  }, [id]);

  const showSuccessToast = (message) => {
    toast.success(message, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const showErrorToast = (message) => {
    toast.error(message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCake(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'weight' ? Number(value) : value
    }));
  };

  const handleFlavorChange = (e, index) => {
    const newFlavors = [...cake.flavors];
    newFlavors[index] = e.target.value;
    setCake(prev => ({ ...prev, flavors: newFlavors }));
  };

  const addFlavor = () => {
    setCake(prev => ({ ...prev, flavors: [...prev.flavors, ''] }));
  };

  const removeFlavor = (index) => {
    const newFlavors = cake.flavors.filter((_, i) => i !== index);
    setCake(prev => ({ ...prev, flavors: newFlavors }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    
    if (!token) {
      showErrorToast('Please login to continue');
      navigate('/login');
      return;
    }

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND||"http://localhost:5000"}/cakes/${id}`, 
        cake,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      showSuccessToast('Cake updated successfully!');
      setTimeout(() => navigate('/menu'), 2000);
      
    } catch (err) {
      console.error('Update error:', err);
      
      if (err.response?.status === 401) {
        showErrorToast('Session expired. Please login again');
        localStorage.removeItem('token');
        setTimeout(() => navigate('/login'), 2000);
      } else if (err.response?.data?.message) {
        showErrorToast(err.response.data.message);
      } else {
        showErrorToast('Failed to update cake. Please try again.');
      }
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading cake details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error Loading Cake</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="retry-btn">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="edit-cake-container">
      <ToastContainer />
      <h2>Edit Cake</h2>
      <form onSubmit={handleSubmit} className="cake-form">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={cake.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Price (₹)</label>
          <input
            type="number"
            name="price"
            value={cake.price}
            onChange={handleChange}
            min="0"
            step="0.01"
            required
          />
        </div>

        <div className="form-group">
          <label>Weight (g)</label>
          <input
            type="number"
            name="weight"
            value={cake.weight}
            onChange={handleChange}
            min="0"
            required
          />
        </div>

        <div className="form-group">
          <label>Flavors</label>
          {cake.flavors.map((flavor, index) => (
            <div key={index} className="flavor-input-group">
              <input
                type="text"
                value={flavor}
                onChange={(e) => handleFlavorChange(e, index)}
                required
              />
              <button
                type="button"
                onClick={() => removeFlavor(index)}
                className="remove-flavor-btn"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addFlavor}
            className="add-flavor-btn"
          >
            Add Flavor
          </button>
        </div>

        <div className="form-group">
          <label>Current Image</label>
          {cake.image && (
            <img 
              src={`${import.meta.env.VITE_BACKEND||"http://localhost:5000"}/images/${cake.image}`} 
              alt={cake.name} 
              className="current-image"
            />
          )}
          <p>Note: To change the image, delete and recreate the cake</p>
        </div>

        <div className="form-actions">
          <button type="submit" className="save-btn">Save Changes</button>
          <button 
            type="button" 
            onClick={() => navigate('/cakes')}
            className="cancel-btn"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCake;