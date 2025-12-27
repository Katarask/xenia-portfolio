import { memo } from 'react';

// ============================================
// SERVICES SECTION - Exact Webflow Recreation
// Grid: 20% - 50% - 1fr (3 columns)
// Order: Portfolio -> Services -> About -> Contact
// ============================================
const Services = memo(({ onVitaClick, onNavigate }) => {
  return (
    <section id="services" className="section_services">
      {/* Row 1: Request */}
      <div className="service_request">
        <span className="services_label">Request</span>
      </div>
      <div className="services_content">
        <button className="vita-button services_link" onClick={onVitaClick}>
          VITA
        </button>
        <a
          href="#portfolio"
          className="services_link"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('portfolio');
          }}
        >
          Portfolio
        </a>
      </div>

      {/* Row 2: Focused on */}
      <div className="service_focused_on">
        <span className="services_label">Focused on</span>
      </div>
      <div className="services_services">
        <div className="services_column">
          <span className="services_list-item">Trend &amp; cultural analysis</span>
          <span className="services_list-item">Full-service content delivery</span>
          <span className="services_list-item">Performance optimization</span>
        </div>
        <div className="services_column">
          <span className="services_list-item">Creative direction</span>
          <span className="services_list-item">Brand storytelling</span>
          <span className="services_list-item">Photo/video production</span>
        </div>
        <div className="services_column">
          <span className="services_list-item">Social Media</span>
          <span className="services_list-item">Content strategy</span>
          <span className="services_list-item">Campaign concepts</span>
        </div>
      </div>

      {/* Row 3: Contact */}
      <div className="services_cta-wrapper">
        <span className="services_label">Contact</span>
      </div>
      <div className="services_email">
        <a href="mailto:info@xeniasnapiro.com" className="services_link">
          info@xeniasnapiro.com
        </a>
      </div>
    </section>
  );
});

Services.displayName = 'Services';

export default Services;
