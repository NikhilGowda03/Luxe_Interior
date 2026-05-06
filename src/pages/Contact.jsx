import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../styles/Contact.css';

const Contact = () => {
  return (
    <div className="contact-page">
      {/* Cinematic Hero */}
      <section className="about-hero">
        <div className="about-hero-bg">
          <img src="/slider2.svg" alt="Contact Hero" />
          <div className="about-hero-overlay"></div>
        </div>
        <div className="container about-hero-content">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="tag-gold">Get In Touch</span>
            <h1>Begin Your <br /><span>Transformation</span></h1>
            <div className="breadcrumb">
              <Link to="/">Home</Link> <span>/</span> <span className="active">Contact Us</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Split Contact Section */}
      <section className="section-padding contact-main">
        <div className="container">
          <div className="contact-luxury-grid">
            {/* Contact Details */}
            <div className="contact-details-side">
              <span className="tag-gold">Details</span>
              <h2>Let's discuss <br />your vision</h2>
              <p className="contact-intro-text">
                Whether you're looking to redefine your home or elevate your commercial workspace,
                our team is ready to bring your ideas to life.
              </p>

              <div className="luxury-info-list">
                <motion.div
                  className="luxury-info-item glass-effect"
                  initial={{ opacity: 0, x: -40, scale: 0.95 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="luxury-icon"><i className="fas fa-phone-alt"></i></div>
                  <div className="luxury-text">
                    <h4>Direct Line</h4>
                    <p><a href="tel:+910000000000" className="contact-info-link">+91 00000 00000</a></p>
                    <p><a href="tel:+911111111111" className="contact-info-link">+91 11111 11111</a></p>
                  </div>
                </motion.div>

                <motion.div
                  className="luxury-info-item glass-effect"
                  initial={{ opacity: 0, x: -40, scale: 0.95 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="luxury-icon"><i className="fas fa-envelope"></i></div>
                  <div className="luxury-text">
                    <h4>Electronic Mail</h4>
                    <p><a href="mailto:contact@luxeinteriors.demo" className="contact-info-link">contact@luxeinteriors.demo</a></p>
                  </div>
                </motion.div>

                <motion.div
                  className="luxury-info-item glass-effect"
                  initial={{ opacity: 0, x: -40, scale: 0.95 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="luxury-icon"><i className="fas fa-map-marker-alt"></i></div>
                  <div className="luxury-text">
                    <h4>The Studio</h4>
                    <p>No: 10/11, K.R. Defence Colony, 1st Phase, Chemasandra, Virgonagar (P) Bangalore: 560049</p>
                  </div>
                </motion.div>

                <motion.div
                  className="luxury-info-item glass-effect"
                  initial={{ opacity: 0, x: -40, scale: 0.95 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.45, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="luxury-icon"><i className="fab fa-whatsapp"></i></div>
                  <div className="luxury-text">
                    <h4>Digital Consultation</h4>
                    <a href="https://wa.me/+919916335613" target="_blank" rel="noreferrer" className="wa-link-premium">
                      Chat with an Expert <i className="fas fa-chevron-right"></i>
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Interactive Form Side */}
            <motion.div
              className="contact-form-side"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true, margin: "-10px" }}
            >
              <div className="form-frame-luxury glass-effect">
                <h3>Send Us A Message</h3>
                <form className="premium-contact-form" onSubmit={(e) => e.preventDefault()}>
                  <div className="form-group">
                    <input type="text" placeholder="Name" required />
                  </div>
                  <div className="form-group">
                    <input type="email" placeholder="Email" required />
                  </div>
                  <div className="form-group">
                    <input type="tel" placeholder="Phone number" />
                  </div>
                  <div className="form-group">
                    <textarea placeholder="Message" rows="4" required></textarea>
                  </div>
                  <button type="submit" className="btn-premium primary w-100 mt-20">
                    Send Message <i className="fas fa-paper-plane ml-10"></i>
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Big Card Map Section */}
      <section className="contact-map-section section-padding pt-0">
        <div className="container">
          <div className="heading-main mb-60">
            <span className="tag-gold mb-20 text-center">Location</span>
            <h2 className="text-center">Visit Our Studio</h2>
          </div>
          <motion.div
            className="map-frame-luxury big-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <div className="map-inner-wrapper">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124440.32040003056!2d77.51860641151603!3d12.971598700000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1728021326822!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Luxe Interiors Location"
              ></iframe>
            </div>
            <div className="map-overlay-luxury">
              <a
                href="https://maps.google.com/?q=Interior+Design+Studio+Bangalore"
                target="_blank"
                rel="noreferrer"
                className="btn-premium"
              >
                Explore Location <i className="fas fa-external-link-alt ml-10"></i>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
