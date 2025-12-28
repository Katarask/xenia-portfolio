import { useState, memo } from 'react';
import useIsMobile from '../hooks/useIsMobile';

// ============================================
// PORTFOLIO DATA - Local images with responsive srcset
// ============================================
const IMG = '/images/portfolio';
const srcset = (name) => `${IMG}/${name}-500.webp 500w, ${IMG}/${name}-800.webp 800w, ${IMG}/${name}.webp 2000w`;

const PORTFOLIO_DATA = {
  column1: [
    { id: 1, type: 'image', src: `${IMG}/soap-skin.webp`, srcset: srcset('soap-skin'), width: 963, height: 644, alt: 'Artist portrait Soap&Skin - Editorial photography for C/O Magazine Berlin', title: 'Soap&Skin', subtitle: 'ARTIST', caption: 'for C/O Magazine' },
    { id: 2, type: 'image', src: `${IMG}/curly-hair.webp`, srcset: srcset('curly-hair'), width: 1600, height: 2000, alt: 'Portrait photography Berlin', title: '', subtitle: '' },
    { id: 3, type: 'image', src: `${IMG}/rick-owens.webp`, srcset: srcset('rick-owens'), width: 1365, height: 2000, alt: 'Fashion designer Rick Owens portrait', title: 'Rick Owens', subtitle: 'DESIGNER' },
    { id: 4, type: 'image', src: `${IMG}/red-jacket.webp`, srcset: srcset('red-jacket'), width: 1642, height: 2000, alt: 'Fashion portrait photography', title: '', subtitle: '' },
    { id: 5, type: 'video', vimeoId: '1137289960', poster: `${IMG}/soap-skin.webp`, title: 'Safira', subtitle: 'SAFIRA', caption: 'Safira', aspect: 'portrait' },
  ],
  column2: [
    { id: 6, type: 'image', src: `${IMG}/chandelier.webp`, srcset: srcset('chandelier'), width: 1280, height: 1931, alt: 'Artist interview Eric Joham - C/O Magazine', title: 'Eric Joham', subtitle: 'INTERVIEW', caption: 'C/O Magazine' },
    { id: 7, type: 'image', src: `${IMG}/fence-sitting.webp`, srcset: srcset('fence-sitting'), width: 2000, height: 1333, alt: 'Brand campaign Laura Gerte', title: 'Laura Gerte', subtitle: 'BRAND', caption: 'Model: Oraina' },
    { id: 8, type: 'image', src: `${IMG}/feather-hat.webp`, srcset: srcset('feather-hat'), width: 1561, height: 2000, alt: 'Fashion brand Laura Gerte - Lookbook', title: 'Laura Gerte', subtitle: 'BRAND', caption: 'Model: Oraina' },
    { id: 9, type: 'image', src: `${IMG}/black-sand.webp`, srcset: srcset('black-sand'), width: 1409, height: 2000, alt: 'Wales Bonner backstage', title: 'Wales Bonner', subtitle: 'SHOW BACKSTAGE' },
    { id: 10, type: 'video', vimeoId: '1145349173', poster: `${IMG}/chandelier.webp`, title: 'Ernst Lima', subtitle: 'PERFORMANCE', caption: 'das weisse haus', aspect: 'portrait' },
  ],
  column3: [
    { id: 11, type: 'image', src: `${IMG}/bonnie-hair.webp`, srcset: srcset('bonnie-hair'), width: 2000, height: 1333, alt: 'Bonnie Strange - Sony Music', title: 'Bonnie Strange', subtitle: 'MODEL, DJ', caption: 'for Spotify/ Sony Music' },
    { id: 12, type: 'image', src: `${IMG}/blue-dress-sand.webp`, srcset: srcset('blue-dress-sand'), width: 1449, height: 2000, alt: 'Brand campaign photography', title: '', subtitle: '' },
    { id: 13, type: 'image', src: `${IMG}/bonnie-bathroom.webp`, srcset: srcset('bonnie-bathroom'), width: 2000, height: 1333, alt: 'DJ Bonnie Strange portrait', title: 'Bonnie Strange', subtitle: 'MODEL, DJ', caption: 'Sony Music' },
    { id: 14, type: 'image', src: `${IMG}/hands-nails.webp`, srcset: srcset('hands-nails'), width: 1179, height: 1356, alt: 'Fashion editorial Das Deck', title: 'Das Deck', subtitle: 'MODEL', caption: 'for Martin Niklas Wieser' },
    { id: 15, type: 'video', vimeoId: '730555711', poster: `${IMG}/bonnie-hair.webp`, title: 'Mood Video', subtitle: 'CASTING', caption: 'for Wales Bonner', aspect: 'landscape' },
  ],
  column4: [
    { id: 16, type: 'image', src: `${IMG}/wendy-jim.webp`, srcset: srcset('wendy-jim'), width: 2000, height: 1325, alt: 'Wendy&Jim - C/O Magazine', title: 'Wendy&Jim', subtitle: 'BRAND OWNERS', caption: 'C/O Magazine' },
    { id: 17, type: 'image', src: `${IMG}/mob-wheelchair.webp`, srcset: srcset('mob-wheelchair'), width: 1440, height: 1800, alt: 'Austrian Fashion Association Awards', title: 'AFA Awards', subtitle: 'MODEL', caption: 'Austrian Fashion Association' },
    { id: 18, type: 'image', src: `${IMG}/magazine-spread.webp`, srcset: srcset('magazine-spread'), width: 2000, height: 1333, alt: 'Fashion photography Berlin', title: '', subtitle: '' },
    { id: 19, type: 'image', src: `${IMG}/vienna-street.webp`, srcset: srcset('vienna-street'), width: 2000, height: 1325, alt: 'Street fashion photography', title: '', subtitle: '' },
    { id: 20, type: 'image', src: `${IMG}/leather-nails.webp`, srcset: srcset('leather-nails'), width: 2000, height: 1333, alt: 'Portrait photography', title: '', subtitle: '' },
    { id: 21, type: 'video', vimeoId: '1137289577', poster: `${IMG}/wendy-jim.webp`, title: '', subtitle: '', aspect: 'landscape' },
  ],
};

