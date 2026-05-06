import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer overlay-hidden">
      <div className="footer-glow-left"></div>
      <div className="footer-glow-right"></div>
      
      {/* Floating Background Text */}
      <div className="footer-bg-text">LUXE</div>

      <div className="footer-container">
        <div className="footer-grid">
          {/* About Section */}
          <div className="footer-section footer-about">
            <Link to="/" className="footer-logo">
              <img src="/logo.webp" alt="Luxe Interiors Footer Logo" />
            </Link>
            <p className="footer-description">
              Since 2008, Luxe Interiors & Decorators has been transforming homes and offices with its unique human-centric approach. For the past 16 years, we have ensured designs that genuinely resonate with our clients' lifestyles.
            </p>

          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/projects">Projects</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h3>Contact Us</h3>
            <div className="contact-details">
              <p><i className="fas fa-phone"></i> <a href="tel:+910000000000" className="footer-contact-link">+91 00000 00000</a></p>
              <p><i className="fas fa-phone"></i> <a href="tel:+911111111111" className="footer-contact-link">+91 11111 11111</a></p>
              <p><i className="fas fa-envelope"></i> <a href="mailto:contact@luxeinteriors.demo" className="footer-contact-link">contact@luxeinteriors.demo</a></p>
              <p><i className="fas fa-map-marker-alt"></i> No: 10/11, K.R. Defence Colony, 1st Phase, Chemasandra, Virgonagar (P) Bangalore: 560049</p>
            </div>
          </div>

          {/* Map Section */}
          <div className="footer-section footer-map">
            <h3>Find Us</h3>
            <div className="map-wrapper">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124440.32040003056!2d77.51860641151603!3d12.971598700000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1728021326822!5m2!1sen!2sin" 
                width="100%" height="150" style={{ border: 0, borderRadius: '8px' }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Luxe Interiors Location"></iframe>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 Luxe Interiors & Decorators. All rights reserved.</p>
          <p className="credit">Designed by <a href="https://www.devcreationsblr.com/" target="_blank" rel="noopener noreferrer" className="highlight-credit">Dev Creations & Solutions</a></p>
        </div>
      </div>
      
      {/* WhatsApp Floating */}
      <motion.a 
        href="https://wa.me/+910000000000" 
        className="whatsapp-btn"
        target="_blank"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <i className="fab fa-whatsapp"></i>
      </motion.a>
    </footer>
  );
};

export default Footer;
