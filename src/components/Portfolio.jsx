import { useState, memo, useEffect, useRef } from 'react';
import useIsMobile from '../hooks/useIsMobile';

// ============================================
// PORTFOLIO DATA - Local images with responsive srcset
// AVIF format for modern browsers, WebP fallback
// ============================================
const IMG = '/images/portfolio';
// Optimized srcset: max 1000w (Desktop 4 columns = ~480px max, Mobile 2 columns = ~375px max)
// 2000w was too large and wasted bandwidth
const srcset = (name, format = 'webp') => 
  `${IMG}/${name}-300.${format} 300w, ${IMG}/${name}-500.${format} 500w, ${IMG}/${name}-800.${format} 800w, ${IMG}/${name}-1000.${format} 1000w`;

const PORTFOLIO_DATA = {
  column1: [
    // 1. Video: Safira Robens (actress) campaign video for fashion brand
    { id: 1, type: 'video', vimeoId: '1137289960', poster: `${IMG}/soap-skin-500.webp`, title: 'Safira Robens', subtitle: 'ACTRESS', caption: 'Campaign video for fashion brand', aspect: 'portrait' },
    // 2. Soap & Skin (musician, actress) Interview for C/O Magazine
    { id: 2, type: 'image', src: `${IMG}/magazine-spread.webp`, width: 2000, height: 1333, alt: 'Soap & Skin musician actress interview C/O Magazine', title: 'Soap & Skin', subtitle: 'MUSICIAN, ACTRESS', caption: 'Interview for C/O Magazine' },
    // 3. Santino (das deck agency) fashion campaign
    { id: 3, type: 'image', src: `${IMG}/black-sand.webp`, width: 1409, height: 2000, alt: 'Santino das deck agency fashion campaign', title: 'Santino', subtitle: 'DAS DECK AGENCY', caption: 'Fashion campaign' },
    // 4. Rick Owens (designer) portrait
    { id: 4, type: 'image', src: `${IMG}/curly-hair.webp`, width: 1600, height: 2000, alt: 'Rick Owens designer portrait', title: 'Rick Owens', subtitle: 'DESIGNER', caption: 'Portrait' },
    // 5. Soap & Skin (musician, actress) Interview for C/O Magazine
    { id: 5, type: 'image', src: `${IMG}/soap-skin.webp`, width: 963, height: 644, alt: 'Soap & Skin musician actress interview C/O Magazine', title: 'Soap & Skin', subtitle: 'MUSICIAN, ACTRESS', caption: 'Interview for C/O Magazine' },
    // 6. [FEHLT] Loewe (fashion brand) product shooting test - TODO: Bild wird später ergänzt
  ],
  column2: [
    // 1. Eric Joham (artist) Interview for C/O Magazine
    { id: 6, type: 'image', src: `${IMG}/chandelier.webp`, width: 1280, height: 1931, alt: 'Eric Joham artist interview C/O Magazine', title: 'Eric Joham', subtitle: 'ARTIST', caption: 'Interview for C/O Magazine' },
    // 2. Orania (model) for brand Laura Gerte
    { id: 7, type: 'image', src: `${IMG}/fence-sitting.webp`, width: 2000, height: 1333, alt: 'Orania model for brand Laura Gerte', title: 'Orania', subtitle: 'MODEL', caption: 'for brand Laura Gerte' },
    // 3. Orania (model) for brand Laura Gerte
    { id: 8, type: 'image', src: `${IMG}/red-jacket.webp`, width: 1642, height: 2000, alt: 'Orania model for brand Laura Gerte', title: 'Orania', subtitle: 'MODEL', caption: 'for brand Laura Gerte' },
    // 4. Georg Kentaro (cms world agency) Backstage Fashion Show
    { id: 9, type: 'image', src: `${IMG}/rick-owens.webp`, width: 1365, height: 2000, alt: 'Georg Kentaro Wales Bonner Fashion Show Backstage', title: 'Georg Kentaro', subtitle: 'CMS AGENCY', caption: 'Wales Bonner Fashion Show Backstage' },
    // 5. Ernst Lima (artist) for DAS WEISSE HAUS
    { id: 10, type: 'video', vimeoId: '1145349173', poster: `${IMG}/chandelier-500.webp`, title: 'Ernst Lima', subtitle: 'ARTIST', caption: 'for DAS WEISSE HAUS', aspect: 'portrait' },
  ],
  column3: [
    // 1. Bonnie Strange (model, DJ) Campaign for Spotify/Sony Music
    { id: 11, type: 'image', src: `${IMG}/bonnie-hair.webp`, width: 2000, height: 1333, alt: 'Bonnie Strange model DJ Spotify Sony Music', title: 'Bonnie Strange', subtitle: 'MODEL, DJ', caption: 'Campaign for Spotify/Sony Music' },
    // 2. Joanna (das deck agency) editorial shooting Martin Niklas Wieser
    { id: 12, type: 'image', src: `${IMG}/feather-hat.webp`, width: 1561, height: 2000, alt: 'Joanna das deck agency editorial Martin Niklas Wieser', title: 'Joanna', subtitle: 'DAS DECK AGENCY', caption: 'Editorial shooting Martin Niklas Wieser' },
    // 3. Bonnie Strange (model, DJ) Campaign for Spotify/Sony Music
    { id: 13, type: 'image', src: `${IMG}/bonnie-bathroom.webp`, width: 2000, height: 1333, alt: 'Bonnie Strange model DJ Spotify Sony Music', title: 'Bonnie Strange', subtitle: 'MODEL, DJ', caption: 'Campaign for Spotify/Sony Music' },
    // 4. Lisa (Casting Büro Wien) editorial shooting Vogue Ukraine
    // TODO: Bild wird später hochgeladen
    { id: 14, type: 'image', src: `${IMG}/placeholder.webp`, width: 1449, height: 2000, alt: 'Lisa Casting Büro Wien editorial shooting Vogue Ukraine', title: 'Lisa', subtitle: 'CASTING BÜRO WIEN', caption: 'Editorial shooting Vogue Ukraine' },
    // 5. Mood Video fashion show curated by Wales Bonner
    { id: 15, type: 'video', vimeoId: '730555711', poster: `${IMG}/bonnie-hair-500.webp`, title: 'Mood Video', subtitle: 'FASHION SHOW', caption: 'Curated by Wales Bonner', aspect: 'landscape' },
  ],
  column4: [
    { id: 16, type: 'image', src: `${IMG}/wendy-jim.webp`, width: 2000, height: 1325, alt: 'AFA Awards Austrian Fashion Association', title: 'AFA Awards', subtitle: 'FASHION SHOW', caption: 'Austrian Fashion Association' },
    { id: 17, type: 'image', src: `${IMG}/mob-wheelchair.webp`, width: 1440, height: 1800, alt: 'Soap & Skin musician actress interview C/O Magazine', title: 'Soap & Skin', subtitle: 'MUSICIAN, ACTRESS', caption: 'Interview for C/O Magazine' },
    { id: 18, type: 'image', src: `${IMG}/magazine-spread.webp`, width: 2000, height: 1333, alt: 'das deck model editorial campaign', title: 'Das Deck', subtitle: 'MODEL', caption: 'Editorial campaign for fashion brand' },
    { id: 19, type: 'image', src: `${IMG}/vienna-street.webp`, width: 2000, height: 1325, alt: 'Mood Video fashion campaign', title: 'Mood Video', subtitle: 'FASHION CAMPAIGN', caption: '' },
    { id: 20, type: 'image', src: `${IMG}/leather-nails.webp`, width: 2000, height: 1333, alt: 'Wendy & Jim brand owners C/O Magazine', title: 'Wendy & Jim', subtitle: 'BRAND OWNERS', caption: 'Interview for C/O Magazine' },
    { id: 21, type: 'video', vimeoId: '1137289577', poster: `${IMG}/wendy-jim-500.webp`, title: '', subtitle: '', aspect: 'landscape' },
  ],
};