// ============================================
// STORY CARD - Image with hover overlay
// Matches original Webflow structure exactly
// ============================================
const StoryCard = memo(({ item, isEager = false }) => (
  <div className="story-card">
    <div className="story-overlay"></div>
    <img
      src={item.src}
      srcSet={item.srcset}
      sizes="(max-width: 767px) 50vw, 25vw"
      width={item.width}
      height={item.height}
      alt={item.alt || ''}
      loading={isEager ? 'eager' : 'lazy'}
      decoding="async"
      fetchpriority={isEager ? 'high' : 'auto'}
      className="story-img"
    />
    <div className="story-caption">
      <div className="artist-name">
        {item.title && <h3 className="brand-title">{item.title}</h3>}
        {item.subtitle && <div className="text-block">{item.subtitle}</div>}
      </div>
      <div className="season-subtitle">
        {item.caption && <div>{item.caption}</div>}
      </div>
    </div>
  </div>
));

StoryCard.displayName = 'StoryCard';

// ============================================
// VIDEO CARD - Vimeo iframe with autoplay
// Matches original Webflow structure
// Aspect: portrait (9:16), landscape (16:9)
// ============================================
const VideoCard = memo(({ vimeoId, aspect, title, subtitle, caption }) => {
  const aspectClass = aspect === 'landscape' ? 'is-landscape' : 'is-portrait';

  return (
    <div className={`video-card ${aspectClass}`}>
      <div className="w-embed w-iframe">
        <div className="video-inner">
          <iframe
            src={`https://player.vimeo.com/video/${vimeoId}?badge=0&autopause=0&autoplay=1&muted=1&loop=1&background=1&dnt=1`}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            title={title || 'Video'}
          />
        </div>
      </div>
      <div className="story-overlay"></div>
      <div className="story-caption">
        <div className="artist-name">
          {title && <h3 className="brand-title">{title}</h3>}
          {subtitle && <div className="text-block">{subtitle}</div>}
        </div>
        <div className="season-subtitle">
          {caption && <div>{caption}</div>}
        </div>
      </div>
    </div>
  );
});

