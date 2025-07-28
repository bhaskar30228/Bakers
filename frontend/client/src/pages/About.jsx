import React from 'react';
import './About.css';
import { FaBreadSlice, FaAward, FaHeart, FaLeaf } from 'react-icons/fa';
import teamImage from '../assets/bakeryTeam.jpeg'; // Replace with your actual image path
import bakeryImage from '../assets/bakeryImage.jpeg'; // Replace with your actual image path
import Navbar from '../components/Navbar'
const About = () => {
  return (
    <>
    <Navbar/>
    <div className="about-us-container">
      
      {/* Our Story Section */}
      <section className="our-story">
        <div className="story-content">
          <h2>Welcome to Sweet Delights Bakery</h2>
          <p>
            Founded in a small kitchen with nothing but passion and a dream, Sweet Delights Bakery has grown into 
            your neighborhood's favorite artisanal bakery. What started as a weekend hobby quickly turned into 
            a lifelong commitment to creating delicious, handcrafted baked goods.
          </p>
          <div className="story-image">
            <img src={bakeryImage} alt="Our bakery interior" />
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="our-values">
        <h2>Our Baking Philosophy</h2>
        <div className="values-grid">
          <div className="value-card">
            <FaBreadSlice className="value-icon" />
            <h3>Traditional Recipes</h3>
            <p>We preserve time-honored baking techniques passed down through generations.</p>
          </div>
          <div className="value-card">
            <FaLeaf className="value-icon" />
            <h3>Quality Ingredients</h3>
            <p>Only the finest locally-sourced, organic ingredients make it into our ovens.</p>
          </div>
          <div className="value-card">
            <FaHeart className="value-icon" />
            <h3>Made with Love</h3>
            <p>Every product is crafted with care and attention to detail.</p>
          </div>
          <div className="value-card">
            <FaAward className="value-icon" />
            <h3>Award Winning</h3>
            <p>Recognized for excellence in artisanal baking three years running.</p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="our-team">
        <h2>Meet Our Bakers</h2>
        <div className="team-content">
          <div className="team-image">
            <img src={teamImage} alt="Our baking team" />
          </div>
          <div className="team-description">
            <p>
              Our team of master bakers brings together decades of experience from around the world. 
              Each member shares a passion for creating unforgettable flavors and textures that keep 
              our customers coming back for more.
            </p>
            <p>
              We're more than just coworkers - we're a family united by our love of baking and 
              commitment to quality.
            </p>
            <button className="cta-button">Join Our Team</button>
          </div>
        </div>
      </section>

      {/* Visit Us Section */}
      <section className="visit-us">
        <h2>Visit Us Today</h2>
        <div className="visit-content">
          <div className="visit-info">
            <h3>Location</h3>
            <p>123 Baker Street, Flour Town</p>
            <h3>Hours</h3>
            <p>Monday-Friday: 7am-7pm</p>
            <p>Saturday-Sunday: 8am-5pm</p>
            <button className="cta-button">Get Directions</button>
          </div>
          <div className="map-container">
            {/* Replace with your actual map embed */}
            <div className="map-placeholder">Map will go here</div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default About;