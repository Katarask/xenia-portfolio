import { useState, memo } from 'react';

// ============================================
// EXPERTISE DATA - Expanding Cards
// ============================================
const EXPERTISE_DATA = [
  {
    id: 1,
    number: '01',
    title: 'Creative Direction',
    description: 'From concept to execution — I lead visual projects that define brand identities. Strategic thinking meets artistic vision.',
    stat: '50+',
    statLabel: 'Projects',
    image: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/6924982cc3cac3763929466f_1547785C-A471-4EB4-BDCF-FF780A6D1863.JPG',
  },
  {
    id: 2,
    number: '02',
    title: 'Brand Storytelling',
    description: 'Every brand has a story worth telling. I craft visual narratives that connect with audiences.',
    stat: '5+',
    statLabel: 'Years',
    image: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/6924982cc3cac37639294689_15%203.JPG',
  },
  {
    id: 3,
    number: '03',
    title: 'Photo & Video',
    description: 'Fashion editorials, artist portraits, brand campaigns. I shoot across formats — still and motion.',
    stat: '4',
    statLabel: 'Cities',
    image: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/6924982cc3cac3763929464f_B9D24BBF-0CB3-42F1-8E03-5BE311B9E597.avif',
  },
  {
    id: 4,
    number: '04',
    title: 'Fashion Editorial',
    description: 'High-end fashion photography for magazines, brands and designers. Visual stories that define style.',
    stat: '20+',
    statLabel: 'Editorials',
    image: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/6924982cc3cac37639294653_064E2395-AA58-48F8-ADC5-939D2CE34E63.avif',
  },
  {
    id: 5,
    number: '05',
    title: 'Artist Portraits',
    description: 'Capturing the essence of musicians, performers and creatives. Authentic moments, striking visuals.',
    stat: '30+',
    statLabel: 'Artists',
    image: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/6924982cc3cac37639294643_1.avif',
  },
  {
    id: 6,
    number: '06',
    title: 'Campaign Production',
    description: 'End-to-end campaign development from strategy to final delivery. Cohesive brand experiences.',
    stat: '15+',
    statLabel: 'Campaigns',
    image: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/6924982cc3cac3763929467b_Kuko%202%20tags-44.jpg',
  },
  {
    id: 7,
    number: '07',
    title: 'Lookbooks',
    description: 'Seasonal collections brought to life. Clean, editorial aesthetics that let the fashion speak.',
    stat: '25+',
    statLabel: 'Collections',
    image: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/6924982cc3cac3763929467c_Kuko%202%20tags-42.jpg',
  },
  {
    id: 8,
    number: '08',
    title: 'Content Strategy',
    description: 'Beyond the shoot — I develop content strategies that align with brand goals.',
    stat: '100%',
    statLabel: 'Passion',
    image: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/6924982cc3cac3763929464d_14240002.avif',
  },
  {
    id: 9,
    number: '09',
    title: 'Music & Culture',
    description: 'Working with labels, artists and cultural publications. Capturing the energy of the scene.',
    stat: '10+',
    statLabel: 'Labels',
    image: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/6924982cc3cac3763929468b_Kuko%202%20tags-51.jpg',
  },
  {
    id: 10,
    number: '10',
    title: 'Live & Backstage',
    description: 'Fashion shows, concerts, events. Behind the scenes access and live documentation.',
    stat: '40+',
    statLabel: 'Events',
    image: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/6924982cc3cac37639294692_5..jpg',
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
