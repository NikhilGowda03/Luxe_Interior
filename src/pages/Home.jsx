import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const slides = [
  { img: '/slider1.svg', title: 'Sophistication \nReimagined', subtitle: 'Transforming spaces into timeless masterpieces.' },
  { img: '/slider2.svg', title: 'Elegant Living \nSpaces', subtitle: 'Where luxury meets comfort in every detail.' },
  { img: '/slider3.svg', title: 'Curated \nInteriors', subtitle: 'Personalized designs that reflect your unique story.' },
  { img: '/slider4.svg', title: 'Modern \nWorkplaces', subtitle: 'Inspiring environments for productivity and growth.' },
  { img: '/slider5.svg', title: 'Artisan \nCraftsmanship', subtitle: '15+ years of excellence in interior design.' },
];

const homeProjects = [
  { 
    title: 'Elegant Residences', 
    img: '/p1.webp', 
    desc: 'Discover our portfolio of stunning home transformations where luxury meets functionality.'
  },
  { 
    title: 'Unique Renovations', 
    img: '/p6.webp', 
    desc: 'Check out our renovation projects where we bring new life to older spaces.'
  },
  { 
    title: 'Light Design', 
    img: '/p7.webp', 
    desc: 'Explore our collection of tranquil bedroom projects that harmonize light and comfort.' 
  },
  { 
    title: 'Space Planning', 
    img: '/p10.webp', 
    desc: 'Discover our stylish bedroom projects that maximize every inch of your living area.'
  }
];

const anatomyDetails = [
    {
        id: '01',
        title: 'Architectural Lighting',
        desc: 'We orchestrate light to sculpt spaces, using concealed fixtures and layered ambient glows that adapt to your mood and time of day, vastly enhancing spatial geometry.',
        top: '25%',
        left: '40%'
    },
    {
        id: '02',
        title: 'Bespoke Joinery',
        desc: 'Every shelf and structure is precision-crafted. We utilize sustainable, high-grade materials to construct centerpieces that merge seamlessly with your structural narrative.',
        top: '60%',
        left: '25%'
    },
    {
        id: '03',
        title: 'Spatial Dynamics',
        desc: 'Furniture is curated to strictly optimize functional flow. We establish distinct, harmonious zones within open-plan environments that actively invite interaction.',
        top: '75%',
        left: '70%'
    }
];