VideoCard.displayName = 'VideoCard';

// ============================================
// PORTFOLIO COLUMN - Infinite scroll animation
// Direction: 'up' or 'down'
// Speed: Animation duration in seconds
// duplicate: whether to duplicate items for seamless loop (desktop only)
// ============================================
const PortfolioColumn = memo(({ items, direction, speed, className = '', duplicate = true, isMobile }) => {
  const [isPaused, setIsPaused] = useState(false);

  // Only duplicate for desktop seamless loop
  const displayItems = duplicate ? [...items, ...items] : items;

  return (
    <div
      className={`portfolio_column ${className}`}
      onMouseEnter={() => !isMobile && setIsPaused(true)}
      onMouseLeave={() => !isMobile && setIsPaused(false)}
    >
      <div
        className={`portfolio_column-inner ${direction}`}
        style={{
          animationDuration: `${speed}s`,
          animationPlayState: isPaused ? 'paused' : 'running',
        }}
      >
        {displayItems.map((item, index) =>
          item.type === 'video' ? (
            <VideoCard key={`${item.id}-${index}`} {...item} />
          ) : (
            <StoryCard key={`${item.id}-${index}`} item={item} isEager={index < 3} />
          )
        )}
      </div>
    </div>
  );
});

PortfolioColumn.displayName = 'PortfolioColumn';

// ============================================
// PORTFOLIO SECTION - 4 columns grid
// Desktop: 4 columns with different speeds
// Mobile: 2 columns, no videos
// ============================================
const Portfolio = memo(() => {
  const isMobile = useIsMobile();

  // Desktop: 4 columns with speeds from documentation
  // Column 1: down, 0.8 -> 35s
  // Column 2: up, 0.9 -> 40s
  // Column 3: down, 0.8 -> 32s
  // Column 4: up, 0.9 -> 38s
  const desktopColumns = [
    { items: PORTFOLIO_DATA.column1, direction: 'down', speed: 35, className: '' },
    { items: PORTFOLIO_DATA.column2, direction: 'up', speed: 40, className: '' },
    { items: PORTFOLIO_DATA.column3, direction: 'down', speed: 32, className: 'is-col-3' },
    { items: PORTFOLIO_DATA.column4, direction: 'up', speed: 38, className: 'is-col-4' },
  ];

  // Mobile: 2 columns with all images distributed evenly (no cloning)
  // Get all images, filter out videos, distribute to 2 columns
  const allImages = [
    ...PORTFOLIO_DATA.column1,
    ...PORTFOLIO_DATA.column2,
    ...PORTFOLIO_DATA.column3,
    ...PORTFOLIO_DATA.column4,
  ].filter(i => i.type !== 'video');

  const mobileCol1 = allImages.filter((_, i) => i % 2 === 0);
  const mobileCol2 = allImages.filter((_, i) => i % 2 === 1);

  const mobileColumns = [
    { items: mobileCol1, direction: 'down', speed: 50, className: '', duplicate: true },
    { items: mobileCol2, direction: 'up', speed: 56, className: '', duplicate: true },
  ];

  const columns = isMobile ? mobileColumns : desktopColumns;

  return (
    <section id="portfolio" className="section_portfolio">
      {columns.map((col, i) => (
        <PortfolioColumn
          key={i}
          items={col.items}
          direction={col.direction}
          speed={col.speed}
          className={col.className}
          duplicate={col.duplicate !== false}
          isMobile={isMobile}
        />
      ))}
    </section>
  );
});

Portfolio.displayName = 'Portfolio';

export default Portfolio;
