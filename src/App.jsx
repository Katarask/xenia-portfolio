import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import './App.css';


// GSAP Vertical Loop Helper (Safari-compatible)
function verticalLoop(items, config) {
  config = config || {};
  let tl = gsap.timeline({ repeat: config.repeat, paused: config.paused, defaults: { ease: "none" }, onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100) });
  let length = items.length;
  if (length === 0) return tl;
  let startY = items[0].offsetTop, times = [], heights = [], yPercents = [];
  let pixelsPerSecond = (config.speed || 1) * 100;
  let snap = config.snap === false ? v => v : gsap.utils.snap(config.snap || 1);
  gsap.set(items, { yPercent: (i, el) => { let h = heights[i] = parseFloat(gsap.getProperty(el, "height", "px")); yPercents[i] = snap(parseFloat(gsap.getProperty(el, "y", "px")) / h * 100 + gsap.getProperty(el, "yPercent")); return yPercents[i]; } });
  gsap.set(items, { y: 0 });
  let totalHeight = items[length - 1].offsetTop + yPercents[length - 1] / 100 * heights[length - 1] - startY + items[length - 1].offsetHeight * gsap.getProperty(items[length - 1], "scaleY") + (parseFloat(config.paddingBottom) || 0);
  for (let i = 0; i < length; i++) { let item = items[i], curY = yPercents[i] / 100 * heights[i], distanceToStart = item.offsetTop + curY - startY, distanceToLoop = distanceToStart + heights[i] * gsap.getProperty(item, "scaleY"); tl.to(item, { yPercent: snap((curY - distanceToLoop) / heights[i] * 100), duration: distanceToLoop / pixelsPerSecond }, 0).fromTo(item, { yPercent: snap((curY - distanceToLoop + totalHeight) / heights[i] * 100) }, { yPercent: yPercents[i], duration: (curY - distanceToLoop + totalHeight - curY) / pixelsPerSecond, immediateRender: false }, distanceToLoop / pixelsPerSecond).add("label" + i, distanceToStart / pixelsPerSecond); times[i] = distanceToStart / pixelsPerSecond; }
  tl.progress(1, true).progress(0, true);
  if (config.reversed) { tl.vars.onReverseComplete(); tl.reverse(); }
  return tl;
}

// Hook for mobile detection
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth <= 767 : false);
  useEffect(() => { const handleResize = () => setIsMobile(window.innerWidth <= 767); window.addEventListener('resize', handleResize); return () => window.removeEventListener('resize', handleResize); }, []);
  return isMobile;
};

