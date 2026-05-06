import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { servicesData } from '../data/servicesData';
import '../styles/ServiceDetail.css';

const ServiceDetail = () => {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const theaterRef = useRef(null);

  // 3D Parallax Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

  useEffect(() => {
    const found = servicesData.find(s => s.slug === slug);
    setService(found);
  }, [slug]);

  if (!service) return <div className="loading">Loading...</div>;

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXVal = e.clientX - rect.left - width / 2;
    const mouseYVal = e.clientY - rect.top - height / 2;
    x.set(mouseXVal);
    y.set(mouseYVal);
  };

  const selectImage = (idx) => {
    setActiveIdx(idx);
    theaterRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const prevLB = () => setActiveIdx(i => (i - 1 + service.images.length) % service.images.length);
  const nextLB = () => setActiveIdx(i => (i + 1) % service.images.length);

  return (
    <div className="service-detail-page">
      <section className="about-hero">
        <div className="about-hero-bg">
          <img src={service.heroImg} alt={service.title} />
          <div className="about-hero-overlay"></div>
        </div>
        <div className="container about-hero-content">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="tag-gold">{service.badge}</span>
            <h1><span>{service.title.replace('\n', ' ')}</span></h1>
            <div className="breadcrumb">
              <Link to="/">Home</Link> <span>/</span> <Link to="/services">Services</Link> <span>/</span> <span className="active">{service.slug}</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-padding detail-narrative">
        <div className="container">
          <div className="narrative-grid">
            <div className="narrative-text">
              <span className="tag-gold">The Vision</span>
              <h2>Bespoke {service.slug} detailing</h2>
              <p className="full-desc-text">{service.fullDesc}</p>
              
              <div className="feature-matrix-grid">
                {service.features.map((f, i) => (
                  <div key={i} className="fm-item glass-effect">
                    <i className="fas fa-gem"></i>
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="narrative-visual">
              <div className="main-detail-frame">
                <img src={service.images[0]} alt="Featured Detail" />
                <div className="frame-accent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* UNIQUE MOSAIC THUMBNAIL GALLERY */}
      <section className="section-padding gallery-expanded bg-darker">
        <div className="container">
          <div className="heading-main">
            <span className="tag">Portfolio</span>
            <h2>Project Selection</h2>
            <p>Click any capture to explore its depth in the 3D theater below.</p>
          </div>

          <div className="mosaic-masonry-gallery">
            {service.images.map((img, i) => {
              // Create a deterministic but "random-looking" unique layout
              let sizeClass = '';
              if (i % 7 === 0) sizeClass = 'm-large';
              else if (i % 5 === 0) sizeClass = 'm-wide';
              else if (i % 3 === 0) sizeClass = 'm-tall';

              return (
                <motion.div 
                  key={i}
                  className={`mosaic-item ${sizeClass} ${activeIdx === i ? 'active' : ''}`}
                  initial={{ opacity:0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => selectImage(i)}
                >
                  <div className="mosaic-inner">
                    <img src={img} alt={`Gallery ${i}`} loading="lazy" />
                    <div className="mosaic-overlay">
                        <span className="m-num">#{(i+1).toString().padStart(2, '0')}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3D SPATIAL THEATER (IN-PAGE) */}
      <section className="spatial-theater-section section-padding" ref={theaterRef}>
        <div className="container">
          <div className="theater-main-layout glass-effect" onMouseMove={handleMouseMove}>
            
            <div className="theater-navigation">
                <button className="th-nav-btn prev" onClick={prevLB}><i className="fas fa-chevron-left"></i></button>
                <button className="th-nav-btn next" onClick={nextLB}><i className="fas fa-chevron-right"></i></button>
            </div>

            <div className="theater-grid">
                <div className="theater-stage-box">
                    <div className="theater-view-port">
                        <motion.div 
                          className="theater-3d-card"
                          style={{ rotateX, rotateY, perspective: 1200 }}
                          key={activeIdx}
                          initial={{ opacity: 0, scale: 0.9, z: -100 }}
                          animate={{ opacity: 1, scale: 1, z: 0 }}
                          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                        >
                          <img src={service.images[activeIdx]} alt="3D Detail" />
                          <div className="theater-card-glow"></div>
                        </motion.div>
                    </div>
                </div>

                <div className="theater-details-panel">
                    <motion.div 
                        className="details-panel-inner"
                        key={activeIdx + "text"}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <span className="detail-index">Viewing Piece {activeIdx + 1} / {service.images.length}</span>
                        <div className="separator-gold"></div>
                        <h3 className="detail-title-side">{service.slug} Masterpiece</h3>
                        <p className="detail-meta-text">A demonstration of our uncompromising attention to geometric harmony and material luxury.</p>
                        
                        <div className="detail-badge-group">
                            <span className="mini-badge">4K Resolution</span>
                            <span className="mini-badge">3D Spatial</span>
                        </div>
                    </motion.div>
                    
                    <div className="panel-hint">Interactive Suite - Hover for depth</div>
                </div>
            </div>

          </div>
        </div>
      </section>

      <section className="section-padding detail-cta">
        <div className="container text-center">
            <h3>Ready to start your {service.slug} project?</h3>
            <p>Let's create something extraordinary together.</p>
            <Link to="/contact" className="btn-premium primary mt-30">Consult an Expert</Link>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;
