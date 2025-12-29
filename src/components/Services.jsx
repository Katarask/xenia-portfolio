import { memo } from 'react';

// ============================================
// SERVICES SECTION - Row-based Layout
// ============================================
const Services = memo(({ onVitaClick, onNavigate }) => {
  return (
    <section id="services" className="services">
      {/* Row 1: Focused on + Services */}
      <div className="services__row services__row--services">
        <span className="services__label slide-up">Focused on</span>
        <div className="services__list slide-up">
          <span>Trend & cultural analysis</span>
          <span>Full-service content delivery</span>
          <span>Performance optimization</span>
        </div>
        <div className="services__list slide-up">
          <span>Creative direction</span>
          <span>Brand storytelling</span>
          <span>Photo/video production</span>
        </div>
        <div className="services__list slide-up">
          <span>Social Media</span>
          <span>Content strategy</span>
          <span>Campaign concepts</span>
        </div>
      </div>

      {/* Row 2: Request + Links */}
      <div className="services__row services__row--links">
        <span className="services__label slide-up">Request</span>
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

      {/* Row 3: Contact + Email */}
      <div className="services__row services__row--email">
        <span className="services__label slide-up">Contact</span>
        <a href="mailto:info@xeniasnapiro.com" className="services__email slide-up">
          info@xeniasnapiro.com
        </a>
      </div>
    </section>
  );
});

Services.displayName = 'Services';

export default Services;