// ============================================
// PORTFOLIO DATA - Original from Webflow
// ============================================
const PORTFOLIO_DATA = {
  column1: [
    { 
      id: 1, 
      type: 'image',
      src: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/6924982cc3cac3763929466f_1547785C-A471-4EB4-BDCF-FF780A6D1863.JPG',
      srcset: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/6924982cc3cac3763929466f_1547785C-A471-4EB4-BDCF-FF780A6D1863-p-500.jpg 500w, https://cdn.prod.website-files.com/6924982cc3cac37639294622/6924982cc3cac3763929466f_1547785C-A471-4EB4-BDCF-FF780A6D1863-p-800.jpg 800w, https://cdn.prod.website-files.com/6924982cc3cac37639294622/6924982cc3cac3763929466f_1547785C-A471-4EB4-BDCF-FF780A6D1863-p-1080.jpg 1080w, https://cdn.prod.website-files.com/6924982cc3cac37639294622/6924982cc3cac3763929466f_1547785C-A471-4EB4-BDCF-FF780A6D1863.JPG 1440w',
      alt: 'Artist portrait Soap&Skin - Editorial photography for C/O Magazine Berlin',
      title: 'Soap&Skin',
      subtitle: 'Artist',
      caption: 'for C/O Magazine'
    },
    { 
      id: 2, 
      type: 'image',
      src: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/6924982cc3cac37639294689_15%203.JPG',
      alt: 'Portrait photography Berlin - Editorial modefotografie',
      title: '',
      subtitle: ''
    },
    { 
      id: 3, 
      type: 'image',
      src: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/6924982cc3cac3763929464f_B9D24BBF-0CB3-42F1-8E03-5BE311B9E597.avif',
      alt: 'Fashion designer Rick Owens portrait - Modefotografie Berlin',
      title: 'Rick Owens',
      subtitle: 'Designer'
    },
    { 
      id: 4, 
      type: 'image',
      src: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/6924982cc3cac37639294653_064E2395-AA58-48F8-ADC5-939D2CE34E63.avif',
      alt: 'Music artist Soap&Skin - Editorial portrait C/O Magazine Berlin',
      title: 'Soap&Skin',
      subtitle: 'Artist',
      caption: 'C/O Magazine'
    },
    { 
      id: 5, 
      type: 'image',
      src: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/69273068a6b7b82db826396f_Website.jpg',
      alt: 'Fashion portrait photography - Editorial Berlin',
      title: '',
      subtitle: ''
    },
    { 
      id: 6, 
      type: 'video',
      vimeoId: '1137289960',
      title: 'Safira',
      subtitle: '',
      caption: 'Safira',
      aspect: 'portrait'
    },
  ],
  column2: [
    { 
      id: 7, 
      type: 'image',
      src: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/6924982cc3cac37639294643_1.avif',
      alt: 'Artist interview portrait Eric Joham - Editorial photography C/O Magazine',
      title: 'Eric Joham',
      subtitle: 'Interview',
      caption: 'C/O Magazine'
    },
    { 
      id: 8, 
      type: 'image',
      src: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/6924982cc3cac3763929467b_Kuko%202%20tags-44.jpg',
      alt: 'Brand campaign Laura Gerte - Fashion lookbook photography Berlin',
      title: 'Laura Gerte',
      subtitle: 'Brand',
      caption: 'Model: Oraina'
    },
    { 
      id: 9, 
      type: 'image',
      src: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/6924982cc3cac3763929467c_Kuko%202%20tags-42.jpg',
      alt: 'Fashion brand Laura Gerte - Lookbook photography Model Oraina Berlin',
      title: 'Laura Gerte',
      subtitle: 'Brand',
      caption: 'Model: Oraina'
    },
    { 
      id: 10, 
      type: 'image',
      src: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/6924982cc3cac3763929464d_14240002.avif',
      alt: 'Fashion week backstage Wales Bonner - Editorial photography Berlin',
      title: 'Wales Bonner',
      subtitle: 'Show Backstage'
    },
    { 
      id: 11, 
      type: 'video',
      vimeoId: '1145349173',
      title: 'Ernst Lima',
      subtitle: 'Performance',
      caption: 'das weisse haus',
      aspect: 'portrait'
    },
  ],
  column3: [
    { 
      id: 12, 
      type: 'image',
      src: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/6924982cc3cac3763929468b_Kuko%202%20tags-51.jpg',
      alt: 'Music artist Bonnie Strange - Campaign photography Spotify Sony Music',
      title: 'Bonnie Strange',
      subtitle: 'Model, DJ',
      caption: 'for Spotify/ Sony Music'
    },
    { 
      id: 13, 
      type: 'image',
      src: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/69273457f6983e5f11cf2264_Website-10.jpg',
      alt: 'Brand campaign photography - Fashion editorial Berlin',
      title: '',
      subtitle: ''
    },
    { 
      id: 14, 
      type: 'image',
      src: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/6924982cc3cac3763929468a_Kuko%202%20tags-49.jpg',
      alt: 'DJ Bonnie Strange portrait - Fashion photography Sony Music Berlin',
      title: 'Bonnie Strange',
      subtitle: 'Model, DJ',
      caption: 'Sony Music'
    },
    { 
      id: 15, 
      type: 'image',
      src: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/6924982cc3cac37639294692_5..jpg',
      alt: 'Fashion editorial Das Deck - Lookbook photography Martin Niklas Wieser',
      title: 'Das Deck',
      subtitle: 'Model',
      caption: 'for Martin Niklas Wieser'
    },
    { 
      id: 16, 
      type: 'video',
      vimeoId: '730555711',
      title: 'Mood Video',
      subtitle: 'Casting',
      caption: 'for the show under Wales Bonner direction',
      aspect: 'landscape'
    },
  ],
  column4: [
    { 
      id: 17, 
      type: 'image',
      src: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/6924982cc3cac37639294697_IMG_3523.avif',
      alt: 'Fashion brand founders Wendy&Jim - Editorial portrait C/O Magazine',
      title: 'Wendy&Jim',
      subtitle: 'Brand Owners',
      caption: 'C/O Magazine'
    },
    { 
      id: 18, 
      type: 'image',
      src: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/6924982cc3cac3763929465f_5557EDBC-AB28-454B-82B3-BFAA837285E0.avif',
      alt: 'Austrian Fashion Association Awards - Event photography Vienna',
      title: 'AFA Awards',
      subtitle: 'Model',
      caption: 'Austrian Fashion Association'
    },
    { 
      id: 19, 
      type: 'image',
      src: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/69273068b8b50623bc4a9a42_Website-1.jpg',
      alt: 'Fashion photography Berlin - Creative direction portfolio',
      title: '',
      subtitle: ''
    },
    { 
      id: 20, 
      type: 'image',
      src: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/6924982cc3cac37639294641_00-253%203.avif',
      alt: 'Street fashion photography - Editorial modefotografie Berlin',
      title: '',
      subtitle: ''
    },
    { 
      id: 21, 
      type: 'image',
      src: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/6924982cc3cac3763929468c_20%202.JPG',
      alt: 'Portrait photography - Fashion editorial Berlin',
      title: '',
      subtitle: ''
    },
    { 
      id: 22, 
      type: 'video',
      vimeoId: '1137289577',
      title: '',
      subtitle: '',
      aspect: 'landscape'
    },
  ],
};