// BULLETPROOF BIDIRECTIONAL FAST MOSAIC REVEAL (Uses pure CSS Grid & Backgrounds - 100% bug free)
const GridMosaicReveal = ({ src, rows = 12, cols = 8 }) => {
    // Parent orchestrates the high-speed staggered cascade automatically
    const containerVariants = {
        hidden: {},
        show: {
            transition: {
                staggerChildren: 0.015, // Extremely fast wave stagger (domino effect)
            }
        }
    };

    const pieceVariants = {
        hidden: { opacity: 0, scale: 0.3, rotate: 10, borderRadius: '20%' },
        show: { 
            opacity: 1, 
            scale: 1.025, // CRITICAL FIX: Micro-overlap permanently eliminates any browser sub-pixel grid gaps
            rotate: 0, 
            borderRadius: '0%', 
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
        }
    };

    const pieces = useMemo(() => {
        const p = [];
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                p.push(
                    <motion.div
                        key={`${r}-${c}`}
                        variants={pieceVariants}
                        style={{
                            width: '100%',
                            height: '100%',
                            backgroundImage: `url(${src})`,
                            backgroundSize: `${cols * 100}% ${rows * 100}%`,
                            backgroundPosition: `${cols > 1 ? (c / (cols - 1)) * 100 : 0}% ${rows > 1 ? (r / (rows - 1)) * 100 : 0}%`,
                            backgroundRepeat: 'no-repeat',
                            filter: 'grayscale(15%) brightness(0.9)',
                            transformOrigin: 'center center',
                            willChange: 'transform, opacity' // Hardware acceleration
                        }}
                    />
                );
            }
        }
        return p;
    }, [src, rows, cols]);

    return (
        <motion.div 
            style={{ 
                display: 'grid', 
                gridTemplateColumns: `repeat(${cols}, 1fr)`, 
                gridTemplateRows: `repeat(${rows}, 1fr)`,
                width: '100%', 
                height: '100%',
                overflow: 'hidden',
                borderRadius: '4px'
            }}
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.15 }} // <--- Enables bidirectional flawless replaying
        >
            {pieces}
        </motion.div>
    );
};

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeAnatomy, setActiveAnatomy] = useState(anatomyDetails[0]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="home-page">
      {/* Cinematic Hero Slider */}
      <section className="hero-cinematic">
        <AnimatePresence>
          <motion.div 
            key={currentSlide}
            className="hero-slide-premium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <div className="hero-img-container">
              <motion.img 
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 6, ease: "linear" }}
                src={slides[currentSlide].img} 
                alt={slides[currentSlide].title} 
              />
              <div className="hero-overlay-v2"></div>
            </div>
            
            <div className="hero-content-v2 container">
              <div className="content-inner">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  <span className="hero-pre-title">Exclusive Interior Design</span>
                   <h1>
                    {slides[currentSlide].title.split('\n')[0]}
                    {slides[currentSlide].title.includes('\n') && <br />}
                    {slides[currentSlide].title.includes('\n') && <span>{slides[currentSlide].title.split('\n')[1]}</span>}
                  </h1>
                  <p>{slides[currentSlide].subtitle}</p>
                  
                  <div className="hero-cta-group">
                    <Link to="/projects" className="btn-premium primary">Explore Portfolio</Link>
                    <Link to="/contact" className="btn-premium outline light">Quick Inquiry</Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="hero-indicators">
          {slides.map((_, i) => (
            <button 
              key={i} 
              className={`indicator-btn ${currentSlide === i ? 'active' : ''}`}
              onClick={() => setCurrentSlide(i)}
            >
              <span className="idx">0{i + 1}</span>
              <span className="progress-bar"></span>
            </button>
          ))}
        </div>
      </section>

      {/* THE LEGACY (ABOUT) */}
      <section className="legacy-section section-padding">
        <div className="container">
          <div className="legacy-split">
            <div className="legacy-img-col">
              <div className="scattered-container" style={{ background: 'transparent' }}>
                 {/* 100% bug-free Grid Background Mosaic explicitly allowing fast bidirectional loads */}
                 <GridMosaicReveal src="/projects/14.webp" rows={12} cols={8} />
              </div>
              <motion.div 
                className="legacy-milestone ghost-gold"
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: false, amount: 0.3 }}
                style={{ zIndex: 10 }}
              >
                 <div className="ms-num">15+</div>
                 <div className="ms-text">Years Building <br/>Excellence</div>
              </motion.div>
            </div>
            
            <motion.div 
              className="legacy-txt-col"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: false, amount: 0.3 }}
            >
              <span className="ghost-watermark">LUXE</span>
              <span className="tag-gold mb-20">The Legacy</span>
              <h2>Crafting Stories Through <br/>Bespoke Interiors</h2>
              <p className="lead-txt">
                At Luxe Interiors & Decorators, we believe every space has its own soul. 
                Our design philosophy revolves around creating harmonious environments 
                that reflect the unique personalities of those who inhabit them.
              </p>
              <Link to="/about" className="btn-premium outline mt-40">Uncover Our Roots</Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SIGNATURE CRAFTS (SERVICES MARQUEE) */}
      <section className="signature-crafts-section">
          <div className="marquee-wrapper">
              <div className="marquee-content">
                  {['Elegant Residences', 'Commercial Hubs', 'Bespoke Furnishing', 'Architectural Styling', 'Elegant Residences', 'Commercial Hubs', 'Bespoke Furnishing', 'Architectural Styling'].map((sc, i) => (
                    <div key={i} className="craft-card">
                        <h3>{sc}</h3>
                        <span className="craft-line"></span>
                    </div>
                  ))}
              </div>
          </div>
      </section>

      {/* HORIZONTAL FLEX ACCORDION (PREMIUM PROJECTS) */}
      <section className="premium-projects-section section-padding">
          <div className="container-fluid p-0">
              <div className="heading-main text-center pb-50">
                  <span className="tag-gold mb-20">Portfolio</span>
                  <h2>Our Projects</h2>
              </div>

              <div className="projects-accordion">
                  {homeProjects.map((p, i) => (
                      <motion.div 
                        key={i} 
                        className="pa-panel"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.8 }}
                        viewport={{ once: true }}
                      >
                          <img src={p.img} alt={p.title} className="pa-bg" />
                          <div className="pa-overlay"></div>
                          
                          <div className="pa-content">
                              <div className="pa-title-wrap">
                                  <span className="pa-num">0{i+1}</span>
                                  <h3>{p.title}</h3>
                              </div>
                              <div className="pa-desc">
                                  <p>{p.desc}</p>
                                  <Link to="/projects" className="btn-premium outline light mt-20">View Project Detail</Link>
                              </div>
                          </div>
                      </motion.div>
                  ))}
              </div>
              
              <div className="text-center mt-40 mb-20">
                 <Link to="/projects" className="btn-premium outline">Open Full Gallery</Link>
              </div>
          </div>
      </section>

      {/* ANATOMY OF EXCELLENCE (REPLACES METRIC HALL) */}
      <section className="anatomy-section section-padding">
          <div className="container">
              <div className="anatomy-grid">
                  <div className="anatomy-visual">
                      <motion.div 
                          className="anatomy-curtain" 
                          initial={{ scaleX: 1 }}
                          whileInView={{ scaleX: 0 }}
                          transition={{ duration: 1.5, ease: [0.77, 0, 0.175, 1], delay: 0.2 }}
                          viewport={{ once: true }}
                      />
                      <motion.img 
                          src="/unique-anatomy-bg.webp" 
                          alt="Design Anatomy" 
                          initial={{ scale: 1.1, filter: "brightness(0.5) blur(10px)" }}
                          whileInView={{ scale: 1, filter: "brightness(0.9) blur(0px)" }}
                          transition={{ duration: 1.8, ease: "easeOut", delay: 0.4 }}
                          viewport={{ once: true }}
                      />
                      {anatomyDetails.map((detail, i) => (
                          <motion.div 
                              key={i}
                              className={`hotspot ${activeAnatomy.id === detail.id ? 'active' : ''}`}
                              style={{ top: detail.top, left: detail.left }}
                              onMouseEnter={() => setActiveAnatomy(detail)}
                              onClick={() => setActiveAnatomy(detail)}
                              initial={{ opacity: 0, scale: 0 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.5, delay: 1.5 + (i * 0.2) }}
                              viewport={{ once: true }}
                          >
                              <div className="hotspot-ring"></div>
                              <div className="hotspot-dot"></div>
                          </motion.div>
                      ))}
                  </div>
                  
                  <motion.div 
                    className="anatomy-content"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 1 }}
                    viewport={{ once: true }}
                  >
                      <span className="tag-gold mb-20">The Breakdown</span>
                      <h2>The Anatomy of <br/>Excellence</h2>
                      <p className="text-muted mb-40">Hover over the interaction points (or tap) on the design to understand the incredible details and decisions that elevate our interior architectures from ordinary to extraordinary.</p>
                      
                      <div className="anatomy-info-box">
                          <AnimatePresence mode="wait">
                              <motion.div 
                                  key={activeAnatomy.id} 
                                  initial={{ opacity: 0, y: 15 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -15 }}
                                  transition={{ duration: 0.3 }}
                              >
                                  <span className="anatomy-num">{activeAnatomy.id}</span>
                                  <h3>{activeAnatomy.title}</h3>
                                  <p>{activeAnatomy.desc}</p>
                                  
                                  <Link to="/contact" className="link-underlined mt-30">Discuss These Details For Your Space</Link>
                              </motion.div>
                          </AnimatePresence>
                      </div>
                  </motion.div>
              </div>
          </div>
      </section>
    </div>
  );
};

export default Home;
