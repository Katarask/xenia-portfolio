import React, { useState, useEffect, useRef } from 'react';
import './App.css';

// ============================================
// DESIGN TOKENS (from Webflow CSS)
// ============================================
const tokens = {
  colors: {
    red: '#a71c1c',
    casual: '#333',
    white: '#fff',
    black: '#0d0d0d',
    border: '#ebebeb',
    muted: '#7d797a',
  },
  font: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
  easing: {
    smooth: 'cubic-bezier(0.16, 1, 0.3, 1)',
    hover: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
  },
};

// ============================================
// PORTFOLIO DATA
// ============================================
const PORTFOLIO_DATA = {
  column1: [
    { id: 1, title: 'Soap&Skin', subtitle: 'Artist', image: '/images/col1-1.jpg', height: 450 },
    { id: 2, title: '', subtitle: '', image: '/images/col1-2.jpg', height: 380 },
    { id: 3, title: 'Rick Owens', subtitle: 'Designer', image: '/images/col1-3.jpg', height: 420 },
    { id: 4, title: 'Soap&Skin', subtitle: 'Artist', image: '/images/col1-4.jpg', height: 350 },
    { id: 5, title: '', subtitle: '', image: '/images/col1-5.jpg', height: 400 },
  ],
  column2: [
    { id: 6, title: 'Eric Joham', subtitle: 'Interview', image: '/images/col2-1.jpg', height: 320 },
    { id: 7, title: 'Laura Gerte', subtitle: 'Brand', image: '/images/col2-2.jpg', height: 480 },
    { id: 8, title: 'Wales Bonner', subtitle: 'Backstage', image: '/images/col2-3.jpg', height: 400 },
    { id: 9, title: '', subtitle: '', image: '/images/col2-4.jpg', height: 360 },
  ],
  column3: [
    { id: 10, title: 'Bonnie Strange', subtitle: 'Portrait', image: '/images/col3-1.jpg', height: 440 },
    { id: 11, title: 'C/O Magazine', subtitle: 'Editorial', image: '/images/col3-2.jpg', height: 380 },
    { id: 12, title: '', subtitle: '', image: '/images/col3-3.jpg', height: 350 },
    { id: 13, title: 'Sony Music', subtitle: 'Campaign', image: '/images/col3-4.jpg', height: 420 },
  ],
  column4: [
    { id: 14, title: '', subtitle: '', image: '/images/col4-1.jpg', height: 360 },
    { id: 15, title: 'AEYDE', subtitle: 'Brand', image: '/images/col4-2.jpg', height: 450 },
    { id: 16, title: '', subtitle: '', image: '/images/col4-3.jpg', height: 380 },
    { id: 17, title: 'Paris Fashion', subtitle: 'Backstage', image: '/images/col4-4.jpg', height: 400 },
  ],
};

const ABOUT_IMAGES = [
  { id: 1, label: 'Editorial', image: '/images/about-1.jpg' },
  { id: 2, label: 'Fashion', image: '/images/about-2.jpg' },
  { id: 3, label: 'Portrait', image: '/images/about-3.jpg' },
  { id: 4, label: 'Backstage', image: '/images/about-4.jpg' },
  { id: 5, label: 'Campaign', image: '/images/about-5.jpg' },
  { id: 6, label: 'Artist', image: '/images/about-6.jpg' },
];

const NAV_LINKS = [
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'services', label: 'Services' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

// ============================================
// CUSTOM CURSOR
// ============================================
const CustomCursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const [cursorText, setCursorText] = useState('');

  useEffect(() => {
    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    const checkHover = (e) => {
      const card = e.target.closest('.story-card, .about-image');
      if (card) {
        setHovering(true);
        setCursorText('View');
      } else {
        setHovering(false);
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mousemove', checkHover);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousemove', checkHover);
    };
  }, []);

  return (
    <div className="cursor-container">
      <div
        className={`cursor-dot ${hovering ? 'is-hovering' : ''}`}
        style={{ left: pos.x, top: pos.y }}
      >
        {hovering && <span className="cursor-text">{cursorText}</span>}
      </div>
      <div
        className={`cursor-ring ${hovering ? 'is-hovering' : ''}`}
        style={{ left: pos.x, top: pos.y }}
      />
    </div>
  );
};

