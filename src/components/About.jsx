import { useState, memo } from 'react';
import useIsMobile from '../hooks/useIsMobile';

// ============================================
// EXPERTISE DATA - Expanding Cards (Local images)
// ============================================
const EXPERTISE_DATA = [
  {
    id: 1,
    number: '01',
    title: 'Creative Direction',
    description: 'From concept to execution — I lead visual projects that define brand identities. Strategic thinking meets artistic vision.',
    stat: '50+',
    statLabel: 'Projects',
    image: '/images/portfolio/soap-skin.webp',
  },
  {
    id: 2,
    number: '02',
    title: 'Brand Storytelling',
    description: 'Every brand has a story worth telling. I craft visual narratives that connect with audiences.',
    stat: '5+',
    statLabel: 'Years',
    image: '/images/portfolio/curly-hair.webp',
  },
  {
    id: 3,
    number: '03',
    title: 'Photo & Video',
    description: 'Fashion editorials, artist portraits, brand campaigns. I shoot across formats — still and motion.',
    stat: '4',
    statLabel: 'Cities',
    image: '/images/portfolio/rick-owens.webp',
  },
  {
    id: 4,
    number: '04',
    title: 'Fashion Editorial',
    description: 'High-end fashion photography for magazines, brands and designers. Visual stories that define style.',
    stat: '20+',
    statLabel: 'Editorials',
    image: '/images/about/pink-feathers.webp',
  },
  {
    id: 5,
    number: '05',
    title: 'Artist Portraits',
    description: 'Capturing the essence of musicians, performers and creatives. Authentic moments, striking visuals.',
    stat: '30+',
    statLabel: 'Artists',
    image: '/images/portfolio/chandelier.webp',
  },
  {
    id: 6,
    number: '06',
    title: 'Campaign Production',
    description: 'End-to-end campaign development from strategy to final delivery. Cohesive brand experiences.',
    stat: '15+',
    statLabel: 'Campaigns',
    image: '/images/portfolio/fence-sitting.webp',
  },
  {
    id: 7,
    number: '07',
    title: 'Lookbooks',
    description: 'Seasonal collections brought to life. Clean, editorial aesthetics that let the fashion speak.',
    stat: '25+',
    statLabel: 'Collections',
    image: '/images/portfolio/feather-hat.webp',
  },
  {
    id: 8,
    number: '08',
    title: 'Content Strategy',
    description: 'Beyond the shoot — I develop content strategies that align with brand goals.',
    stat: '100%',
    statLabel: 'Passion',
    image: '/images/portfolio/black-sand.webp',
  },
  {
    id: 9,
    number: '09',
    title: 'Music & Culture',
    description: 'Working with labels, artists and cultural publications. Capturing the energy of the scene.',
    stat: '10+',
    statLabel: 'Labels',
    image: '/images/portfolio/bonnie-hair.webp',
  },
];

// ============================================
// EXPANDING CARD COMPONENT
// ============================================
const ExpertiseCard = memo(({ item, isExpanded, onHover, onLeave, onTap, isMobile }) => {
  return (
    <div
      className={`expertise-card ${isExpanded ? 'is-expanded' : ''}`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={isMobile ? onTap : undefined}
    >
      {/* Background Image - Optimized with smaller variant */}
      <div
        className="expertise-card_bg"
        style={{ 
          backgroundImage: `url(${item.image.replace('.webp', '-500.webp')})`,
        }}
      />

      {/* Gradient Overlay */}
      <div className="expertise-card_gradient" />

      {/* Content */}
      <div className="expertise-card_content">
        {/* Number */}
        <div className="expertise-card_number">{item.number}</div>

        {/* Title */}
        <h3 className="expertise-card_title">{item.title}</h3>

        {/* Expandable Content */}
        <div className="expertise-card_expandable">
          <div className="expertise-card_expandable-inner">
            <p className="expertise-card_description">{item.description}</p>
          </div>
        </div>
      </div>

      {/* Border */}
      <div className="expertise-card_border" />
    </div>
  );
});

ExpertiseCard.displayName = 'ExpertiseCard';

// ============================================
// ABOUT SECTION - With Expanding Cards
// ============================================
const About = memo(() => {
  const [expandedId, setExpandedId] = useState(null);
  const [lightboxSrc, setLightboxSrc] = useState(null);
  const isMobile = useIsMobile();

  const handleHover = (id) => !isMobile && setExpandedId(id);
  const handleLeave = () => !isMobile && setExpandedId(null);
  const handleTap = (id) => {
    if (isMobile) {
      setExpandedId(expandedId === id ? null : id);
    }
  };
  const closeLightbox = () => setLightboxSrc(null);

  return (
    <section id="about" className="section_about">
      <div className="about_scroll-container">
        {/* Upper Section: Bio */}
        <div className="about_upper-wrapper">
          <div className="about_text-wrapper">
            <div className="about_text-div">
              <h2 className="about_heading slide-up">Creative Director, Photographer &amp; Brand / Content Strategist</h2>
              <p className="about_bio slide-up">
                With 5+ years of experience in visual storytelling, campaign development, and digital marketing. I combine creative direction with strategic thinking — shaping brand identities, producing high quality content, and leading projects from concept to execution.
                <br /><br />
                I've worked with fashion, culture, and lifestyle brands (incl. Sony Music, Austrian Fashion Association, C/O Magazine, ioannes, Wales Bonner) and spent 4 years as Digital Content Lead for an art institution in Vienna, achieving organic audience growth and building digital presence.
                <br /><br />
                With a background in Marketing &amp; PR, Visual Communication (UdK Berlin), Cross-Disciplinary Strategies (die Angewandte) and Luxury Marketing (TUM), I bring a combination of creative vision, cultural insight, and data driven strategy.
              </p>
            </div>
          </div>
        </div>

        {/* Expertise Cards */}
        <div className="expertise-cards-wrapper">
          {EXPERTISE_DATA.map((item) => (
            <ExpertiseCard
              key={item.id}
              item={item}
              isExpanded={expandedId === item.id}
              onHover={() => handleHover(item.id)}
              onLeave={handleLeave}
              onTap={() => handleTap(item.id)}
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>

      {/* Lightbox (kept for potential future use) */}
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
            onError={(e) => {
              // Silently handle image loading errors - prevent console errors
              e.target.style.display = 'none';
            }}
          />
        )}
      </div>
    </section>
  );
});

About.displayName = 'About';

export default About;
