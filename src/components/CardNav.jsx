import { useLayoutEffect, useRef, useState, memo } from 'react';
import { gsap } from 'gsap';

// ============================================
// CARD NAV - Expanding Card Navigation
// ============================================
const CardNav = memo(({ onNavigate, onVitaClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);
  const cardsRef = useRef([]);
  const tlRef = useRef(null);

  // Navigation items with sections and links
  const items = [
    {
      label: 'Portfolio',
      section: 'portfolio',
      bgImage: '/images/portfolio/soap-skin.webp',
      links: []
    },
    {
      label: 'Services',
      section: 'services',
      bgImage: '/images/portfolio/rick-owens.webp',
      links: [
        { label: 'Vita', action: 'vita' }
      ]
    },
    {
      label: 'About',
      section: 'about',
      bgImage: '/images/portfolio/chandelier.webp',
      links: []
    },
    {
      label: 'Contact',
      section: 'contact',
      bgImage: '/images/portfolio/black-sand.webp',
      links: [
        { label: 'Instagram', href: 'https://www.instagram.com/xeniasnapiro/' },
        { label: 'LinkedIn', href: 'https://www.linkedin.com/in/xenia-snapiro/' },
        { label: 'Email', href: 'mailto:hello@xeniasnapiro.com' }
      ]
    }
  ];

  const calculateHeight = () => {
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    if (isMobile) {
      return Math.min(window.innerHeight * 0.7, 400);
    }
    return 280;
  };

  const createTimeline = () => {
    const navEl = navRef.current;
    if (!navEl) return null;

    gsap.set(navEl, { height: 60, overflow: 'hidden' });
    gsap.set(cardsRef.current, { y: 40, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    tl.to(navEl, {
      height: calculateHeight,
      duration: 0.5,
      ease: 'power3.out'
    });

    tl.to(cardsRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.4,
      ease: 'power3.out',
      stagger: 0.06
    }, '-=0.2');

    return tl;
  };

  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;

    const handleResize = () => {
      if (tlRef.current) {
        tlRef.current.kill();
        tlRef.current = createTimeline();
        if (isOpen && tlRef.current) {
          tlRef.current.progress(1);
        }
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      tl?.kill();
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen]);

  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;

    if (!isOpen) {
      setIsOpen(true);
      tl.play(0);
    } else {
      tl.eventCallback('onReverseComplete', () => setIsOpen(false));
      tl.reverse();
    }
  };

  const handleCardClick = (section) => {
    // Close menu first
    const tl = tlRef.current;
    if (tl) {
      tl.eventCallback('onReverseComplete', () => {
        setIsOpen(false);
        onNavigate(section);
      });
      tl.reverse();
    }
  };

  const handleLinkClick = (e, link) => {
    e.stopPropagation();

    if (link.action === 'vita') {
      const tl = tlRef.current;
      if (tl) {
        tl.eventCallback('onReverseComplete', () => {
          setIsOpen(false);
          onVitaClick?.();
        });
        tl.reverse();
      }
    } else if (link.href) {
      // External link - let it open naturally
      return;
    } else if (link.section) {
      handleCardClick(link.section);
    }
  };

  const setCardRef = (i) => (el) => {
    if (el) cardsRef.current[i] = el;
  };

  return (
    <div className="card-nav-container">
      <nav ref={navRef} className={`card-nav ${isOpen ? 'is-open' : ''}`}>
        {/* Top Bar */}
        <div className="card-nav-top">
          {/* Hamburger */}
          <div
            className={`card-nav-hamburger ${isOpen ? 'is-open' : ''}`}
            onClick={toggleMenu}
            role="button"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            tabIndex={0}
          >
            <span className="card-nav-hamburger-line" />
            <span className="card-nav-hamburger-line" />
          </div>

          {/* Logo */}
          <div className="card-nav-logo" onClick={() => handleCardClick('portfolio')}>
            XENIA SNAPIRO
          </div>

          {/* CTA Button */}
          <button
            className="card-nav-cta"
            onClick={() => handleCardClick('contact')}
          >
            Get in Touch
          </button>
        </div>

        {/* Expandable Content */}
        <div className="card-nav-content" aria-hidden={!isOpen}>
          {items.map((item, idx) => (
            <div
              key={item.label}
              className="card-nav-card"
              ref={setCardRef(idx)}
              onClick={() => handleCardClick(item.section)}
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(${item.bgImage.replace('.webp', '-500.webp')})`
              }}
            >
              <div className="card-nav-card-label">{item.label}</div>
              {item.links.length > 0 && (
                <div className="card-nav-card-links">
                  {item.links.map((link) => (
                    <a
                      key={link.label}
                      className="card-nav-card-link"
                      href={link.href || '#'}
                      target={link.href?.startsWith('http') ? '_blank' : undefined}
                      rel={link.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                      onClick={(e) => handleLinkClick(e, link)}
                    >
                      <span className="card-nav-card-link-arrow">↗</span>
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
});

CardNav.displayName = 'CardNav';

export default CardNav;
