import { memo } from 'react';

// ============================================
// SERVICES SECTION - Exact Webflow Recreation
// Grid areas match original Webflow structure
// ============================================
const Services = memo(({ onVitaClick, onNavigate }) => {
  return (
    <section id="services" className="section_services">
      {/* Grid Area: 1/1/2/2 - Request Label */}
      <div className="service_request">
        <div className="services_label">Request</div>
      </div>

      {/* Grid Area: 2/1/3/2 - Links (VITA, Portfolio) - part of services_content in original but we use separate wrapper */}
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

      {/* Grid Area: 1/2/3/3 - Focused on Label (spans 2 rows) */}
      <div className="service_focused_on">
        <div className="services_label is-mobile-l">Focused on</div>
      </div>

      {/* Grid Area: 2/2/3/3 - Services List */}
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

      {/* Grid Area: 2/1/4/2 - Contact Label (spans rows 2-3) */}
      <div className="services_cta-wrapper">
        <div className="services_label">Contact</div>
      </div>

      {/* Grid Area: 3/2/4/3 - Email */}
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
