import { memo } from 'react';

// ============================================
// SERVICES SECTION - Simple 3x3 Grid
// ============================================
const Services = memo(({ onVitaClick, onNavigate }) => {
  return (
    <section id="services" className="section_services">
      {/* Row 1 */}
      <div className="services_cell">
        <span className="services_label">Focused on</span>
      </div>
      <div className="services_cell">
        <div className="services_list">
          <span>Trend & cultural analysis</span>
          <span>Creative direction</span>
          <span>Social Media</span>
        </div>
        <div className="services_list">
          <span>Full-service content delivery</span>
          <span>Brand storytelling</span>
          <span>Content strategy</span>
        </div>
        <div className="services_list">
          <span>Performance optimization</span>
          <span>Photo/video production</span>
          <span>Campaign concepts</span>
        </div>
      </div>
      <div className="services_cell"></div>

      {/* Row 2 */}
      <div className="services_cell">
        <span className="services_label">Request</span>
      </div>
      <div className="services_cell">
        <div className="services_links">
          <a href="#" onClick={(e) => { e.preventDefault(); onVitaClick(); }}>
            <span className="services_link">VITA</span>
          </a>
          <a href="#portfolio" onClick={(e) => { e.preventDefault(); onNavigate('portfolio'); }}>
            <span className="services_link">Portfolio</span>
          </a>
        </div>
      </div>
      <div className="services_cell"></div>

      {/* Row 3 */}
      <div className="services_cell">
        <span className="services_label">Contact</span>
      </div>
      <div className="services_cell">
        <a href="mailto:info@xeniasnapiro.com" className="services_email">
          info@xeniasnapiro.com
        </a>
      </div>
      <div className="services_cell"></div>
    </section>
  );
});

Services.displayName = 'Services';

export default Services;
