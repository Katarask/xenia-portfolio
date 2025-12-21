import { useState, useEffect, useRef, useCallback, memo } from 'react';
import { gsap } from 'gsap';
import './App.css';

// ============================================
// PORTFOLIO DATA
// ============================================
const PORTFOLIO_DATA = {
  column1: [
    { id: 1, type: 'image', src: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/6924982cc3cac3763929466f_1547785C-A471-4EB4-BDCF-FF780A6D1863.JPG', srcset: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/6924982cc3cac3763929466f_1547785C-A471-4EB4-BDCF-FF780A6D1863-p-500.jpg 500w, https://cdn.prod.website-files.com/6924982cc3cac37639294622/6924982cc3cac3763929466f_1547785C-A471-4EB4-BDCF-FF780A6D1863-p-800.jpg 800w', alt: 'Artist portrait Soap&Skin - Editorial photography for C/O Magazine Berlin', title: 'Soap&Skin', subtitle: 'Artist', caption: 'for C/O Magazine' },
    { id: 2, type: 'image', src: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/6924982cc3cac37639294689_15%203.JPG', alt: 'Portrait photography Berlin', title: '', subtitle: '' },
    { id: 3, type: 'image', src: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/6924982cc3cac3763929464f_B9D24BBF-0CB3-42F1-8E03-5BE311B9E597.avif', alt: 'Fashion designer Rick Owens portrait', title: 'Rick Owens', subtitle: 'Designer' },
    { id: 4, type: 'image', src: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/6924982cc3cac37639294653_064E2395-AA58-48F8-ADC5-939D2CE34E63.avif', alt: 'Music artist Soap&Skin - C/O Magazine', title: 'Soap&Skin', subtitle: 'Artist', caption: 'C/O Magazine' },
    { id: 5, type: 'image', src: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/69273068a6b7b82db826396f_Website.jpg', alt: 'Fashion portrait photography', title: '', subtitle: '' },
    { id: 6, type: 'video', vimeoId: '1137289960', poster: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/6924982cc3cac3763929466f_1547785C-A471-4EB4-BDCF-FF780A6D1863-p-500.jpg', title: 'Safira', subtitle: '', caption: 'Safira', aspect: 'portrait' },
  ],
  column2: [
    { id: 7, type: 'image', src: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/6924982cc3cac37639294643_1.avif', alt: 'Artist interview Eric Joham - C/O Magazine', title: 'Eric Joham', subtitle: 'Interview', caption: 'C/O Magazine' },
    { id: 8, type: 'image', src: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/6924982cc3cac3763929467b_Kuko%202%20tags-44.jpg', alt: 'Brand campaign Laura Gerte', title: 'Laura Gerte', subtitle: 'Brand', caption: 'Model: Oraina' },
    { id: 9, type: 'image', src: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/6924982cc3cac3763929467c_Kuko%202%20tags-42.jpg', alt: 'Fashion brand Laura Gerte - Lookbook', title: 'Laura Gerte', subtitle: 'Brand', caption: 'Model: Oraina' },
    { id: 10, type: 'image', src: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/6924982cc3cac3763929464d_14240002.avif', alt: 'Wales Bonner backstage', title: 'Wales Bonner', subtitle: 'Show Backstage' },
    { id: 11, type: 'video', vimeoId: '1145349173', poster: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/6924982cc3cac37639294643_1.avif', title: 'Ernst Lima', subtitle: 'Performance', caption: 'das weisse haus', aspect: 'portrait' },
  ],
  column3: [
    { id: 12, type: 'image', src: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/6924982cc3cac3763929468b_Kuko%202%20tags-51.jpg', alt: 'Bonnie Strange - Sony Music', title: 'Bonnie Strange', subtitle: 'Model, DJ', caption: 'for Spotify/ Sony Music' },
    { id: 13, type: 'image', src: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/69273457f6983e5f11cf2264_Website-10.jpg', alt: 'Brand campaign photography', title: '', subtitle: '' },
    { id: 14, type: 'image', src: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/6924982cc3cac3763929468a_Kuko%202%20tags-49.jpg', alt: 'DJ Bonnie Strange portrait', title: 'Bonnie Strange', subtitle: 'Model, DJ', caption: 'Sony Music' },
    { id: 15, type: 'image', src: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/6924982cc3cac37639294692_5..jpg', alt: 'Fashion editorial Das Deck', title: 'Das Deck', subtitle: 'Model', caption: 'for Martin Niklas Wieser' },
    { id: 16, type: 'video', vimeoId: '730555711', poster: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/6924982cc3cac3763929468b_Kuko%202%20tags-51.jpg', title: 'Mood Video', subtitle: 'Casting', caption: 'for Wales Bonner', aspect: 'landscape' },
  ],
  column4: [
    { id: 17, type: 'image', src: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/6924982cc3cac37639294697_IMG_3523.avif', alt: 'Wendy&Jim - C/O Magazine', title: 'Wendy&Jim', subtitle: 'Brand Owners', caption: 'C/O Magazine' },
    { id: 18, type: 'image', src: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/6924982cc3cac3763929465f_5557EDBC-AB28-454B-82B3-BFAA837285E0.avif', alt: 'Austrian Fashion Association Awards', title: 'AFA Awards', subtitle: 'Model', caption: 'Austrian Fashion Association' },
    { id: 19, type: 'image', src: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/69273068b8b50623bc4a9a42_Website-1.jpg', alt: 'Fashion photography Berlin', title: '', subtitle: '' },
    { id: 20, type: 'image', src: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/6924982cc3cac37639294641_00-253%203.avif', alt: 'Street fashion photography', title: '', subtitle: '' },
    { id: 21, type: 'image', src: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/6924982cc3cac3763929468c_20%202.JPG', alt: 'Portrait photography', title: '', subtitle: '' },
    { id: 22, type: 'video', vimeoId: '1137289577', poster: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/6924982cc3cac37639294697_IMG_3523.avif', title: '', subtitle: '', aspect: 'landscape' },
  ],
};

const ABOUT_IMAGES = [
  { id: 1, src: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/6927306804f16efa0650628e_Website-2.jpg', alt: 'Vienna street photography' },
  { id: 2, src: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/69273457b0146580d9418bc6_Website-4.jpg', alt: 'New York fashion editorial' },
  { id: 3, src: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/6924982cc3cac37639294681_IMG_9807.avif', alt: 'Creative direction portfolio' },
  { id: 4, src: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/69273068a6b7b82db826396f_Website.jpg', alt: 'Brand campaign photography' },
  { id: 5, src: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/69273068b8b50623bc4a9a42_Website-1.jpg', alt: 'Fashion editorial' },
  { id: 6, src: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/6935fe1fcf47d76c7fed7aee_Screenshot%202025-11-26%20at%2011.19.09.png', alt: 'Visual storytelling' },
];

// ============================================
// GSAP VERTICAL LOOP HELPER
// Official GreenSock helper for Safari-stable infinite scroll
// ============================================
function verticalLoop(items, config) {
  items = gsap.utils.toArray(items);
  config = config || {};
  
  let tl = gsap.timeline({
    repeat: config.repeat,
    paused: config.paused,
    defaults: { ease: "none" },
    onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100)
  });
  
  const length = items.length;
  const startY = items[0].offsetTop;
  const times = [];
  const heights = [];
  const yPercents = [];
  let curIndex = 0;
  const pixelsPerSecond = (config.speed || 1) * 100;
  const snap = config.snap === false ? v => v : gsap.utils.snap(config.snap || 1);
  
  let totalHeight;
  
  const populateHeights = () => {
    items.forEach((el, i) => {
      heights[i] = parseFloat(gsap.getProperty(el, "height", "px"));
      yPercents[i] = snap(parseFloat(gsap.getProperty(el, "y", "px")) / heights[i] * 100 + gsap.getProperty(el, "yPercent"));
    });
    gsap.set(items, { yPercent: i => yPercents[i] });
    totalHeight = items[length-1].offsetTop + yPercents[length-1] / 100 * heights[length-1] - startY + items[length-1].offsetHeight * gsap.getProperty(items[length-1], "scaleY") + (parseFloat(config.paddingBottom) || 0);
  };
  
  const populateTimeline = () => {
    tl.clear();
    for (let i = 0; i < length; i++) {
      const item = items[i];
      const curY = yPercents[i] / 100 * heights[i];
      const distanceToStart = item.offsetTop + curY - startY;
      const distanceToLoop = distanceToStart + heights[i] * gsap.getProperty(item, "scaleY");
      
      tl.to(item, { yPercent: snap((curY - distanceToLoop) / heights[i] * 100), duration: distanceToLoop / pixelsPerSecond }, 0)
        .fromTo(item, 
          { yPercent: snap((curY - distanceToLoop + totalHeight) / heights[i] * 100) }, 
          { yPercent: yPercents[i], duration: (curY - distanceToLoop + totalHeight - curY) / pixelsPerSecond, immediateRender: false }, 
          distanceToLoop / pixelsPerSecond
        );
      times[i] = distanceToStart / pixelsPerSecond;
    }
  };
  
  gsap.set(items, { y: 0 });
  populateHeights();
  populateTimeline();
  
  tl.progress(1, true).progress(0, true);
  
  if (config.reversed) {
    tl.vars.onReverseComplete();
    tl.reverse();
  }
  
  return tl;
}

// ============================================
// CUSTOM CURSOR (Memoized)
// ============================================
const CustomCursor = memo(() => {
  const dot1Ref = useRef(null);
  const dot2Ref = useRef(null);
  const [isLarger, setIsLarger] = useState(false);
  const [cursorText, setCursorText] = useState('VIEW');
  const mousePos = useRef({ x: -100, y: -100 });
  const dot1Pos = useRef({ x: -100, y: -100 });
  const dot2Pos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Skip on mobile
    if (window.innerWidth <= 767) return;

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      
      const target = e.target;
      const card = target.closest('.story-card, .video-card, .about_preview-image');
      const navLink = target.closest('.navbar_link');
      const socialDot = target.closest('.social-dot');
      const button = target.closest('.button, .services_link');
      
      if (card) {
        setIsLarger(true);
        setCursorText('VIEW');
      } else if (navLink) {
        setIsLarger(true);
        setCursorText(navLink.textContent.trim().toUpperCase());
      } else if (socialDot) {
        setIsLarger(true);
        setCursorText(socialDot.dataset.social?.toUpperCase() || 'SOCIAL');
      } else if (button) {
        setIsLarger(true);
        setCursorText('CLICK');
      } else {
        setIsLarger(false);
      }
    };

    const animate = () => {
      // Lerp for smooth follow
      dot1Pos.current.x += (mousePos.current.x - dot1Pos.current.x) * 0.35;
      dot1Pos.current.y += (mousePos.current.y - dot1Pos.current.y) * 0.35;
      dot2Pos.current.x += (mousePos.current.x - dot2Pos.current.x) * 0.15;
      dot2Pos.current.y += (mousePos.current.y - dot2Pos.current.y) * 0.15;
      
      if (dot1Ref.current) {
        dot1Ref.current.style.transform = `translate3d(${dot1Pos.current.x}px, ${dot1Pos.current.y}px, 0)`;
      }
      if (dot2Ref.current) {
        dot2Ref.current.style.transform = `translate3d(${dot2Pos.current.x}px, ${dot2Pos.current.y}px, 0)`;
      }
      
      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    const animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Don't render on mobile
  if (typeof window !== 'undefined' && window.innerWidth <= 767) return null;

  return (
    <div className="cursor">
      <div ref={dot1Ref} className={`cursor_dot1 ${isLarger ? 'is--larger' : ''}`} />
      <div ref={dot2Ref} className={`cursor_dot2 ${isLarger ? 'is--larger' : ''}`}>
        <div className="cursor_text">
          {cursorText.split('').map((char, i) => (
            <span 
              key={i} 
              style={{ 
                animationDelay: `${i * 0.04}s`,
                opacity: isLarger ? 1 : 0 
              }}
            >
              {char}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
});

// ============================================
// NAVBAR
// ============================================
const Navbar = memo(({ onNavigate }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = useCallback((e, sectionId) => {
    e.preventDefault();
    onNavigate(sectionId);
    setMenuOpen(false);
  }, [onNavigate]);

  return (
    <nav className="navbar_component">
      <div className="navbar_logo-wrapper">
        <h1 className="navbar_name">XENIA SNAPIRO</h1>
        <div className="navbar_tagline">
          Creative Director, Brand &amp; Content Strategist<br />
          Berlin - Paris - Vienna - Munich
        </div>
      </div>

      <div className="navbar_menu">
        {['portfolio', 'services', 'about', 'contact'].map(section => (
          <a 
            key={section}
            href={`#${section}`} 
            className="navbar_link" 
            onClick={(e) => handleNavClick(e, section)}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </a>
        ))}
      </div>

      <button 
        className={`menu-button ${menuOpen ? 'w--open' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <div className="icon w-icon-nav-menu"></div>
      </button>

      {menuOpen && (
        <div className="w-nav-overlay is-open">
          {['portfolio', 'services', 'about', 'contact'].map(section => (
            <a 
              key={section}
              href={`#${section}`} 
              className="navbar_link" 
              onClick={(e) => handleNavClick(e, section)}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
});

// ============================================
// LAZY IMAGE (Intersection Observer)
// ============================================
const LazyImage = memo(({ src, srcset, alt, className, onLoad }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    if (imgRef.current) observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <img
      ref={imgRef}
      src={isInView ? src : 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'}
      srcSet={isInView ? srcset : undefined}
      alt={alt}
      className={`${className} ${isLoaded ? 'is-loaded' : ''}`}
      loading="lazy"
      decoding="async"
      onLoad={() => { setIsLoaded(true); onLoad?.(); }}
    />
  );
});

// ============================================
// LAZY VIDEO (Hover to Load)
// ============================================
const LazyVideo = memo(({ vimeoId, poster, aspect, title, subtitle, caption }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const aspectClass = aspect === 'landscape' ? 'is-landscape' : 'is-portrait';

  return (
    <div 
      className={`video-card ${aspectClass}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => !isLoaded && setIsHovered(false)}
    >
      <div className="video-hover-wrapper">
        {/* Poster Image */}
        <img 
          src={poster} 
          alt={title || 'Video thumbnail'} 
          className={`video-poster ${isLoaded ? 'is-hidden' : ''}`}
          loading="lazy"
        />
        
        {/* Vimeo iframe - only loads on hover */}
        {isHovered && (
          <iframe
            src={`https://player.vimeo.com/video/${vimeoId}?badge=0&autopause=0&autoplay=1&muted=1&loop=1&background=1&dnt=1`}
            className={`video-iframe ${isLoaded ? 'is-loaded' : ''}`}
            frameBorder="0"
            allow="autoplay; fullscreen"
            title={title || 'Video'}
            onLoad={() => setIsLoaded(true)}
          />
        )}
      </div>
      
      <div className="story-overlay"></div>
      
      {(title || subtitle) && (
        <div className="story-caption">
          <div className="artist-name">
            {title && <h3 className="brand-title">{title}</h3>}
            {subtitle && <div className="text-block">{subtitle}</div>}
          </div>
          {caption && <div className="season-subtitle"><div>{caption}</div></div>}
        </div>
      )}
    </div>
  );
});

// ============================================
// STORY CARD
// ============================================
const StoryCard = memo(({ item }) => (
  <div className="story-card">
    <div className="story-overlay"></div>
    <LazyImage 
      src={item.src} 
      srcset={item.srcset}
      alt={item.alt || ''} 
      className="story-img"
    />
    {(item.title || item.subtitle) && (
      <div className="story-caption">
        <div className="artist-name">
          {item.title && <h3 className="brand-title">{item.title}</h3>}
          {item.subtitle && <div className="text-block">{item.subtitle}</div>}
        </div>
        {item.caption && <div className="season-subtitle"><div>{item.caption}</div></div>}
      </div>
    )}
  </div>
));

// ============================================
// PORTFOLIO COLUMN with GSAP
// ============================================
const PortfolioColumn = memo(({ items, columnId, direction, speed }) => {
  const columnRef = useRef(null);
  const timelineRef = useRef(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 767;

  useEffect(() => {
    if (isMobile) return;
    
    const column = columnRef.current;
    if (!column) return;

    // Wait for images to load
    const timer = setTimeout(() => {
      const cards = column.querySelectorAll('.story-card, .video-card');
      if (cards.length === 0) return;

      timelineRef.current = verticalLoop(cards, {
        repeat: -1,
        speed: speed,
        reversed: direction === 'up',
        paddingBottom: 0
      });
    }, 500);

    return () => {
      clearTimeout(timer);
      timelineRef.current?.kill();
    };
  }, [direction, speed, isMobile]);

  // Filter videos on mobile
  const displayItems = isMobile 
    ? items.filter(item => item.type !== 'video')
    : items;

  // Double items for infinite scroll
  const allItems = [...displayItems, ...displayItems];

  return (
    <div ref={columnRef} id={columnId} className="portfolio_column">
      {allItems.map((item, index) => (
        item.type === 'video' 
          ? <LazyVideo key={`${item.id}-${index}`} {...item} />
          : <StoryCard key={`${item.id}-${index}`} item={item} />
      ))}
    </div>
  );
});

// ============================================
// PORTFOLIO SECTION
// ============================================
const PortfolioSection = memo(() => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 767;
  
  const columns = [
    { items: PORTFOLIO_DATA.column1, id: 'column-1', direction: 'down', speed: 0.8 },
    { items: PORTFOLIO_DATA.column2, id: 'column-2', direction: 'up', speed: 0.9 },
    { items: PORTFOLIO_DATA.column3, id: 'column-3', direction: 'down', speed: 0.8 },
    { items: PORTFOLIO_DATA.column4, id: 'column-4', direction: 'up', speed: 0.9 },
  ];

  // On mobile, only show 2 columns and merge content
  const displayColumns = isMobile ? columns.slice(0, 2) : columns;

  return (
    <section id="portfolio" className="section_portfolio">
      {displayColumns.map((col, i) => (
        <PortfolioColumn 
          key={col.id}
          items={isMobile && i < 2 
            ? [...columns[i].items, ...columns[i + 2].items].filter(item => item.type !== 'video')
            : col.items
          }
          columnId={col.id}
          direction={col.direction}
          speed={isMobile ? 0.6 : col.speed}
        />
      ))}
    </section>
  );
});

// ============================================
// SERVICES SECTION
// ============================================
const ServicesSection = memo(({ onVitaClick }) => (
  <section id="services" className="section_services">
    <div className="service_request">
      <div className="services_label">Request</div>
    </div>
    
    <div className="services_content">
      <div className="services_links">
        <button className="services_link" onClick={onVitaClick}>VITA</button>
        <a href="#portfolio" className="services_link">Portfolio</a>
      </div>
    </div>
    
    <div className="service_focused_on">
      <div className="services_label">Focused on</div>
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
      <div className="services_list-item">
        Social Media<br />
        Content strategy<br />
        Campaign concepts
      </div>
    </div>
    
    <div className="services_cta-wrapper">
      <div className="services_label">Contact</div>
    </div>
    
    <div className="services_email">
      <a href="mailto:info@xeniasnapiro.com" className="services_link">
        info@xeniasnapiro.com
      </a>
    </div>
  </section>
));

// ============================================
// ABOUT SECTION with Lightbox
// ============================================
const AboutSection = memo(() => {
  const [lightboxSrc, setLightboxSrc] = useState(null);

  return (
    <section id="about" className="section_about">
      <div className="about_text-div">
        <h2 className="about_heading">Fashion Photographer &amp; Creative Director</h2>
        <p className="about_bio">
          Based in Berlin. Working across Europe — Berlin, Munich, Vienna, Paris.<br /><br />
          I create visual stories for fashion brands, artists, and cultural publications — from editorial shoots to full campaign development.<br /><br />
          With 5+ years in fashion photography and creative direction, I've worked with clients including Sony Music, C/O Magazine, Rick Owens, and the Austrian Fashion Association. My approach combines editorial photography with strategic brand thinking — shaping identities, producing campaigns, and leading projects from concept to execution.<br /><br />
          I shoot lookbooks, brand campaigns, artist portraits, and editorial content for fashion and lifestyle clients across Germany, Austria, and France.<br /><br />
          Background: Marketing &amp; PR, Visual Communication (UdK Berlin), Cross-Disciplinary Strategies (die Angewandte), Luxury Marketing (TUM).
        </p>
      </div>
      
      <div className="about_preview-grid">
        {ABOUT_IMAGES.map((img, index) => (
          <div key={img.id} className="about_preview-item">
            <LazyImage 
              src={img.src} 
              alt={img.alt}
              className="about_preview-image"
              onMouseEnter={() => setLightboxSrc(img.src)}
              onMouseLeave={() => setLightboxSrc(null)}
            />
            <div className="about_preview-label">{String(index + 1).padStart(2, '0')}</div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxSrc && (
        <div className="lightbox-overlay">
          <img src={lightboxSrc} alt="" className="lightbox-image" />
        </div>
      )}
    </section>
  );
});

// ============================================
// CONTACT SECTION
// ============================================
const ContactSection = memo(() => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    
    // Here you would add your form submission logic
    // For now, just simulate success
    await new Promise(r => setTimeout(r, 1000));
    setStatus('success');
    setFormData({ name: '', email: '', message: '' });
    
    setTimeout(() => setStatus('idle'), 3000);
  };

  const socialLinks = [
    { name: 'Instagram', url: 'https://www.instagram.com/xeniasnapiro/', color: '#e16d41' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/xenia-snapiro/', color: '#1a70ab' },
    { name: 'Facebook', url: 'https://www.facebook.com/k.snapiro/', color: '#1877f2' },
    { name: 'Pinterest', url: 'https://es.pinterest.com/xeniasnapiro/', color: '#b40022' },
  ];

  return (
    <section id="contact" className="section_contact">
      <div className="contact_heading-wrapper">
        <h2 className="contact_heading">LEAVE&nbsp;YOUR<br />CONTACT&nbsp;BELOW</h2>
      </div>
      
      <div className="contact_info-wrapper">
        <div className="contact_content">
          <h3 className="contact_subheading">Contact Us</h3>
        </div>
        
        <div className="contact_text-wrapper">
          <p className="contact_description">
            Interested in working together? Whether you have a project in mind, need creative direction
            or want to discuss a collaboration — reach out. I'll get back to you as soon as possible.
          </p>
          
          <div className="social-dots-wrapper">
            {socialLinks.map(social => (
              <a 
                key={social.name}
                data-social={social.name}
                href={social.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`social-dot is-${social.name.toLowerCase()}`}
                style={{ '--social-color': social.color }}
              >
                <span className="social-label">{social.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
      
      <div className="contact_form-wrapper">
        {status === 'success' ? (
          <div className="form-success">
            Thank you! Your message has been sent.
          </div>
        ) : (
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
            <button type="submit" className="button" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending...' : 'Submit'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
});

// ============================================
// VITA MODAL
// ============================================
const VitaModal = memo(({ isOpen, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 500);
  }, [onClose]);

  useEffect(() => {
    const handleEsc = (e) => e.key === 'Escape' && handleClose();
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  return (
    <div 
      className={`vita-modal ${isClosing ? 'is-closing' : ''}`} 
      onClick={handleClose}
    >
      <div className="vita-content" onClick={(e) => e.stopPropagation()}>
        <button className="vita-close" onClick={handleClose}>
          {isClosing ? '♥' : '✕'}
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
  );
});

// ============================================
// MAIN APP
// ============================================
function App() {
  const mapWrapperRef = useRef(null);
  const [vitaOpen, setVitaOpen] = useState(false);

  const navigateTo = useCallback((sectionId) => {
    const section = document.getElementById(sectionId);
    if (section && mapWrapperRef.current) {
      gsap.to(mapWrapperRef.current, {
        scrollLeft: section.offsetLeft,
        duration: 0.8,
        ease: 'power2.inOut'
      });
    }
  }, []);

  // Tab title animation
  useEffect(() => {
    let interval;
    const titles = ["Xenia Snapiro", "Creative Director", "Photographer", "Berlin", "Paris"];
    let i = 0;

    const handleVisibility = () => {
      if (document.hidden) {
        interval = setInterval(() => {
          document.title = titles[i++ % titles.length];
        }, 2000);
      } else {
        clearInterval(interval);
        document.title = "Xenia Snapiro | Fashion Photographer & Creative Director";
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="app">
      <CustomCursor />
      <Navbar onNavigate={navigateTo} />
      
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
