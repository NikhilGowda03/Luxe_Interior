import React, { useMemo, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../styles/About.css';

// Reusable GridMosaicReveal for premium staggered image loading
const GridMosaicReveal = ({ src, rows = 12, cols = 8 }) => {
  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.015 } }
  };
  const pieceVariants = {
    hidden: { opacity: 0, scale: 0.3, rotate: 10, borderRadius: '20%' },
    show: {
      opacity: 1, scale: 1.025, rotate: 0, borderRadius: '0%',
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
              width: '100%', height: '100%',
              backgroundImage: `url(${src})`,
              backgroundSize: `${cols * 100}% ${rows * 100}%`,
              backgroundPosition: `${cols > 1 ? (c / (cols - 1)) * 100 : 0}% ${rows > 1 ? (r / (rows - 1)) * 100 : 0}%`,
              backgroundRepeat: 'no-repeat',
              filter: 'grayscale(0%) brightness(0.95)',
              transformOrigin: 'center center',
              willChange: 'transform, opacity'
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
        width: '100%', height: '100%', overflow: 'hidden', borderRadius: '4px'
      }}
      variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.15 }}
    >
      {pieces}
    </motion.div>
  );
};

const teamImages = ['/12.svg', '/13.svg', '/14.svg'];
const testimonials = [
  { name: 'Dev Raj', role: 'Business Owner', text: 'Their professionalism and creativity exceeded our expectations. Our corporate space now exudes sophistication, impressing every client who walks through the door.' },
  { name: 'Chaitnya Deep', role: 'Villa Owner', text: "Our villa's redesign was nothing short of spectacular. Luxe's team truly understands luxury, and their attention to detail is unparalleled." }
];

