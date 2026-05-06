import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { servicesData } from '../data/servicesData';
import '../styles/Services.css';

const Services = () => {
  const [lightbox, setLightbox] = useState({ open: false, imgs: [], idx: 0 });

  const openLightbox = (imgs, idx) => setLightbox({ open: true, imgs, idx });
  const closeLightbox = () => setLightbox({ open: false, imgs: [], idx: 0 });
  const prevImg = () => setLightbox(l => ({ ...l, idx: (l.idx - 1 + l.imgs.length) % l.imgs.length }));
  const nextImg = () => setLightbox(l => ({ ...l, idx: (l.idx + 1) % l.imgs.length }));

  return (
    <div className="services-page editorial-redesign-v2">
      <section className="about-hero">
        <div className="about-hero-bg">
          <img src="/slider4.svg" alt="Services Hero" />
          <div className="about-hero-overlay"></div>
        </div>
        <div className="container about-hero-content">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="tag-gold">Our Expertise</span>
            <h1>Curated Design <br/><span>Solutions</span></h1>
            <div className="breadcrumb">
              <Link to="/">Home</Link> <span>/</span> <span className="active">Services</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-padding services-editorial">
        <div className="container">
          <div className="heading-main">
            <span className="tag">Excellence</span>
            <h2>Tailored To Your Vision</h2>
          </div>

          <div className="services-showcase-v2">
            {servicesData.map((s, i) => (
              <motion.div 
                key={s.id} 
                className={`service-immersive-row ${i % 2 !== 0 ? 'reverse' : ''}`}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="si-text-panel">
                  <div className="si-sticky-content">
                    <div className="si-header">
                      <span className="si-number">{s.number}</span>
                      <span className="si-badge">{s.badge}</span>
                    </div>
                    <h3 className="si-title">{s.title}</h3>
                    <p className="si-desc">{s.desc}</p>
                    
                    <ul className="si-features">
                      {s.features.slice(0, 4).map((f, idx) => (
                        <li key={idx}><i className="fas fa-check-circle"></i> {f}</li>
                      ))}
                    </ul>

                    <div className="si-actions">
                      <Link to={`/services/${s.slug}`} className="btn-premium primary">
                        Explore Concept <i className="fas fa-arrow-right ml-10"></i>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="si-visual-panel">
                  <div className="si-main-box">
                    <img src={s.thumb} alt={s.title} className="si-main-img" />
                    <div className="si-img-overlay"></div>
                  </div>
                  
                  <div className="si-grid-strip">
                    {s.images.slice(1, 5).map((img, idx) => (
                      <div 
                        key={idx} 
                        className="si-strip-item glass-effect" 
                        onClick={() => openLightbox(s.images, idx + 1)}
                      >
                        <img src={img} alt="Detail" />
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reused Lightbox for quick gallery access */}
      <AnimatePresence>
        {lightbox.open && (
          <motion.div className="lightbox-premium lightbox-v2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeLightbox}>
            <button className="lb-premium-close" onClick={closeLightbox}><i className="fas fa-times"></i></button>
            <div className="lb-premium-content" onClick={(e) => e.stopPropagation()}>
              <button className="lb-premium-btn prev" onClick={prevImg}><i className="fas fa-chevron-left"></i></button>
              <div className="lb-premium-main">
                <motion.div key={lightbox.idx} className="lb-premium-img-wrap" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                  <img src={lightbox.imgs[lightbox.idx]} alt="Gallery Detail" />
                  <div className="lb-premium-meta glass-effect">
                    <span>{lightbox.idx + 1} / {lightbox.imgs.length}</span>
                  </div>
                </motion.div>
              </div>
              <button className="lb-premium-btn next" onClick={nextImg}><i className="fas fa-chevron-right"></i></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Services;
