import { useState, useEffect, useCallback, useRef } from 'react';
import {
  Cursor,
  CardNav,
  Portfolio,
  Services,
  About,
  Contact,
  VitaModal,
} from './components';
import './App.css';
import './components/CardNav.css';

// Section positions (in vw units)
// Layout: Portfolio(100) -> Transition(100) -> Services(100) -> Transition(100) -> About(100) -> Transition(100) -> Contact(100) = 700vw
const SECTION_POSITIONS = {
  portfolio: 0,
  services: 200,  // after portfolio + transition
  about: 400,     // after services + transition
  contact: 600,   // after about + transition
};

// Transition images (fullscreen between sections)
const TransitionImage = ({ src, alt }) => (
  <div className="transition-section">
    <img src={src} alt={alt} className="transition-img" />
  </div>
);

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

      {/* Card Navigation */}
      <CardNav onNavigate={navigateTo} onVitaClick={() => setVitaOpen(true)} />

      {/* Horizontal Container - Navigation only */}
      <div className="map-wrapper">
        <div ref={trackRef} className="sections-track">
          {/* Section 1: Portfolio */}
          <Portfolio />

          {/* Transition 1 */}
          <TransitionImage src="/images/portfolio/rick-owens.webp" alt="Transition" />

          {/* Section 2: Services */}
          <Services
            onVitaClick={() => setVitaOpen(true)}
            onNavigate={navigateTo}
          />

          {/* Transition 2 */}
          <TransitionImage src="/images/portfolio/chandelier.webp" alt="Transition" />

          {/* Section 3: About */}
          <About />

          {/* Transition 3 */}
          <TransitionImage src="/images/portfolio/blue-dress-sand.webp" alt="Transition" />

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