// ============================================
// STORY CARD - Image with hover overlay
// Uses Picture element with AVIF (modern) and WebP fallback
// Matches original Webflow structure exactly
// ============================================
const StoryCard = memo(({ item, isEager = false }) => {
  const name = item.src.replace(`${IMG}/`, '').replace('.webp', '');
  const avifSrcset = srcset(name, 'avif');
  const webpSrcset = srcset(name, 'webp');
  // Optimized fallback: Use 500w instead of original (saves ~70% bandwidth for non-srcset browsers)
  const fallbackSrc = `${IMG}/${name}-500.webp`;

  const handleImageError = (e) => {
    // Silently handle image loading errors - prevent console errors
    e.target.style.display = 'none';
  };

  return (
    <div className="story-card">
      <div className="story-overlay"></div>
      <picture>
        {/* Precise sizes: Mobile 2 columns (50vw), Desktop 4 columns (25vw), max 480px for large screens */}
        <source srcSet={avifSrcset} sizes="(max-width: 767px) 50vw, (max-width: 1920px) 25vw, 480px" type="image/avif" />
        <source srcSet={webpSrcset} sizes="(max-width: 767px) 50vw, (max-width: 1920px) 25vw, 480px" type="image/webp" />
        <img
          src={fallbackSrc}
          srcSet={webpSrcset}
          sizes="(max-width: 767px) 50vw, (max-width: 1920px) 25vw, 480px"
          width={item.width}
          height={item.height}
          alt={item.alt || ''}
          loading={isEager ? 'eager' : 'lazy'}
          decoding="async"
          fetchpriority={isEager ? 'high' : 'auto'}
          className="story-img"
          onError={handleImageError}
        />
      </picture>
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
  );
});

StoryCard.displayName = 'StoryCard';

// ============================================
// VIDEO CARD - Vimeo iframe with lazy loading
// Matches original Webflow structure
// Aspect: portrait (9:16), landscape (16:9)
// Uses Intersection Observer for performance
// ============================================
const VideoCard = memo(({ vimeoId, aspect, title, subtitle, caption }) => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const containerRef = useRef(null);
  const aspectClass = aspect === 'landscape' ? 'is-landscape' : 'is-portrait';

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '200px', // Start loading 200px before visible
        threshold: 0.1,
      }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={`video-card ${aspectClass}`}>
      <div className="w-embed w-iframe">
        <div className="video-inner">
          {shouldLoad ? (
            <iframe
              src={`https://player.vimeo.com/video/${vimeoId}?badge=0&autopause=0&autoplay=1&muted=1&loop=1&background=1&dnt=1`}
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              title={title || 'Video'}
              loading="lazy"
            />
          ) : (
            <div style={{ width: '100%', height: '100%', backgroundColor: '#000' }} />
          )}
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
            <StoryCard key={`${item.id}-${index}`} item={item} isEager={index === 0} />
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

  // Desktop: 4 columns with same speed
  // All columns scroll at the same speed for uniform appearance
  const desktopColumns = [
    { items: PORTFOLIO_DATA.column1, direction: 'down', speed: 60, className: '' },
    { items: PORTFOLIO_DATA.column2, direction: 'up', speed: 60, className: '' },
    { items: PORTFOLIO_DATA.column3, direction: 'down', speed: 60, className: 'is-col-3' },
    { items: PORTFOLIO_DATA.column4, direction: 'up', speed: 60, className: 'is-col-4' },
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
