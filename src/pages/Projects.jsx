import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../styles/Projects.css';

const allProjects = [
  { img: '/p1.webp',  title: 'Zen Arrival \nFoyer',      desc: 'A tranquil entrance featuring a custom Buddha niche and elegant wood paneling.', category: 'residential', size: 'large' },
  { img: '/p2.webp',  title: 'Enchanted \nKids Suite',   desc: 'Whimsical castle-themed bedroom with integrated play zones and accent lighting.', category: 'residential', size: 'wide' },
  { img: '/p3.webp',  title: 'Geometric \nWardrobe',     desc: 'Modern high-gloss wardrobe featuring bespoke geometric patterns and sleek handles.', category: 'residential' },
  { img: '/p5.webp',  title: 'Artisanal \nVeneer Entry', desc: 'Bespoke main entrance door crafted with premium wood veneer and designer hardware.', category: 'residential' },
  { img: '/p6.webp',  title: 'Majestic \nCrockery Unit', desc: 'Elegant dining room storage with integrated warm LED backlighting and staggered shelving.', category: 'residential', size: 'tall' },
  { img: '/p7.webp',  title: 'Grand \nCelestial Hall',    desc: 'Bespoke Ganesha mural paired with a layered false ceiling and grand crystal chandelier.', category: 'residential', size: 'large' },
  { img: '/p9.webp',  title: 'Modern \nTV Lounge',       desc: 'Contemporary media unit with marble textures and minimalist floating shelves.', category: 'residential' },
  { img: '/p10.webp', title: 'Luxury \nVanity Hub',      desc: 'A seamless floor-to-ceiling wardrobe with integrated dressing mirror and accent lighting.', category: 'residential' },
  { img: '/p11.webp', title: 'Executive \nOffice Suite',  desc: 'Professional workspace designed for productivity with premium wood finishes.', category: 'commercial', size: 'wide' },
  { img: '/p12.webp', title: 'Sleek \nModular Kitchen',   desc: 'Ultra-modern kitchen layout with high-efficiency storage and premium surfaces.', category: 'residential' },
  { img: '/p13.webp', title: 'Classic \nLiving Space',    desc: 'Warm and inviting living area featuring traditional touches with modern comfort.', category: 'residential' },
  { img: '/p14.webp', title: 'Artistic \nAccent Wall',    desc: 'Custom textured wall design that serves as a focal point for the master bedroom.', category: 'residential' },
  { img: '/p15.webp', title: 'Dual-Tone \nStudy Hub',     desc: 'Functional and stylish workspace featuring a mix of wood and matte white finishes.', category: 'residential' },
  { img: '/p16.webp', title: 'Royal \nDining Experience', desc: 'Grand dining area with luxury chandeliers and bespoke furniture coordination.', category: 'residential' },
  { img: '/p17.webp', title: 'Corporate \nBoardroom',    desc: 'High-end meeting space with technical integration and professional aesthetics.', category: 'commercial' },
  { img: '/p18.webp', title: 'Master \nSuite Serenity',   desc: 'A tranquil master bedroom design focused on comfort and premium materials.', category: 'residential' },
];

const filters = ['all', 'residential', 'commercial'];

const Projects = () => {
  const [active, setActive] = useState('all');
  const [activeIdx, setActiveIdx] = useState(0);
  const theaterRef = useRef(null);

  const filtered = active === 'all' ? allProjects : allProjects.filter(p => p.category === active);

  // 3D Parallax Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXVal = e.clientX - rect.left - width / 2;
    const mouseYVal = e.clientY - rect.top - height / 2;
    x.set(mouseXVal);
    y.set(mouseYVal);
  };

  const selectProject = (idx) => {
    setActiveIdx(idx);
    theaterRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const prevLB = () => setActiveIdx(i => (i - 1 + filtered.length) % filtered.length);
  const nextLB = () => setActiveIdx(i => (i + 1) % filtered.length);

  return (
    <div className="projects-page-v3">
      <section className="about-hero">
        <div className="about-hero-bg">
          <img src="/slider5.svg" alt="Projects Hero" />
          <div className="about-hero-overlay"></div>
        </div>
        <div className="container about-hero-content">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="tag-gold">Masterpieces</span>
            <h1>The Portfolio of <br/><span>Distinction</span></h1>
            <div className="breadcrumb">
              <Link to="/">Home</Link> <span>/</span> <span className="active">Portfolio</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="projects-grid-section">
        <div className="container">
          <div className="filter-sticky-wrap glass-effect">
            <div className="filter-buttons">
              {filters.map(f => (
                <button
                  key={f}
                  className={`filter-btn-premium ${active === f ? 'active' : ''}`}
                  onClick={() => setActive(f)}
                >
                  <span className="f-label">{f}</span>
                  {active === f && <motion.div layoutId="fAccent" className="f-accent" />}
                </button>
              ))}
            </div>
          </div>

          <div className="bento-portfolio-grid">
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => (
                <motion.div
                  key={p.img + i}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.05 }}
                  className={`bento-item ${p.size || ''} ${activeIdx === i ? 'active' : ''}`}
                  onClick={() => selectProject(i)}
                >
                  <div className="bento-inner">
                    <img src={p.img} alt={p.title} loading="lazy" />
                    <div className="bento-overlay">
                      <div className="bento-content">
                        <span className="bento-cat">{p.category}</span>
                        <h3 className="bento-title">{p.title}</h3>
                        <p className="bento-desc">{p.desc}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
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
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                        >
                          <img src={filtered[activeIdx]?.img} alt="Project Detail" />
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
                        <span className="detail-index">Portfolio Item {activeIdx + 1} / {filtered.length}</span>
                        <div className="separator-gold"></div>
                        <h3 className="detail-title-side">{filtered[activeIdx]?.title.replace('\n', ' ')}</h3>
                        <p className="detail-meta-text">{filtered[activeIdx]?.desc}</p>
                        
                        <div className="detail-badge-group">
                            <span className="mini-badge">{filtered[activeIdx]?.category}</span>
                            <span className="mini-badge">Luxury Finish</span>
                        </div>
                    </motion.div>
                    
                    <div className="panel-hint">Parallax Enabled - Hover to rotate View</div>
                </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
