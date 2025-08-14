import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation , useNavigate } from 'react-router-dom';
import "./Navbar.css";
import Model from './Model';
import AuthForm from "./AuthForm";
import { AuthContext } from '../context/AuthContext';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { GiCroissant } from 'react-icons/gi';

const Navbar = () => {
    const { isOpen, setIsOpen,onClose, setOnClose,cartLength, setCartLength,setIsLoggedIn,isLoggedIn} = useContext(AuthContext);
    const [activeLink, setActiveLink] = useState("/");
    const location = useLocation();
    const navigate=useNavigate();
    useEffect(() => {
        // Update active link when route changes
        setActiveLink(location.pathname);
    }, [location]);

    useEffect(() => {
        // Check if user is logged in based on token presence
        const token = localStorage.getItem("token");   
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    })
    const handleAuthClick = () => {
        setIsOpen(true);
    };
    
    const handleLogout = () => {
        localStorage.removeItem("token"); 
        navigate("/");
    }

    // Helper function to check if link is active
    const isActive = (path) => {
        return activeLink === path
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg bakery-navbar">
                <div className="container">
                    <Link className="navbar-brand" to="/" onClick={() => setActiveLink("/")}>
                        <GiCroissant className="logo-icon" />
                        Sweet Delights Bakery
                    </Link>
                    
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    
                    <div className="collapse navbar-collapse" id="navbarContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link 
                                    className={`nav-link ${isActive("/") ? "active" : ""}`} 
                                    to="/"
                                    onClick={() => setActiveLink("/")}
                                >
                                    Home
                                </Link>
                            </li>
                            
                            <li className="nav-item">
                                <Link 
                            className={`nav-link ${isActive("/menu") ? "active" : ""}`}
                                to="/menu"
                                onClick={() => setActiveLink("/menu")}
                                    >
                                Our Menu
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link 
                                    className={`nav-link ${isActive("/about") ? "active" : ""}`} 
                                    to="/about"
                                    onClick={() => setActiveLink("/about")}
                                >
                                    About Us
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link 
                                    className={`nav-link ${isActive("/contact") ? "active" : ""}`} 
                                    to="/contact"
                                    onClick={() => setActiveLink("/contact")}
                                >
                                    Contact
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link 
                                    className={`nav-link ${isActive("/order") ? "active" : ""}`} 
                                    to="/order"
                                    onClick={() => setActiveLink("/order")}
                                >
                                    Order Online
                                </Link>
                            </li>
                        </ul>
                        
                        {/* Rest of your navbar code remains the same */}
                        <div className="d-flex align-items-center">
                            
                            <Link to="/cart" className="nav-icon me-3">
                                <FaShoppingCart />
                                <span className="cart-count">{isLoggedIn?cartLength:"0"}</span>
                            </Link>
                                {isLoggedIn?(
                                 <button onClick={handleLogout} className="auth-btn">
                                    <FaUser className="me-2" />
                                  Logout
                                </button>
                                ):
                                 <button onClick={handleAuthClick} className="auth-btn">
                                    <FaUser className="me-2" />
                                  Login / Register
                                </button>
                                }               
                        </div>
                    </div>
                </div>
            </nav>
            {isOpen && (
                <Model>
                    <AuthForm onClose={onClose}/>
                </Model>
            )}
        </>
    );
};

export default Navbar;