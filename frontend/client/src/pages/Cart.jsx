import React, { useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import './cart.css';
import { useNavigate } from 'react-router-dom';
import Model from '../components/Model';
import AuthForm from '../components/AuthForm';
const Cart = () => {
    
    const { setCart, cart,token,isOpen,setIsOpen} = useContext(AuthContext);
    const navigate = useNavigate();
    // Remove item from cart
    const removeItem = (index) => {
        const newCart = [...cart];
        newCart.splice(index, 1);
        console.log((cart[0].q));
        
        setCart(newCart);
    };
    const shopNow = () => {
        navigate('/menu');
    }

    // Update quantity
    const updateQuantity = (index, newQuantity) => {
        
        
        console.log(`Updating quantity for item at index ${index} to ${newQuantity}`);
        if (newQuantity < 1) return;
        const newCart = [...cart];
        newCart[index].quantity = newQuantity;
        setCart(newCart);
    };

    // Calculate total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    useEffect(()=>{
        if(token){
           setIsOpen(false);
        }else{
            setIsOpen(true);
            navigate("/");
        }
    })
    return (
        <>
        
        <div className="cart-container">
            <h1 className="cart-title">Your Shopping Cart</h1>
            
            {cart.length > 0 ? (
                <div className="cart-content">
                    <div className="cart-items">
                        {cart.map((item, index) => (
                            <div key={index} className="cart-item">
                                <div className="item-image">
                                    <img 
                                        src={`https://bakers-ujm5.onrender.com/images/${item.image}`}
                                        alt={item.name}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = '/default-product.png';
                                        }}
                                        />
                                </div>
                                <div className="item-details">
                                    <h3 className="item-name">{item.name}</h3>
                                    <p className="item-price">${item.price.toFixed(2)}</p>
                                    <div className="quantity-controls">
                                        <button 
                                            onClick={() => updateQuantity(index, item.quantity - 1)}
                                            disabled={item.quantity <= 1}
                                            >
                                            -
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(index, item.quantity + 1)}>
                                            +
                                        </button>
                                    </div>
                                </div>
                                <button 
                                    className="remove-btn"
                                    onClick={() => removeItem(index)}
                                    >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary">
                        <h2>Order Summary</h2>
                        <div className="summary-row">
                            <span>Subtotal:</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <div className="summary-row">
                            <span>Shipping:</span>
                            <span>$5.99</span>
                        </div>
                        <div className="summary-row total">
                            <span>Total:</span>
                            <span>${(total + 5.99).toFixed(2)}</span>
                        </div>
                        <button className="checkout-btn">Proceed to Checkout</button>
                    </div>
                </div>
            ) : (
                <div className="empty-cart">
                    <h2>Your cart is empty</h2>
                    <p>Looks like you haven't added anything to your cart yet</p>
                    <button className="continue-shopping-btn" onClick={shopNow}>Continue Shopping</button>
                </div>
            )}
        </div>
        {isOpen && (
            <Model>
                <AuthForm/>
            </Model>
        )}
            </>
    );
};

export default Cart;