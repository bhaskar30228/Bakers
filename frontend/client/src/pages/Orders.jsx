import React, { useState } from 'react';
import './Orders.css';

const Order = ({ cakes }) => {
  const [cart, setCart] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    deliveryDate: '',
    specialInstructions: ''
  });
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const addToCart = (cake) => {
    setCart([...cart, { ...cake, quantity: 1 }]);
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(cart.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({ ...prev, [name]: value }));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => 
      total + (parseFloat(item.price) * item.quantity), 0
    ).toFixed(2);
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const orderData = {
        items: cart,
        customer: customerInfo,
        total: calculateTotal(),
        orderDate: new Date().toISOString()
      };
      
      console.log('Order submitted:', orderData); // Replace with actual API call
      setOrderSubmitted(true);
      setCart([]);
    } catch (error) {
      console.error('Order submission failed:', error);
      alert('There was an error processing your order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (orderSubmitted) {
    return (
      <div className="order-confirmation">
        <h2>Order Confirmed!</h2>
        <div className="confirmation-icon">🎂</div>
        <p>Thank you for your order!</p>
        <p>We've sent a confirmation to {customerInfo.email}</p>
        <button 
          onClick={() => setOrderSubmitted(false)}
          className="new-order-btn"
        >
          Place Another Order
        </button>
      </div>
    );
  }

  return (
    <div className="order-page">
      <h1>Order Delicious Cakes</h1>
      
      <div className="order-layout">
        <section className="cake-selection">
          <h2>Our Cakes</h2>
          <div className="cake-grid">
            {cakes.map(cake => (
              <div key={cake.id} className="cake-card">
                <div className="cake-image-container">
                  <img src={cake.image} alt={cake.name} />
                  {cake.isPopular && <span className="popular-badge">Popular</span>}
                </div>
                <div className="cake-details">
                  <h3>{cake.name}</h3>
                  <p className="cake-description">{cake.description}</p>
                  <div className="cake-meta">
                    <span className="cake-price">${cake.price}</span>
                    <span className="cake-flavors">{cake.flavors.join(', ')}</span>
                  </div>
                  <button 
                    onClick={() => addToCart(cake)}
                    className="add-to-cart-btn"
                  >
                    Add to Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="order-summary-section">
          <form onSubmit={handleSubmitOrder} className="order-form">
            <div className="cart-summary">
              <h2>Your Order</h2>
              {cart.length === 0 ? (
                <p className="empty-cart">Your cart is empty</p>
              ) : (
                <ul className="cart-items">
                  {cart.map(item => (
                    <li key={item.id} className="cart-item">
                      <div className="item-info">
                        <span className="item-name">{item.name}</span>
                        <span className="item-flavor">{item.flavors[0]}</span>
                      </div>
                      <div className="item-controls">
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                          className="quantity-input"
                        />
                        <span className="item-price">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="remove-item-btn"
                          aria-label="Remove item"
                        >
                          &times;
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              <div className="order-total">
                <span>Total:</span>
                <span>${calculateTotal()}</span>
              </div>
            </div>

            <div className="customer-info">
              <h2>Delivery Information</h2>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={customerInfo.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={customerInfo.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={customerInfo.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Delivery Address</label>
                <textarea
                  id="address"
                  name="address"
                  value={customerInfo.address}
                  onChange={handleInputChange}
                  required
                  rows="3"
                />
              </div>
              <div className="form-group">
                <label htmlFor="deliveryDate">Delivery Date</label>
                <input
                  type="date"
                  id="deliveryDate"
                  name="deliveryDate"
                  value={customerInfo.deliveryDate}
                  onChange={handleInputChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="specialInstructions">Special Instructions</label>
                <textarea
                  id="specialInstructions"
                  name="specialInstructions"
                  value={customerInfo.specialInstructions}
                  onChange={handleInputChange}
                  rows="2"
                  placeholder="Allergies, delivery notes, etc."
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={cart.length === 0 || isLoading}
              className="submit-order-btn"
            >
              {isLoading ? 'Processing...' : 'Place Order'}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Order;