const ABOUT_IMAGES = [
  { id: 1, src: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/6927306804f16efa0650628e_Website-2.jpg', alt: 'Vienna street photography by Xenia Snapiro' },
  { id: 2, src: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/69273457b0146580d9418bc6_Website-4.jpg', alt: 'New York fashion editorial photography' },
  { id: 3, src: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/6924982cc3cac37639294681_IMG_9807.avif', alt: 'Creative direction portfolio work' },
  { id: 4, src: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/69273068a6b7b82db826396f_Website.jpg', alt: 'Brand campaign photography' },
  { id: 5, src: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/69273068b8b50623bc4a9a42_Website-1.jpg', alt: 'Fashion editorial and art direction' },
  { id: 6, src: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/6935fe1fcf47d76c7fed7aee_Screenshot%202025-11-26%20at%2011.19.09.png', alt: 'Visual storytelling and content creation' },
];

// ============================================
// CUSTOM CURSOR
// ============================================
const CustomCursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isLarger, setIsLarger] = useState(false);
  const [text, setText] = useState('VIEW');

  useEffect(() => {
    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    const checkHover = (e) => {
      const card = e.target.closest('.story-card, .video-card, .about_preview-image');
      if (card) {
        setIsLarger(true);
      } else {
        setIsLarger(false);
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
    <div className="cursor">
      <div 
        className={`cursor_dot1 ${isLarger ? 'is--larger' : ''}`}
        style={{ transform: `translate3d(${pos.x}px, ${pos.y}px, 0px)` }}
      />
      <div 
        className={`cursor_dot2 ${isLarger ? 'is--larger' : ''}`}
        style={{ transform: `translate3d(${pos.x}px, ${pos.y}px, 0px)` }}
      >
        <div className="cursor_text">
          {text.split('').map((char, i) => (
            <span key={i} style={{ 
              display: 'inline-block',
              opacity: isLarger ? 1 : 0,
              transform: isLarger ? 'translateY(0)' : 'translateY(10px)',
              animation: isLarger ? `staggerIn 0.3s ease ${i * 0.04}s forwards` : 'none'
            }}>{char}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================
// NAVBAR
// ============================================
const Navbar = ({ onNavigate, activeSection }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const handleNavClick = (e, sectionId) => { e.preventDefault(); onNavigate(sectionId); setMenuOpen(false); };

  return (
    <nav className="navbar_component">
      <div className="navbar_logo-wrapper">
        <h1 className="navbar_name">XENIA SNAPIRO</h1>
        <div className="navbar_tagline">Creative Director, Brand & Content Strategist<br/>Berlin - Paris - Vienna - Munich</div>
      </div>
      {!isMobile && (
        <div className="navbar_menu">
          {['portfolio', 'services', 'about', 'contact'].map((section) => (
            <a key={section} href={`#${section}`} className={`navbar_link ${activeSection === section ? 'w--current' : ''}`} onClick={(e) => handleNavClick(e, section)}>
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </a>
          ))}
        </div>
      )}
      {isMobile && (
        <>
          <button className={`menu-button ${menuOpen ? 'is-open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="menu">
            <span className="hamburger-line line-1"></span>
            <span className="hamburger-line line-2"></span>
            <span className="hamburger-line line-3"></span>
          </button>
          <div className={`mobile-menu ${menuOpen ? 'is-open' : ''}`}>
            {['portfolio', 'services', 'about', 'contact'].map((section) => (
              <a key={section} href={`#${section}`} className="mobile-menu_link" onClick={(e) => handleNavClick(e, section)}>{section.toUpperCase()}</a>
            ))}
          </div>
        </>
      )}
    </nav>
  );
};

// ============================================
// STORY CARD
// ============================================
const StoryCard = ({ item }) => {
  return (
    <div className="story-card">
      <div className="story-overlay"></div>
      <img 
        src={item.src} 
        srcSet={item.srcset}
        alt={item.alt || ''} 
        loading="lazy"
        className="story-img"
      />
      {(item.title || item.subtitle) && (
        <div className="story-caption">
          <div className="artist-name">
            {item.title && <h3 className="brand-title">{item.title}</h3>}
            {item.subtitle && <div className="text-block">{item.subtitle}</div>}
          </div>
          {item.caption && (
            <div className="season-subtitle">
              <div>{item.caption}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ============================================
// VIDEO CARD
// ============================================
const VideoCard = ({ item }) => {
  const aspectClass = item.aspect === 'landscape' ? 'is-landscape' : 'is-portrait';
  
  return (
    <div className={`video-card ${aspectClass}`}>
      <div className="w-embed w-iframe">
        <div className="video-inner">
          <iframe 
            src={`https://player.vimeo.com/video/${item.vimeoId}?badge=0&autopause=0&autoplay=1&muted=1&loop=1&background=1&dnt=1`}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            title={item.title || 'Video'}
          />
        </div>
      </div>
      <div className="story-overlay"></div>
      {(item.title || item.subtitle) && (
        <div className="story-caption">
          <div className="artist-name">
            {item.title && <h3 className="brand-title">{item.title}</h3>}
            {item.subtitle && <div className="text-block">{item.subtitle}</div>}
          </div>
          {item.caption && (
            <div className="season-subtitle">
              <div>{item.caption}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ============================================
// PORTFOLIO COLUMN with Auto-Scroll
// ============================================
const PortfolioColumn = ({ items, direction = 'up', speed = 0.8 }) => {
  const columnRef = useRef(null);
  const wrapperRef = useRef(null);
  const loopRef = useRef(null);
  const isMobile = useIsMobile();
  const displayItems = isMobile ? items.filter(item => item.type !== 'video') : items;

  useLayoutEffect(() => {
    if (!wrapperRef.current || displayItems.length === 0) return;
    const cards = gsap.utils.toArray(wrapperRef.current.children);
    if (cards.length === 0) return;

    loopRef.current = verticalLoop(cards, { speed, repeat: -1, reversed: direction === 'up', paddingBottom: 16 });

    if (!isMobile && columnRef.current) {
      const col = columnRef.current;
      const pause = () => loopRef.current?.pause();
      const play = () => loopRef.current?.play();
      col.addEventListener('mouseenter', pause);
      col.addEventListener('mouseleave', play);
      return () => { col.removeEventListener('mouseenter', pause); col.removeEventListener('mouseleave', play); loopRef.current?.kill(); };
    }
    return () => loopRef.current?.kill();
  }, [direction, speed, isMobile, displayItems.length]);

  return (
    <div ref={columnRef} className="portfolio_column">
      <div ref={wrapperRef} className="portfolio_column-inner">
        {[...displayItems, ...displayItems].map((item, index) => (
          item.type === 'video' ? <VideoCard key={`${item.id}-${index}`} item={item} /> : <StoryCard key={`${item.id}-${index}`} item={item} />
        ))}
      </div>
    </div>
  );
};

// ============================================
// PORTFOLIO SECTION
// ============================================
const PortfolioSection = () => {
  const isMobile = useIsMobile();
  return (
    <section id="portfolio" className="section_portfolio">
      <PortfolioColumn items={PORTFOLIO_DATA.column1} direction="down" speed={0.8} />
      <PortfolioColumn items={PORTFOLIO_DATA.column2} direction="up" speed={0.9} />
      {!isMobile && (
        <>
          <PortfolioColumn items={PORTFOLIO_DATA.column3} direction="down" speed={0.8} />
          <PortfolioColumn items={PORTFOLIO_DATA.column4} direction="up" speed={0.9} />
        </>
      )}
    </section>
  );
};

// ============================================
// SERVICES SECTION
// ============================================
const ServicesSection = ({ onVitaClick }) => {
  return (
    <main id="services" className="section_services">
      <div className="service_request">
        <div className="services_label">Request</div>
      </div>
      
      <div className="services_content">
        <div className="services_links">
          <a href="#" className="link-block-2" onClick={(e) => { e.preventDefault(); onVitaClick(); }}>
            <div className="services_link">VITA</div>
          </a>
          <a href="#portfolio" className="link-block-2">
            <div className="services_link">Portfolio</div>
          </a>
        </div>
      </div>
      
      <div className="service_focused_on">
        <div className="services_label is-mobile-l">Focused on</div>
      </div>
      
      <div className="services_services">
        <div className="services_list-item">
          Trend &amp; cultural analysis<br />
          Full-service content delivery<br />
          Performance optimization
        </div>
        <div className="services_list-item">
          Creative direction<br />
          Brand storytelling<br />
          Photo/video production
        </div>
        <div className="services_list-item is-mobile">
          Social Media<br />
          Content strategy<br />
          Campaign concepts
        </div>
      </div>
      
      <div className="services_cta-wrapper">
        <div className="services_label">Contact</div>
      </div>
      
      <div className="services_email">
        <a href="mailto:info@xeniasnapiro.com" className="link-block">
          <div className="services_value">info@xeniasnapiro.com</div>
        </a>
      </div>
    </main>
  );
};

// ============================================
// ABOUT SECTION
// ============================================
const AboutSection = () => {
  return (
    <main id="about" className="section_about" aria-label="About Section" role="region">
      <div className="about_text-div">
        <h2 className="about_heading slide-up is-visible">Fashion Photographer &amp; Creative Director</h2>
        <div className="about_bio slide-up is-visible">
          Based in Berlin. Working across Europe — Berlin, Munich, Vienna, Paris.<br />
          I create visual stories for fashion brands, artists, and cultural publications — from editorial shoots to full campaign development.<br /><br />
          With 5+ years in fashion photography and creative direction, I've worked with clients including Sony Music, C/O Magazine, Rick Owens, and the Austrian Fashion Association. My approach combines editorial photography with strategic brand thinking — shaping identities, producing campaigns, and leading projects from concept to execution.<br /><br />
          I shoot lookbooks, brand campaigns, artist portraits, and editorial content for fashion and lifestyle clients across Germany, Austria, and France.<br />
          Background: Marketing &amp; PR, Visual Communication (UdK Berlin), Cross-Disciplinary Strategies (die Angewandte), Luxury Marketing (TUM).
        </div>
      </div>
      
      <div className="about_preview-grid">
        {ABOUT_IMAGES.map((img, index) => (
          <React.Fragment key={img.id}>
            <img 
              src={img.src} 
              alt={img.alt}
              loading="lazy"
              className="about_preview-image"
            />
            <div className="about_preview-label">{String(index + 1).padStart(2, '0')}</div>
          </React.Fragment>
        ))}
      </div>
    </main>
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
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <main id="contact" className="section_contact" aria-label="Contact Section" role="region">
      <div className="contact_heading-wrapper">
        <h2 className="contact_heading">LEAVE&nbsp;YOUR<br />CONTACT&nbsp;BELOW</h2>
      </div>
      
      <div className="contact_info-wrapper">
        <div className="contact_content">
          <h3 className="contact_subheading slide-up is-visible">Contact Us</h3>
        </div>
        
        <div className="contact_text-wrapper">
          <div className="contact_description slide-up is-visible">
            Interested in working together? Whether you have a project in mind, need creative direction<br />
            or want to discuss a collaboration — reach out. I'll get back to you as soon as possible.
          </div>
          
          <div className="social-dots-wrapper">
            <a data-social="Instagram" href="https://www.instagram.com/xeniasnapiro/" target="_blank" rel="noopener noreferrer" className="social-dot is-instagram">
              <div className="social-label">Instagram</div>
            </a>
            <a data-social="LinkedIn" href="https://www.linkedin.com/in/xenia-snapiro/" target="_blank" rel="noopener noreferrer" className="social-dot is-linkedin">
              <div className="social-label">LinkedIn</div>
            </a>
            <a data-social="Facebook" href="https://www.facebook.com/k.snapiro/" target="_blank" rel="noopener noreferrer" className="social-dot is-facebook">
              <div className="social-label">Facebook</div>
            </a>
            <a data-social="Pinterest" href="https://es.pinterest.com/xeniasnapiro/" target="_blank" rel="noopener noreferrer" className="social-dot is-pinterest">
              <div className="social-label">Pinterest</div>
            </a>
          </div>
        </div>
      </div>
      
      <div className="contact_form-wrapper">
        {!submitted ? (
          <form className="contact_form" onSubmit={handleSubmit}>
            <input 
              className="form_input"
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
            <input 
              className="form_input"
              type="email"
              placeholder="E-Mail"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
            <textarea 
              className="form_textarea"
              placeholder="Leave your Message here"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              required
            />
            <button type="submit" className="button">Submit</button>
          </form>
        ) : (
          <div className="w-form-done" style={{ display: 'block' }}>
            <div>Thank you! Your submission has been received!</div>
          </div>
        )}
      </div>
    </main>
  );
};

// ============================================
// VITA MODAL
// ============================================
const VitaModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="vita-modal" onClick={onClose}>
      <div className="vita-content" onClick={(e) => e.stopPropagation()}>
        <button className="vita-close" onClick={onClose}>✕</button>
        <h3>Request Vita</h3>
        <form className="vita-form">
          <input type="text" placeholder="Name" required />
          <input type="email" placeholder="Email" required />
          <textarea placeholder="Message" rows={4}></textarea>
          <button type="submit" className="button">Send Request</button>
        </form>
      </div>
    </div>
  );
};

// ============================================
// MAIN APP
// ============================================
function App() {
  const mapWrapperRef = useRef(null);
  const [vitaOpen, setVitaOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('portfolio');
  const isMobile = useIsMobile();

  const navigateTo = (sectionId) => {
    setActiveSection(sectionId);
    if (isMobile) {
      const section = document.getElementById(sectionId);
      if (section) section.scrollIntoView({ behavior: 'smooth' });
    } else {
      const sections = ['portfolio', 'services', 'about', 'contact'];
      const index = sections.indexOf(sectionId);
      if (mapWrapperRef.current && index !== -1) {
        gsap.to(mapWrapperRef.current, { scrollLeft: index * window.innerWidth, duration: 0.8, ease: 'power2.inOut' });
      }
    }
  };

  useEffect(() => {
    const wrapper = mapWrapperRef.current;
    if (!wrapper || isMobile) return;
    const handleScroll = () => {
      const scrollPos = wrapper.scrollLeft;
      const sectionWidth = window.innerWidth;
      const index = Math.round(scrollPos / sectionWidth);
      const sections = ['portfolio', 'services', 'about', 'contact'];
      setActiveSection(sections[index] || 'portfolio');
    };
    wrapper.addEventListener('scroll', handleScroll);
    return () => wrapper.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) return;
    const wrapper = mapWrapperRef.current;
    if (!wrapper) return;
    const preventScroll = (e) => { if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) e.preventDefault(); };
    wrapper.addEventListener('wheel', preventScroll, { passive: false });
    return () => wrapper.removeEventListener('wheel', preventScroll);
  }, [isMobile]);

  return (
    <div className={`app ${isMobile ? 'is-mobile' : 'is-desktop'}`}>
      <CustomCursor />
      <Navbar onNavigate={navigateTo} activeSection={activeSection} />
      <div ref={mapWrapperRef} className="map-wrapper">
        <div className="sections-track">
          <PortfolioSection />
          <ServicesSection onVitaClick={() => setVitaOpen(true)} />
          <AboutSection />
          <ContactSection />
        </div>
      </div>
      <VitaModal isOpen={vitaOpen} onClose={() => setVitaOpen(false)} />
    </div>
  );
}

export default App;
