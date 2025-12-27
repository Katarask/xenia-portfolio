import { useState, memo } from 'react';

// ============================================
// EXPERTISE DATA - Expanding Cards
// ============================================
const EXPERTISE_DATA = [
  {
    id: 1,
    number: '01',
    title: 'Creative Direction',
    description: 'From concept to execution — I lead visual projects that define brand identities. Strategic thinking meets artistic vision to create campaigns that resonate.',
    stat: '50+',
    statLabel: 'Projects',
    image: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/6927306804f16efa0650628e_Website-2.jpg',
  },
  {
    id: 2,
    number: '02',
    title: 'Brand Storytelling',
    description: 'Every brand has a story worth telling. I craft visual narratives that connect with audiences — through editorial shoots, campaigns, and content strategies.',
    stat: '5+',
    statLabel: 'Years',
    image: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/69273457b0146580d9418bc6_Website-4.jpg',
  },
  {
    id: 3,
    number: '03',
    title: 'Photo & Video',
    description: 'Fashion editorials, artist portraits, brand campaigns, lookbooks. I shoot across formats — still and motion — for fashion and lifestyle clients.',
    stat: '4',
    statLabel: 'Cities',
    image: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/6924982cc3cac37639294681_IMG_9807.avif',
  },
  {
    id: 4,
    number: '04',
    title: 'Content Strategy',
    description: 'Beyond the shoot — I develop content strategies that align with brand goals. From social media to full campaign rollouts, every piece has purpose.',
    stat: '100%',
    statLabel: 'Passion',
    image: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/69273068a6b7b82db826396f_Website.jpg',
  },
];

// ============================================
// EXPANDING CARD COMPONENT
// ============================================
const ExpertiseCard = memo(({ item, isExpanded, onHover, onLeave }) => {
  return (
    <div
      className={`expertise-card ${isExpanded ? 'is-expanded' : ''}`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
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

  const handleHover = (id) => setExpandedId(id);
  const handleLeave = () => setExpandedId(null);
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