const About = () => {
  const { scrollYProgress } = useScroll();
  const yHero = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="about-page premium-redesign">
      {/* Cinematic Hero */}
      <section className="about-hero-premium">
        <motion.div className="about-hero-bg-premium" style={{ y: yHero, opacity: opacityHero }}>
          <img src="/slider3.svg" alt="About Hero" />
          <div className="about-hero-overlay-premium"></div>
        </motion.div>

        <div className="container about-hero-content-premium">
          <motion.div
            initial={{ opacity: 0, y: 100, rotateX: 20 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformPerspective: 1000 }}
          >
            <span className="tag-gold mb-20 d-block" style={{ width: 'max-content' }}>Since 2008</span>
            <h1 className="hero-title-huge">The Legacy<br /><span>of Excellence</span></h1>
            <div className="breadcrumb mt-30">
              <Link to="/">Home</Link> <span>/</span> <span className="active">About Us</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Intro Section - Split Typographical Overlap */}
      <section className="about-intro-premium section-padding">
        <div className="container">
          <div className="intro-overlap-grid">
            <div className="intro-left-stick">
              <motion.h2
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, margin: "-10px" }}
              >
                Defining <br />the Art of <br /><span className="glow-text">Living Well</span>
              </motion.h2>
              <div className="scroll-indicator mt-40">
                <div className="mouse"></div>
                <span>Scroll to Explore</span>
              </div>
            </div>
            <div className="intro-right-flow">
              <motion.div
                className="intro-text-block glass-panel"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="quote-mark">"</div>
                <p className="lead-text">
                  At Luxe Interiors & Decorators, we believe that your environment profoundly shapes your well-being.
                  Our journey began in 2008 with a simple yet powerful vision: to create spaces that are as unique as the individuals who inhabit them.
                </p>
                <p className="secondary-text">
                  For over 16 years, we have pushed the boundaries of interior design, blending artistic intuition with technical precision.
                  Our approach is rooted in understanding the soul of a space and the needs of our clients, resulting in bespoke interiors that resonate with elegance and character.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision - Cinematic Bento */}
      <section className="mission-vision-premium section-padding">
        <div className="container">
          <div className="mv-bento-grid">
            <motion.div
              className="mv-bento-card visual-card"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <GridMosaicReveal src="/premium_mission_vision.webp" rows={8} cols={6} />
            </motion.div>

            <motion.div
              className="mv-bento-card content-card mission-card glass-effect"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <div className="mv-header">
                <span className="mv-num">01</span>
                <h3>Our Mission</h3>
              </div>
              <p>
                To transform ordinary spaces into extraordinary experiences through meticulous craftsmanship and visionary design.
                We are committed to delivering unparalleled quality and personalized service for every client.
              </p>
            </motion.div>

            <motion.div
              className="mv-bento-card content-card vision-card glass-effect"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <div className="mv-header">
                <span className="mv-num">02</span>
                <h3>Our Vision</h3>
              </div>
              <p>
                To redefine the global standard for luxury interiors, where every project we undertake becomes a timeless masterpiece of innovation,
                comfort, and sophisticated aesthetic expression.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Founder - Cinematic Parallax Split */}
      <section className="founder-premium section-padding">
        <div className="container">
          <div className="founder-split-v2">
            <div className="founder-visual-side" style={{ display: 'flex', justifyContent: 'center' }}>
              <motion.div
                className="founder-frame-premium"
                initial={{ clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)", filter: "brightness(2) blur(10px)", scale: 1.2 }}
                whileInView={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", filter: "brightness(1) blur(0px)", scale: 1 }}
                transition={{ duration: 1.6, ease: [0.77, 0, 0.175, 1] }}
                viewport={{ once: true, margin: "-10px" }}
              >
                <img src="/owner.webp" alt="Mr. Kuna Ram" className="founder-img" />
                <div className="founder-overlay-glow"></div>
              </motion.div>
            </div>
            <div className="founder-text-side">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="founder-badge glass-effect">
                  <h4>Mr. Kuna Ram</h4>
                  <span>Founder & CEO</span>
                </div>
                <span className="tag-gold mt-40 d-block"></span>
                <h2 className="section-title text-4xl">Driven by Passion, <br />Guided by Quality</h2>
                <div className="premium-separator"></div>
                <p className="founder-quote-premium">
                  "We don't just design rooms; we curate experiences that linger in the heart."
                </p>
                <p className="founder-desc">
                  Since 2008, Julian Vane has led Luxe Interiors & Decorators with an unwavering commitment to excellence.
                  His philosophy integrates traditional craftsmanship with modern innovation, ensuring that every project reflects the true essence of its inhabitant.
                </p>
                <Link to="/contact" className="btn-premium primary mt-40">Talk to Our Founder</Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Team - Horizontal Scroll / Cinematic Grid */}
      <section className="team-premium section-padding">
        <div className="container">
          <div className="heading-center-premium">
            <span className="tag-gold mb-20 text-center">Collaborators</span>
            <h2 className="text-center">The Creative Minds</h2>
          </div>
          <div className="team-gallery-premium mt-60">
            {teamImages.map((img, i) => (
              <motion.div
                key={i}
                className="team-member-card"
                initial={{ opacity: 0, rotateY: 90, rotateX: 15, y: 100, filter: "blur(15px)" }}
                whileInView={{ opacity: 1, rotateY: 0, rotateX: 0, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-10px" }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: i * 0.15 }}
                style={{ transformPerspective: 1200, transformStyle: "preserve-3d" }}
              >
                <div className="team-img-bound">
                  <img src={img} alt={`Expert Member ${i + 1}`} />
                  <div className="team-hover-state">
                    <span className="th-role">Expert Designer</span>
                    <div className="th-line"></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Signature Marquee or Cards */}
      <section className="testimonials-premium section-padding">
        <div className="container">
          <div className="heading-main mb-60">
            <span className="tag-gold">Kind Words</span>
            <h2>Client Voices</h2>
          </div>
          <div className="testimonials-bento">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                className="t-bento-card glass-effect"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.8 }}
              >
                <div className="t-quote-icon">"</div>
                <p className="t-text">{t.text}</p>
                <div className="t-author-row mt-40">
                  <div className="t-avatar"></div>
                  <div className="t-meta">
                    <h4>{t.name}</h4>
                    <span>{t.role}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
