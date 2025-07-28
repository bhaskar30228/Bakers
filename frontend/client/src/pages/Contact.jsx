import React from 'react';
import './Contact.css';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import bakeryLocation from '../assets/bakery-location.png'; // Replace with your image
import Navbar from '../components/Navbar';
const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
    alert('Your message has been sent! We will contact you soon.');
  };

  return (
    <>
    <Navbar/>
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="hero-content">
          <h1>Get in Touch</h1>
          <p>We'd love to hear from you!</p>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="contact-info-section">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Card - Location */}
            <div className="contact-card">
              <div className="contact-icon">
                <FaMapMarkerAlt />
              </div>
              <h3>Our Location</h3>
              <p>123 Baker Street<br />Flour Town, FT 12345</p>
            </div>

            {/* Contact Card - Phone */}
            <div className="contact-card">
              <div className="contact-icon">
                <FaPhone />
              </div>
              <h3>Call Us</h3>
              <p>+1 (555) 123-4567<br />+1 (555) 765-4321</p>
            </div>

            {/* Contact Card - Email */}
            <div className="contact-card">
              <div className="contact-icon">
                <FaEnvelope />
              </div>
              <h3>Email Us</h3>
              <p>hello@sweetdelights.com<br />orders@sweetdelights.com</p>
            </div>

            {/* Contact Card - Hours */}
            <div className="contact-card">
              <div className="contact-icon">
                <FaClock />
              </div>
              <h3>Opening Hours</h3>
              <p>Monday-Friday: 7am-7pm<br />Saturday-Sunday: 8am-5pm</p>
            </div>
          </div>
        </div>
      </section>

      {/* Map and Form Section */}
      <section className="map-form-section">
        <div className="container">
          <div className="map-form-grid">
            {/* Map */}
            <div className="map-container">
              <img src={bakeryLocation} alt="Bakery Location" className="map-image" />
              <div className="map-overlay">
                <button className="directions-btn">Get Directions</button>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form-container">
              <h2>Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <input type="text" id="name" placeholder="Your Name" required />
                </div>
                <div className="form-group">
                  <input type="email" id="email" placeholder="Your Email" required />
                </div>
                <div className="form-group">
                  <input type="tel" id="phone" placeholder="Phone Number" />
                </div>
                <div className="form-group">
                  <select id="subject" required>
                    <option value="">Select a Subject</option>
                    <option value="order">Order Inquiry</option>
                    <option value="event">Special Events</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <textarea id="message" rows="5" placeholder="Your Message" required></textarea>
                </div>
                <button type="submit" className="submit-btn">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="social-section">
        <div className="container">
          <h2>Follow Us</h2>
          <p>Stay updated with our latest creations and special offers</p>
          <div className="social-icons">
            <a href="#" className="social-icon"><FaFacebook /></a>
            <a href="#" className="social-icon"><FaInstagram /></a>
            <a href="#" className="social-icon"><FaTwitter /></a>
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default Contact;