import { useState, useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import {
  Cursor,
  Navbar,
  Portfolio,
  Services,
  About,
  Contact,
  Transition,
  VitaModal,
} from './components';
import './App.css';

// ============================================
// MAIN APP - Horizontal Scroll Layout
// Section Order: Portfolio -> Services -> About -> Contact
// With Transitions between sections
// Total width: 700vw (4 sections + 3 transitions)
// ============================================
function App() {
  const mapWrapperRef = useRef(null);
  const [vitaOpen, setVitaOpen] = useState(false);

  // ============================================
  // HORIZONTAL SCROLL NAVIGATION
  // GSAP smooth scroll to section
  // ============================================
  const navigateTo = useCallback((sectionId) => {
    const section = document.getElementById(sectionId);
    if (section && mapWrapperRef.current) {
      gsap.to(mapWrapperRef.current, {
        scrollLeft: section.offsetLeft,
        duration: 0.8,
        ease: 'power2.inOut',
      });
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

      {/* Horizontal Scroll Container */}
      <div ref={mapWrapperRef} className="map-wrapper">
        <div className="sections-track">
          {/* Section 1: Portfolio */}
          <Portfolio />

          {/* Transition 1 */}
          <Transition imageNum={1} />

          {/* Section 2: Services (CORRECT ORDER!) */}
          <Services
            onVitaClick={() => setVitaOpen(true)}
            onNavigate={navigateTo}
          />

          {/* Transition 2 */}
          <Transition imageNum={2} />

          {/* Section 3: About */}
          <About />

          {/* Transition 3 */}
          <Transition imageNum={3} />

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
