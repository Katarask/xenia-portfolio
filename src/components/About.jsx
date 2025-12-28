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
  {
    id: 10,
    number: '10',
    title: 'Live & Backstage',
    description: 'Fashion shows, concerts, events. Behind the scenes access and live documentation.',
    stat: '40+',
    statLabel: 'Events',
    image: '/images/portfolio/hands-nails.webp',
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
      {/* Background Image */}
      <div
        className="expertise-card_bg"
        style={{ backgroundImage: `url(${item.image})` }}
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

            {/* Stat Box */}
            <div className="expertise-card_stat">
              <span className="expertise-card_stat-value">{item.stat}</span>
              <span className="expertise-card_stat-label">{item.statLabel}</span>
            </div>
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
      {/* Upper Section: Bio */}
      <div className="about_upper-wrapper">
        <div className="about_text-wrapper">
          <div className="about_text-div">
            <h2 className="about_heading slide-up">Fashion Photographer &amp; Creative Director</h2>
            <p className="about_bio slide-up">
              Based in Berlin. Working across Europe — Berlin, Munich, Vienna, Paris.
              <br /><br />
              I create visual stories for fashion brands, artists, and cultural publications — from editorial shoots to full campaign development.
              <br /><br />
              With 5+ years in fashion photography and creative direction, I've worked with clients including Sony Music, C/O Magazine, Rick Owens, and the Austrian Fashion Association. My approach combines editorial photography with strategic brand thinking — shaping identities, producing campaigns, and leading projects from concept to execution.
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
          />
        )}
      </div>
    </section>
  );
});

About.displayName = 'About';

export default About;
