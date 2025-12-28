import { memo } from 'react';

// ============================================
// SERVICES SECTION - Fresh 3-Column Layout
// ============================================
const Services = memo(({ onVitaClick, onNavigate }) => {
  return (
    <section id="services" className="services">
      {/* Column 1: Labels */}
      <div className="services__col services__col--labels">
        <div className="services__row">
          <span className="services__label slide-up">Focused on</span>
        </div>
        <div className="services__row">
          <span className="services__label slide-up">Request</span>
        </div>
        <div className="services__row">
          <span className="services__label slide-up">Contact</span>
        </div>
      </div>

      {/* Column 2: Content */}
      <div className="services__col services__col--content">
        {/* Row 1: Services List */}
        <div className="services__row services__row--services">
          <div className="services__list slide-up">
            <span>Trend & cultural analysis</span>
            <span>Creative direction</span>
            <span>Social Media</span>
          </div>
          <div className="services__list slide-up">
            <span>Full-service content delivery</span>
            <span>Brand storytelling</span>
            <span>Content strategy</span>
          </div>
          <div className="services__list slide-up">
            <span>Performance optimization</span>
            <span>Photo/video production</span>
            <span>Campaign concepts</span>
          </div>
        </div>

        {/* Row 2: Links */}
        <div className="services__row services__row--links">
          <a
            href="#"
            className="services__link slide-up"
            onClick={(e) => {
              e.preventDefault();
              onVitaClick();
            }}
          >
            VITA
          </a>
          <a
            href="#portfolio"
            className="services__link slide-up"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('portfolio');
            }}
          >
            Portfolio
          </a>
        </div>

        {/* Row 3: Email */}
        <div className="services__row services__row--email">
          <a href="mailto:info@xeniasnapiro.com" className="services__email slide-up">
            info@xeniasnapiro.com
          </a>
        </div>
      </div>

      {/* Column 3: Empty (for balance) */}
      <div className="services__col services__col--empty"></div>
    </section>
  );
});

Services.displayName = 'Services';

export default Services;
