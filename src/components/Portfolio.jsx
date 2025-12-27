import { useState, useEffect, memo } from 'react';

// ============================================
// PORTFOLIO DATA - All images from Webflow CDN
// ============================================
const PORTFOLIO_DATA = {
  column1: [
    { id: 1, type: 'image', src: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/6924982cc3cac3763929466f_1547785C-A471-4EB4-BDCF-FF780A6D1863.JPG', srcset: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/6924982cc3cac3763929466f_1547785C-A471-4EB4-BDCF-FF780A6D1863-p-500.jpg 500w, https://cdn.prod.website-files.com/6924982cc3cac37639294622/6924982cc3cac3763929466f_1547785C-A471-4EB4-BDCF-FF780A6D1863-p-800.jpg 800w', alt: 'Artist portrait Soap&Skin - Editorial photography for C/O Magazine Berlin', title: 'Soap&Skin', subtitle: 'ARTIST', caption: 'for C/O Magazine' },
    { id: 2, type: 'image', src: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/6924982cc3cac37639294689_15%203.JPG', alt: 'Portrait photography Berlin', title: '', subtitle: '' },
    { id: 3, type: 'image', src: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/6924982cc3cac3763929464f_B9D24BBF-0CB3-42F1-8E03-5BE311B9E597.avif', alt: 'Fashion designer Rick Owens portrait', title: 'Rick Owens', subtitle: 'DESIGNER' },
    { id: 4, type: 'image', src: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/6924982cc3cac37639294653_064E2395-AA58-48F8-ADC5-939D2CE34E63.avif', alt: 'Music artist Soap&Skin - C/O Magazine', title: 'Soap&Skin', subtitle: 'ARTIST', caption: 'C/O Magazine' },
    { id: 5, type: 'image', src: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/69273068a6b7b82db826396f_Website.jpg', alt: 'Fashion portrait photography', title: '', subtitle: '' },
    { id: 6, type: 'video', vimeoId: '1137289960', poster: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/6924982cc3cac3763929466f_1547785C-A471-4EB4-BDCF-FF780A6D1863-p-500.jpg', title: 'Safira', subtitle: 'SAFIRA', caption: 'Safira', aspect: 'portrait' },
  ],
  column2: [
    { id: 7, type: 'image', src: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/6924982cc3cac37639294643_1.avif', alt: 'Artist interview Eric Joham - C/O Magazine', title: 'Eric Joham', subtitle: 'INTERVIEW', caption: 'C/O Magazine' },
    { id: 8, type: 'image', src: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/6924982cc3cac3763929467b_Kuko%202%20tags-44.jpg', alt: 'Brand campaign Laura Gerte', title: 'Laura Gerte', subtitle: 'BRAND', caption: 'Model: Oraina' },
    { id: 9, type: 'image', src: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/6924982cc3cac3763929467c_Kuko%202%20tags-42.jpg', alt: 'Fashion brand Laura Gerte - Lookbook', title: 'Laura Gerte', subtitle: 'BRAND', caption: 'Model: Oraina' },
    { id: 10, type: 'image', src: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/6924982cc3cac3763929464d_14240002.avif', alt: 'Wales Bonner backstage', title: 'Wales Bonner', subtitle: 'SHOW BACKSTAGE' },
    { id: 11, type: 'video', vimeoId: '1145349173', poster: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/6924982cc3cac37639294643_1.avif', title: 'Ernst Lima', subtitle: 'PERFORMANCE', caption: 'das weisse haus', aspect: 'portrait' },
  ],
  column3: [
    { id: 12, type: 'image', src: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/6924982cc3cac3763929468b_Kuko%202%20tags-51.jpg', alt: 'Bonnie Strange - Sony Music', title: 'Bonnie Strange', subtitle: 'MODEL, DJ', caption: 'for Spotify/ Sony Music' },
    { id: 13, type: 'image', src: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/69273457f6983e5f11cf2264_Website-10.jpg', alt: 'Brand campaign photography', title: '', subtitle: '' },
    { id: 14, type: 'image', src: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/6924982cc3cac3763929468a_Kuko%202%20tags-49.jpg', alt: 'DJ Bonnie Strange portrait', title: 'Bonnie Strange', subtitle: 'MODEL, DJ', caption: 'Sony Music' },
    { id: 15, type: 'image', src: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/6924982cc3cac37639294692_5..jpg', alt: 'Fashion editorial Das Deck', title: 'Das Deck', subtitle: 'MODEL', caption: 'for Martin Niklas Wieser' },
    { id: 16, type: 'video', vimeoId: '730555711', poster: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/6924982cc3cac3763929468b_Kuko%202%20tags-51.jpg', title: 'Mood Video', subtitle: 'CASTING', caption: 'for Wales Bonner', aspect: 'landscape' },
  ],
  column4: [
    { id: 17, type: 'image', src: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/6924982cc3cac37639294697_IMG_3523.avif', alt: 'Wendy&Jim - C/O Magazine', title: 'Wendy&Jim', subtitle: 'BRAND OWNERS', caption: 'C/O Magazine' },
    { id: 18, type: 'image', src: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/6924982cc3cac3763929465f_5557EDBC-AB28-454B-82B3-BFAA837285E0.avif', alt: 'Austrian Fashion Association Awards', title: 'AFA Awards', subtitle: 'MODEL', caption: 'Austrian Fashion Association' },
    { id: 19, type: 'image', src: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/69273068b8b50623bc4a9a42_Website-1.jpg', alt: 'Fashion photography Berlin', title: '', subtitle: '' },
    { id: 20, type: 'image', src: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/6924982cc3cac37639294641_00-253%203.avif', alt: 'Street fashion photography', title: '', subtitle: '' },
    { id: 21, type: 'image', src: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/6924982cc3cac3763929468c_20%202.JPG', alt: 'Portrait photography', title: '', subtitle: '' },
    { id: 22, type: 'video', vimeoId: '1137289577', poster: 'https://cdn.prod.website-files.com/6924982cc3cac37639294622/6924982cc3cac37639294697_IMG_3523.avif', title: '', subtitle: '', aspect: 'landscape' },
  ],
};

// ============================================
// STORY CARD - Image with hover overlay
// ============================================
const StoryCard = memo(({ item }) => (
  <div className="story-card">
    <img
      src={item.src}
      srcSet={item.srcset}
      sizes="(max-width: 767px) 50vw, 25vw"
      alt={item.alt || ''}
      loading="lazy"
      className="story-img"
    />
    <div className="story-overlay"></div>
    {(item.title || item.subtitle) && (
      <div className="story-caption">
        <div className="artist-name">
          {item.subtitle && <div className="text-block">{item.subtitle}</div>}
          {item.title && <h3 className="brand-title">{item.title}</h3>}
        </div>
        {item.caption && (
          <div className="season-subtitle">
            <div>{item.caption}</div>
          </div>
        )}
      </div>
    )}
  </div>
));

StoryCard.displayName = 'StoryCard';

// ============================================
// VIDEO CARD - Vimeo iframe with lazy loading
// Aspect: portrait (9:16), landscape (16:9)
// ============================================
const VideoCard = memo(({ vimeoId, poster, aspect, title, subtitle, caption }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const aspectClass = aspect === 'landscape' ? 'is-landscape' : 'is-portrait';

  return (
    <div
      className={`video-card ${aspectClass}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        if (!isLoaded) setIsHovered(false);
      }}
    >
      <div className="video-hover-wrapper" data-vimeo-id={vimeoId}>
        <img
          src={poster}
          alt={title || 'Video thumbnail'}
          className={`video-poster ${isLoaded ? 'is-hidden' : ''}`}
          loading="lazy"
        />
        {isHovered && (
          <iframe
            src={`https://player.vimeo.com/video/${vimeoId}?badge=0&autopause=0&autoplay=1&muted=1&loop=1&background=1&dnt=1`}
            className={`video-iframe ${isLoaded ? 'is-loaded' : ''}`}
            frameBorder="0"
            allow="autoplay; fullscreen"
            title={title || 'Video'}
            onLoad={() => setIsLoaded(true)}
          />
        )}
      </div>
      <div className="story-overlay"></div>
      {(title || subtitle) && (
        <div className="story-caption">
          <div className="artist-name">
            {subtitle && <div className="text-block">{subtitle}</div>}
            {title && <h3 className="brand-title">{title}</h3>}
          </div>
          {caption && (
            <div className="season-subtitle">
              <div>{caption}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
});

VideoCard.displayName = 'VideoCard';

// ============================================
// PORTFOLIO COLUMN - Infinite scroll animation
// Direction: 'up' or 'down'
// Speed: Animation duration in seconds
// ============================================
const PortfolioColumn = memo(({ items, direction, speed, className = '' }) => {
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate items for seamless loop
  const duplicatedItems = [...items, ...items];

  return (
    <div
      className={`portfolio_column ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className={`portfolio_column-inner ${direction}`}
        style={{
          animationDuration: `${speed}s`,
          animationPlayState: isPaused ? 'paused' : 'running',
        }}
      >
        {duplicatedItems.map((item, index) =>
          item.type === 'video' ? (
            <VideoCard key={`${item.id}-${index}`} {...item} />
          ) : (
            <StoryCard key={`${item.id}-${index}`} item={item} />
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 767);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  // Mobile: 2 columns, merge col1+col3 and col2+col4, no videos
  const mobileColumns = [
    {
      items: [...PORTFOLIO_DATA.column1, ...PORTFOLIO_DATA.column3].filter(i => i.type !== 'video'),
      direction: 'down',
      speed: 45,
      className: '',
    },
    {
      items: [...PORTFOLIO_DATA.column2, ...PORTFOLIO_DATA.column4].filter(i => i.type !== 'video'),
      direction: 'up',
      speed: 50,
      className: '',
    },
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
        />
      ))}
    </section>
  );
});

Portfolio.displayName = 'Portfolio';

export default Portfolio;
