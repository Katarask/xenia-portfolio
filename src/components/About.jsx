import { useState, memo } from 'react';

// ============================================
// ABOUT IMAGES - From Webflow CDN
// ============================================
const ABOUT_IMAGES = [
  { id: 1, src: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/6927306804f16efa0650628e_Website-2.jpg', alt: 'Vienna street photography' },
  { id: 2, src: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/69273457b0146580d9418bc6_Website-4.jpg', alt: 'New York fashion editorial' },
  { id: 3, src: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/6924982cc3cac37639294681_IMG_9807.avif', alt: 'Creative direction portfolio' },
  { id: 4, src: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/69273068a6b7b82db826396f_Website.jpg', alt: 'Brand campaign photography' },
  { id: 5, src: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/69273068b8b50623bc4a9a42_Website-1.jpg', alt: 'Fashion editorial' },
  { id: 6, src: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/6935fe1fcf47d76c7fed7aee_Screenshot%202025-11-26%20at%2011.19.09.png', alt: 'Visual storytelling' },
];

// ============================================
// ABOUT SECTION - Exact Webflow Recreation
// Top: Bio text (70% width on desktop)
// Bottom: 6-column preview grid with lightbox
// ============================================
const About = memo(() => {
  const [lightboxSrc, setLightboxSrc] = useState(null);

  const openLightbox = (src) => setLightboxSrc(src);
  const closeLightbox = () => setLightboxSrc(null);

  return (
    <section id="about" className="section_about">
      {/* Upper Section: Bio */}
      <div className="about_upper-wrapper">
        <div className="about_text-wrapper">
          <div className="about_text-div">
            <h2 className="about_heading">Fashion Photographer &amp; Creative Director</h2>
            <p className="about_bio">
              Based in Berlin. Working across Europe — Berlin, Munich, Vienna, Paris.
              <br /><br />
              I create visual stories for fashion brands, artists, and cultural publications — from editorial shoots to full campaign development.
              <br /><br />
              With 5+ years in fashion photography and creative direction, I've worked with clients including Sony Music, C/O Magazine, Rick Owens, and the Austrian Fashion Association. My approach combines editorial photography with strategic brand thinking — shaping identities, producing campaigns, and leading projects from concept to execution.
              <br /><br />
              I shoot lookbooks, brand campaigns, artist portraits, and editorial content for fashion and lifestyle clients across Germany, Austria, and France.
              <br /><br />
              Background: Marketing &amp; PR, Visual Communication (UdK Berlin), Cross-Disciplinary Strategies (die Angewandte), Luxury Marketing (TUM).
            </p>
          </div>
        </div>
      </div>

      {/* Lower Section: Preview Grid */}
      <div className="about_preview-grid">
        {ABOUT_IMAGES.map((img, index) => (
          <div key={img.id} className="about_preview-item">
            <div className="about_preview-label">{String(index + 1).padStart(2, '0')}</div>
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className="about_preview-image"
              onClick={() => openLightbox(img.src)}
            />
          </div>
        ))}
      </div>

      {/* Apple-Smooth Lightbox */}
      <div
        className={`lightbox-overlay ${lightboxSrc ? 'is-visible' : ''}`}
        onClick={closeLightbox}
      >
        {lightboxSrc && (
          <img
            src={lightboxSrc}
            alt="Lightbox preview"
            className="lightbox-image"
            onClick={(e) => e.stopPropagation()}
          />
        )}
      </div>
    </section>
  );
});

About.displayName = 'About';

export default About;