// ============================================
// NAVBAR
// ============================================
const Navbar = ({ activeSection, onNavigate }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-logo slide-up">
        <h1 className="navbar-name">XENIA SNAPIRO</h1>
        <p className="navbar-tagline">
          Creative Director, Brand & Content Strategist<br />
          Berlin - Paris - Vienna - Munich
        </p>
      </div>

      <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>
        <span className={`hamburger ${menuOpen ? 'open' : ''}`}></span>
      </button>

      <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
        {NAV_LINKS.map((link, i) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            className={`navbar-link ${activeSection === link.id ? 'active' : ''}`}
            style={{ animationDelay: `${i * 0.1}s` }}
            onClick={(e) => {
              e.preventDefault();
              onNavigate(link.id);
              setMenuOpen(false);
            }}
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
};

// ============================================
// STORY CARD
// ============================================
const StoryCard = ({ item }) => {
  const [hovered, setHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className="story-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {!imageError ? (
        <img
          src={item.image}
          alt={item.title || 'Portfolio image'}
          loading="lazy"
          className="story-img"
          style={{ minHeight: item.height }}
          onError={() => setImageError(true)}
        />
      ) : (
        <div
          className="story-img placeholder"
          style={{
            minHeight: item.height,
            background: `linear-gradient(135deg, hsl(${item.id * 20}, 5%, ${20 + (item.id % 3) * 10}%), hsl(${item.id * 20}, 5%, ${10 + (item.id % 3) * 5}%))`,
          }}
        />
      )}

      <div className={`story-overlay ${hovered ? 'hovered' : ''}`}>
        {item.title && (
          <div className={`story-caption ${hovered ? 'visible' : ''}`}>
            <span className="story-subtitle">{item.subtitle}</span>
            <h3 className="story-title">{item.title}</h3>
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================
// PORTFOLIO COLUMN
// ============================================
const PortfolioColumn = ({ items, direction = 'up', speed = 30 }) => {
  const [isPaused, setIsPaused] = useState(false);
  const doubledItems = [...items, ...items];

  return (
    <div
      className="portfolio-column"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className={`portfolio-column-inner ${direction}`}
        style={{
          animationDuration: `${speed}s`,
          animationPlayState: isPaused ? 'paused' : 'running',
        }}
      >
        {doubledItems.map((item, index) => (
          <StoryCard key={`${item.id}-${index}`} item={item} />
        ))}
      </div>
    </div>
  );
};

// ============================================
// PORTFOLIO SECTION
// ============================================
const PortfolioSection = () => {
  return (
    <section id="portfolio" className="section section-portfolio">
      <PortfolioColumn items={PORTFOLIO_DATA.column1} direction="up" speed={35} />
      <PortfolioColumn items={PORTFOLIO_DATA.column2} direction="down" speed={40} />
      <PortfolioColumn items={PORTFOLIO_DATA.column3} direction="up" speed={32} />
      <PortfolioColumn items={PORTFOLIO_DATA.column4} direction="down" speed={38} />
    </section>
  );
};

// ============================================
// SERVICES SECTION
// ============================================
const ServicesSection = () => {
  const [vitaModalOpen, setVitaModalOpen] = useState(false);

  return (
    <section id="services" className="section section-services">
      <div className="services-grid">
        <div className="services-request">
          <h3 className="services-label">Request</h3>
          <button className="services-link" onClick={() => setVitaModalOpen(true)}>
            Vita
          </button>
        </div>

        <div className="services-focused">
          <h3 className="services-label">Focused on</h3>
          <div className="services-list">
            <span className="services-item">Fashion</span>
            <span className="services-item">Editorial</span>
            <span className="services-item">Portraits</span>
            <span className="services-item">Campaigns</span>
            <span className="services-item">Artist Portraits</span>
          </div>
        </div>

        <div className="services-cta">
          <h3 className="services-label">Services</h3>
          <div className="services-list">
            <span className="services-item">Photography</span>
            <span className="services-item">Creative Direction</span>
            <span className="services-item">Brand Strategy</span>
            <span className="services-item">Content Creation</span>
          </div>
        </div>

        <div className="services-email">
          <a href="mailto:info@xeniasnapiro.com" className="email-link">
            info@xeniasnapiro.com
          </a>
        </div>
      </div>

      {/* Vita Modal */}
      {vitaModalOpen && (
        <div className="vita-modal" onClick={() => setVitaModalOpen(false)}>
          <div className="vita-content" onClick={(e) => e.stopPropagation()}>
            <button className="vita-close" onClick={() => setVitaModalOpen(false)}>
              ✕
            </button>
            <h3>Request Vita</h3>
            <form className="vita-form">
              <input type="text" placeholder="Name" required />
              <input type="email" placeholder="Email" required />
              <textarea placeholder="Message" rows={4}></textarea>
              <button type="submit" className="button">Send Request</button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

// ============================================
// ABOUT SECTION
// ============================================
const AboutSection = () => {
  const [lightboxImage, setLightboxImage] = useState(null);

  return (
    <section id="about" className="section section-about">
      <div className="about-content">
        <h2 className="about-heading slide-up">About</h2>
        <p className="about-bio slide-up">
          Editorial photographer and creative director creating visual stories for fashion brands,
          artists and cultural magazines. Working with clients like Sony Music, C/O Magazine and
          Rick Owens. Based in Berlin, working internationally in Paris, Munich, and Vienna.
        </p>
        <p className="about-bio slide-up">
          With a background in fine arts from UdK Berlin and Universität für angewandte Kunst Wien,
          I bring a unique perspective to every project, blending artistic vision with commercial appeal.
        </p>
      </div>

      <div className="about-gallery">
        <div className="about-grid">
          {ABOUT_IMAGES.map((img) => (
            <div key={img.id} className="about-image-wrapper">
              <span className="about-label">{img.label}</span>
              <div
                className="about-image"
                style={{
                  background: `linear-gradient(135deg, hsl(${img.id * 40}, 10%, 30%), hsl(${img.id * 40}, 10%, 20%))`,
                }}
                onClick={() => setLightboxImage(img)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <div className="lightbox" onClick={() => setLightboxImage(null)}>
          <div
            className="lightbox-image"
            style={{
              background: `linear-gradient(135deg, hsl(${lightboxImage.id * 40}, 10%, 30%), hsl(${lightboxImage.id * 40}, 10%, 20%))`,
            }}
          />
        </div>
      )}
    </section>
  );
};

// ============================================
// CONTACT SECTION
// ============================================
const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In production, this would send to a backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="section section-contact">
      <div className="contact-heading-wrapper">
        <h2 className="contact-heading">CONTACT</h2>
      </div>

      <div className="contact-form-wrapper">
        <p className="contact-description">
          For inquiries about collaborations, bookings, or just to say hello.
        </p>

        {!submitted ? (
          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name"
              className="form-input"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="form-input"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <textarea
              placeholder="Message"
              className="form-textarea"
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
            />
            <button type="submit" className="button">Send</button>
          </form>
        ) : (
          <div className="form-success">
            <p>Thank you! Your message has been sent.</p>
          </div>
        )}

        <div className="social-links">
          <a href="https://instagram.com/xeniasnapiro" target="_blank" rel="noopener noreferrer" className="social-dot instagram">
            <span className="social-label">Instagram</span>
          </a>
          <a href="https://linkedin.com/in/xenia-snapiro" target="_blank" rel="noopener noreferrer" className="social-dot linkedin">
            <span className="social-label">LinkedIn</span>
          </a>
          <a href="https://pinterest.com/xeniasnapiro" target="_blank" rel="noopener noreferrer" className="social-dot pinterest">
            <span className="social-label">Pinterest</span>
          </a>
        </div>
      </div>
    </section>
  );
};

// ============================================
// MAIN APP
// ============================================
function App() {
  const [activeSection, setActiveSection] = useState('portfolio');
  const mapWrapperRef = useRef(null);

  const navigateTo = (sectionId) => {
    const sectionIndex = NAV_LINKS.findIndex((l) => l.id === sectionId);
    if (mapWrapperRef.current) {
      mapWrapperRef.current.scrollTo({
        left: sectionIndex * window.innerWidth,
        behavior: 'smooth',
      });
    }
    setActiveSection(sectionId);
  };

  // Track scroll position
  useEffect(() => {
    const wrapper = mapWrapperRef.current;
    if (!wrapper) return;

    const handleScroll = () => {
      const scrollLeft = wrapper.scrollLeft;
      const sectionWidth = window.innerWidth;
      const index = Math.round(scrollLeft / sectionWidth);
      const section = NAV_LINKS[index];
      if (section) {
        setActiveSection(section.id);
      }
    };

    wrapper.addEventListener('scroll', handleScroll, { passive: true });
    return () => wrapper.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="app">
      <CustomCursor />
      <Navbar activeSection={activeSection} onNavigate={navigateTo} />

      <div ref={mapWrapperRef} className="map-wrapper">
        <div className="sections-track">
          <PortfolioSection />
          <ServicesSection />
          <AboutSection />
          <ContactSection />
        </div>
      </div>
    </div>
  );
}

export default App;
