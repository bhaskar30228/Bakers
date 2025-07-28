import React, { useState } from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaPinterest, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import './Footer.css'; // We'll create this CSS file next

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [activeLink, setActiveLink] = useState(null);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      // Here you would typically send the email to your backend
      console.log('Subscribed with:', email);
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const handleLinkHover = (link) => {
    setActiveLink(link);
  };

  const handleLinkLeave = () => {
    setActiveLink(null);
  };

  return (
    <footer className="bakery-footer">
      <div className="footer-container">
        {/* About Section */}
        <div className="footer-section">
          <h3 
            className={`section-title ${activeLink === 'about' ? 'active' : ''}`}
            onMouseEnter={() => handleLinkHover('about')}
            onMouseLeave={handleLinkLeave}
          >
            About Our Bakery
          </h3>
          <p>
            Freshly baked goods made with love since 2010. We use only the finest ingredients to create delicious treats that brighten your day.
          </p>
          <div className="social-icons">
            <a href="#" aria-label="Facebook"><FaFacebook /></a>
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" aria-label="Twitter"><FaTwitter /></a>
            <a href="#" aria-label="Pinterest"><FaPinterest /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3 
            className={`section-title ${activeLink === 'links' ? 'active' : ''}`}
            onMouseEnter={() => handleLinkHover('links')}
            onMouseLeave={handleLinkLeave}
          >
            Quick Links
          </h3>
          <ul className="footer-links">
            <li><a href="#">Home</a></li>
            <li><a href="#">Our Menu</a></li>
            <li><a href="#">Special Offers</a></li>
            <li><a href="#">Gallery</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h3 
            className={`section-title ${activeLink === 'contact' ? 'active' : ''}`}
            onMouseEnter={() => handleLinkHover('contact')}
            onMouseLeave={handleLinkLeave}
          >
            Contact Us
          </h3>
          <ul className="contact-info">
            <li><FaMapMarkerAlt /> 123 Baker Street, Flour City</li>
            <li><FaPhone /> (555) 123-4567</li>
            <li><MdEmail /> info@deliciousbakery.com</li>
          </ul>
          <div className="opening-hours">
            <h4>Opening Hours:</h4>
            <p>Mon-Fri: 7am - 7pm</p>
            <p>Sat-Sun: 8am - 5pm</p>
          </div>
        </div>

        {/* Newsletter */}
        <div className="footer-section newsletter">
          <h3 
            className={`section-title ${activeLink === 'newsletter' ? 'active' : ''}`}
            onMouseEnter={() => handleLinkHover('newsletter')}
            onMouseLeave={handleLinkLeave}
          >
            Newsletter
          </h3>
          <p>Subscribe to get updates on our special offers and new products!</p>
          <form onSubmit={handleSubscribe} className="newsletter-form">
            <div className="input-group">
              <FaEnvelope className="input-icon" />
              <input 
                type="email" 
                placeholder="Your email address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="subscribe-btn">
              {subscribed ? 'Thank You!' : 'Subscribe'}
            </button>
          </form>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Delicious Bakery. All Rights Reserved.</p>
        <div className="legal-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;