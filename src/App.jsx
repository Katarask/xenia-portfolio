import { useState, useEffect, useCallback, useRef, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import Portfolio from './components/Portfolio';
import NotFound from './components/NotFound';
import './App.css';

// Lazy load non-critical components for code splitting
const Services = lazy(() => import('./components/Services'));
const About = lazy(() => import('./components/About'));
const Contact = lazy(() => import('./components/Contact'));
const VitaModal = lazy(() => import('./components/VitaModal'));

// Section positions (in vw units)
// Layout: Portfolio(100) -> Transition(100) -> Services(100) -> Transition(100) -> About(100) -> Transition(100) -> Contact(100) = 600vw
const SECTION_POSITIONS = {
  portfolio: 0,
  services: 200,  // after portfolio + transition
  about: 400,     // after services + transition
  contact: 600,   // after about + transition
};

// Transition images (fullscreen between sections) - Optimized with Picture element
const TransitionImage = ({ src, alt }) => {
  const name = src.replace('/images/portfolio/', '').replace('.webp', '');
  // Optimized srcset: max 1000w for fullscreen (most screens are ≤1920px wide)
  // 2000w was too large and wasted bandwidth
  const avifSrcset = `/images/portfolio/${name}-300.avif 300w, /images/portfolio/${name}-500.avif 500w, /images/portfolio/${name}-800.avif 800w, /images/portfolio/${name}-1000.avif 1000w`;
  const webpSrcset = `/images/portfolio/${name}-300.webp 300w, /images/portfolio/${name}-500.webp 500w, /images/portfolio/${name}-800.webp 800w, /images/portfolio/${name}-1000.webp 1000w`;
  // Optimized fallback: Use 800w for fullscreen (saves bandwidth for non-srcset browsers)
  const fallbackSrc = `/images/portfolio/${name}-800.webp`;
  
  const handleImageError = (e) => {
    // Silently handle image loading errors - prevent console errors
    e.target.style.display = 'none';
  };
  
  return (
    <div className="transition-section">
      <picture>
        <source srcSet={avifSrcset} sizes="100vw" type="image/avif" />
        <source srcSet={webpSrcset} sizes="100vw" type="image/webp" />
        <img src={fallbackSrc} srcSet={webpSrcset} sizes="100vw" alt={alt} className="transition-img" loading="lazy" decoding="async" onError={handleImageError} />
      </picture>
    </div>
  );
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

  // Main Home Component (horizontal layout)
  const HomePage = () => (
    <>
      {/* Custom Cursor (Desktop only) */}
      <Cursor />

      {/* Fixed Navbar */}
      <Navbar onNavigate={navigateTo} />

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
      <Suspense fallback={null}>
        <VitaModal isOpen={vitaOpen} onClose={() => setVitaOpen(false)} />
      </Suspense>
    </>
  );

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
