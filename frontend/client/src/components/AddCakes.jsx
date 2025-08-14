import React, { useState } from 'react';
import './AddCakes.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddCakes = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [cakesData, setCakesData] = useState({
    name: '',
    price: '',
    weight: '',
    image: null,
    flavors: [] // Initialize flavors array
  });

  const flavorOptions = ['Chocolate', 'Vanilla', 'Strawberry', 'Lemon', 'Carrot', 'Coffee','Apple', 'Pineapple',"Fruits mix"];

const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
        const formData = new FormData();
        formData.append("name", cakesData.name);
        formData.append("price", cakesData.price);
        formData.append("weight", cakesData.weight);
        if (cakesData.image) {
            formData.append("image", cakesData.image);
        }
        cakesData.flavors.forEach(flavor => {
            formData.append("flavors", flavor);
        });
        const response = await axios.post("https://bakers-1.onrender.com/cakes", formData, {
        });
        console.log("Server response:", response.data); // Debug C
        setSuccessMessage('Cake added successfully!');
        setTimeout(() => navigate("/"), 1000);
    } catch (err) {
        console.error("Upload failed", err); // Debug D
        setErrorMessage(err.response?.data?.message || "Failed to add cake");
    } finally {
        setIsSubmitting(false);
    }
};

const handleInputChange = (e) => {
  const { name, value, type, checked, files } = e.target;
  let val;
  
  if (name === "image") {
    val = files[0];
  } else if (name === "weight" || name === "price") {
    // Only convert to number if value is not empty
    val = value === '' ? '' : Number(value);
  } else if (type === "checkbox" && name === "flavors") {
    setCakesData(prev => {
      const newFlavors = checked
        ? [...prev.flavors, value]
        : prev.flavors.filter(f => f !== value);
      return { ...prev, flavors: newFlavors };
    });
    return;
  } else {
    val = value;
  }

  setCakesData(prev => ({
    ...prev,
    [name]: val
  }));
};

  return (
    <div className="add-cake-container">
      <h2>Add New Cake</h2>
      <form onSubmit={handleSubmit} className="cake-form" encType="multipart/form-data">
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}

        <div className="form-group">
          <label htmlFor="name">Cake Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={cakesData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="weight">Weight (kg):</label>
          <input
            type="number"
            id="weight"
            name="weight"
            value={cakesData.weight}
            onChange={handleInputChange}
            min="0"
            step="1"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price ($):</label>
          <input
            type="number"
            id="price"
            name="price"
            value={cakesData.price}
            onChange={handleInputChange}
            min="0"
            step="100"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Cake Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleInputChange}
            accept="image/*"
            required
          />
        </div>

        <div className="form-group">
          <label>Flavors:</label>
          <div className="flavor-options">
            {flavorOptions.map(flavor => (
              <div key={flavor} className="flavor-checkbox">
                <input
                  type="checkbox"
                  name="flavors"
                  id={`flavor-${flavor}`}
                  value={flavor}
                  checked={cakesData.flavors.includes(flavor)}
                  onChange={handleInputChange}
                />
                <label for={`flavor-${flavor}`}>{flavor}</label>
              </div>
            ))}
          </div>
        </div>

        <button type="submit" disabled={isSubmitting} className="submit-button">
          {isSubmitting ? 'Adding...' : 'Add Cake'}
        </button>
      </form>
    </div>
  );
};

export default AddCakes;
