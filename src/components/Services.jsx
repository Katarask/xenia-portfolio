import { memo } from 'react';

// ============================================
// SERVICES SECTION - Exact Webflow Recreation
// Grid: 20% - 50% - 1fr (3 columns)
// Background image from Webflow CDN
// ============================================
const Services = memo(({ onVitaClick, onNavigate }) => {
  return (
    <section id="services" className="section_services">
      {/* Row 1: Request Label */}
      <div className="service_request">
        <div className="services_label">Request</div>
      </div>

      {/* Row 1: Links (VITA, Portfolio) */}
      <div className="services_content">
        <div className="services_links">
          <a href="#" className="link-block-2" onClick={(e) => { e.preventDefault(); onVitaClick(); }}>
            <div className="services_link">VITA</div>
          </a>
          <a href="#portfolio" className="link-block" onClick={(e) => { e.preventDefault(); onNavigate('portfolio'); }}>
            <div className="services_link">Portfolio</div>
          </a>
        </div>
      </div>

      {/* Row 2: Focused on Label */}
      <div className="service_focused_on">
        <div className="services_label is-mobile-l">Focused on</div>
      </div>

      {/* Row 2: Services List */}
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
        <div className="services_list-item is-mobile">
          Social Media<br />
          Content strategy<br />
          Campaign concepts
        </div>
      </div>

      {/* Row 3: Contact Label */}
      <div className="services_cta-wrapper">
        <div className="services_label">Contact</div>
      </div>

      {/* Row 3: Email */}
      <div className="services_email">
        <a href="mailto:info@xeniasnapiro.com" className="link-block">
          <div className="services_value">info@xeniasnapiro.com</div>
        </a>
      </div>
    </section>
  );
});

Services.displayName = 'Services';

export default Services;
