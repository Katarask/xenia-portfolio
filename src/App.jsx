import { useState, useEffect, useCallback, useRef } from 'react';
import {
  Cursor,
  Navbar,
  Portfolio,
  Services,
  About,
  Contact,
  VitaModal,
} from './components';
import './App.css';

// Section positions (in vw units)
const SECTION_POSITIONS = {
  portfolio: 0,
  services: 100,
  about: 200,
  contact: 300,
};

// ============================================
// MAIN APP - Horizontal Layout (nav only, no scroll)
// Section Order: Portfolio -> Services -> About -> Contact
// ============================================
function App() {
  const [vitaOpen, setVitaOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState('portfolio');
  const trackRef = useRef(null);

  // ============================================
  // NAVIGATION VIA TRANSFORM (no scroll)
  // ============================================
  const navigateTo = useCallback((sectionId) => {
    const position = SECTION_POSITIONS[sectionId];
    if (position !== undefined && trackRef.current) {
      trackRef.current.style.transform = `translateX(-${position}vw)`;
      setCurrentSection(sectionId);
    }
  }, []);

  // ============================================
  // TAB TITLE ANIMATION
  // Rotate through titles when tab is hidden
  // ============================================
  useEffect(() => {
    let titleInterval;
    const titles = [
      'Xenia Snapiro',
      'Creative Director',
      'Photographer',
      'Brand Strategist',
      'Berlin',
      'Paris',
      'Munich',
    ];
    let i = 0;

    const handleVisibility = () => {
      if (document.hidden) {
        titleInterval = setInterval(() => {
          document.title = titles[i++ % titles.length];
        }, 2000);
      } else {
        clearInterval(titleInterval);
        document.title = 'Xenia Snapiro | Modefotografie & Creative Direction Berlin';
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      clearInterval(titleInterval);
    };
  }, []);

  // ============================================
  // SLIDE-UP ANIMATION (IntersectionObserver)
  // ============================================
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll('.slide-up').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="app">
      {/* Custom Cursor (Desktop only) */}
      <Cursor />

      {/* Fixed Navbar */}
      <Navbar onNavigate={navigateTo} />

      {/* Horizontal Container - Navigation only */}
      <div className="map-wrapper">
        <div ref={trackRef} className="sections-track">
          {/* Section 1: Portfolio */}
          <Portfolio />

          {/* Section 2: Services */}
          <Services
            onVitaClick={() => setVitaOpen(true)}
            onNavigate={navigateTo}
          />

          {/* Section 3: About */}
          <About />

          {/* Section 4: Contact */}
          <Contact />
        </div>
      </div>

      {/* Vita Modal */}
      <VitaModal isOpen={vitaOpen} onClose={() => setVitaOpen(false)} />
    </div>
  );
}

export default App;
