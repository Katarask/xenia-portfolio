import { useState, useCallback, memo } from 'react';

// ============================================
// NAVBAR - Exact Webflow Recreation
// Fixed header, 10vh height
// Mobile: Hamburger menu at ≤991px
// ============================================
const Navbar = memo(({ onNavigate }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = useCallback((e, sectionId) => {
    e.preventDefault();
    onNavigate(sectionId);
    setMenuOpen(false);
  }, [onNavigate]);

  const navItems = [
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav className="navbar">
      <div className="navbar_component">
        <div className="navbar_logo-wrapper">
          <h1 className="navbar_name">XENIA SNAPIRO</h1>
          <div className="navbar_tagline">
            Creative Director, Brand &amp; Content Strategist<br />
            Berlin - Paris - Vienna - Munich
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="navbar_menu">
          {navItems.map(item => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="navbar_link"
              onClick={(e) => handleNavClick(e, item.id)}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className={`menu-button ${menuOpen ? 'w--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className="menu-icon">
            <span></span>
            <span></span>
          </div>
        </button>

        {/* Mobile Menu Overlay */}
        <div className={`w-nav-overlay ${menuOpen ? 'is-open' : ''}`}>
          {navItems.map(item => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="navbar_link"
              onClick={(e) => handleNavClick(e, item.id)}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;
