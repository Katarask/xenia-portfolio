import { useState, useEffect, useRef } from 'react'
import './App.css'

// ============================================
// PORTFOLIO DATA - Local WebP images with dimensions
// ============================================
const PORTFOLIO_DATA = {
  column1: [
    { type: 'image', src: '/images/portfolio/soap-skin.webp', width: 963, height: 644, title: 'Soap&Skin' },
    { type: 'image', src: '/images/portfolio/rick-owens.webp', width: 1365, height: 2000, title: 'Rick Owens' },
    { type: 'video', vimeoId: '1137289960', width: 1080, height: 1920, title: 'Safira' },
  ],
  column2: [
    { type: 'image', src: '/images/portfolio/chandelier.webp', width: 1280, height: 1931, title: 'Chandelier' },
    { type: 'image', src: '/images/portfolio/feather-hat.webp', width: 1561, height: 2000, title: 'Feather Hat' },
    { type: 'image', src: '/images/portfolio/fence-sitting.webp', width: 2000, height: 1333, title: 'Fence' },
    { type: 'image', src: '/images/portfolio/red-jacket.webp', width: 1642, height: 2000, title: 'Red Jacket' },
    { type: 'video', vimeoId: '1145349173', width: 2160, height: 3840, title: 'Ernst Lima' },
  ],
  column3: [
    { type: 'image', src: '/images/portfolio/bonnie-hair.webp', width: 2000, height: 1333, title: 'Bonnie' },
    { type: 'image', src: '/images/portfolio/bonnie-bathroom.webp', width: 2000, height: 1333, title: 'Bonnie II' },
    { type: 'image', src: '/images/portfolio/leather-nails.webp', width: 2000, height: 1333, title: 'Leather' },
    { type: 'image', src: '/images/portfolio/hands-nails.webp', width: 1179, height: 1356, title: 'Hands' },
    { type: 'video', vimeoId: '730555711', width: 848, height: 480, title: 'Colour Blue' },
  ],
  column4: [
    { type: 'image', src: '/images/portfolio/wendy-jim.webp', width: 2000, height: 1325, title: 'Wendy&Jim' },
    { type: 'image', src: '/images/portfolio/magazine-spread.webp', width: 2000, height: 1333, title: 'Magazine' },
    { type: 'image', src: '/images/portfolio/vienna-street.webp', width: 2000, height: 1325, title: 'Vienna' },
    { type: 'image', src: '/images/portfolio/mob-wheelchair.webp', width: 1440, height: 1800, title: 'MOB' },
    { type: 'image', src: '/images/portfolio/curly-hair.webp', width: 1600, height: 2000, title: 'Curly' },
    { type: 'image', src: '/images/portfolio/black-sand.webp', width: 1409, height: 2000, title: 'Black Sand' },
    { type: 'image', src: '/images/portfolio/blue-dress-sand.webp', width: 1449, height: 2000, title: 'Blue Dress' },
    { type: 'video', vimeoId: '1137289577', width: 1280, height: 606, title: 'Horseback' },
  ],
}

// About page images
const ABOUT_IMAGES = [
  { src: '/images/about/eye-closeup.webp', width: 1421, height: 2000 },
  { src: '/images/about/skin-detail.webp', width: 1008, height: 1488 },
  { src: '/images/about/loewe-necklace.webp', width: 1430, height: 2000 },
  { src: '/images/about/loewe-soap.webp', width: 1645, height: 2000 },
  { src: '/images/about/pink-feathers.webp', width: 1439, height: 2000 },
  { src: '/images/about/armor-model.webp', width: 1493, height: 2000 },
]

// ============================================
// CUSTOM CURSOR
// ============================================
function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isPointer, setIsPointer] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const updateCursor = (e) => {
      const target = e.target
      const isClickable = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        window.getComputedStyle(target).cursor === 'pointer'
      setIsPointer(isClickable)
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    document.addEventListener('mousemove', updatePosition)
    document.addEventListener('mouseover', updateCursor)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      document.removeEventListener('mousemove', updatePosition)
      document.removeEventListener('mouseover', updateCursor)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [])

  if (!isVisible) return null

  return (
    <>
      <div 
        className={`cursor-dot ${isPointer ? 'pointer' : ''}`}
        style={{ left: position.x, top: position.y }}
      />
      <div 
        className="cursor-ring"
        style={{ left: position.x, top: position.y }}
      />
    </>
  )
}

// ============================================
// LAZY VIDEO - Only loads on hover, with exact aspect ratio
// ============================================
function LazyVideo({ vimeoId, width, height, title }) {
  const [isHovered, setIsHovered] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)

  return (
    <div 
      className="video-container"
      style={{ aspectRatio: `${width}/${height}` }}
      onMouseEnter={() => {
        setIsHovered(true)
        setHasLoaded(true)
      }}
      onMouseLeave={() => setIsHovered(false)}
    >
      {hasLoaded ? (
        <iframe
          src={`https://player.vimeo.com/video/${vimeoId}?background=1&autoplay=${isHovered ? 1 : 0}&loop=1&muted=1`}
          frameBorder="0"
          allow="autoplay; fullscreen"
          loading="lazy"
          title={title}
          style={{ width: '100%', height: '100%' }}
        />
      ) : (
        <div className="video-placeholder">
          <span>▶</span>
        </div>
      )}
    </div>
  )
}

// ============================================
// OPTIMIZED IMAGE - With width/height for CLS
// ============================================
function OptimizedImage({ src, width, height, alt, title }) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div 
      className="image-wrapper"
      style={{ aspectRatio: `${width}/${height}` }}
    >
      <img
        src={src}
        width={width}
        height={height}
        alt={alt || title || ''}
        loading="lazy"
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        className={isLoaded ? 'loaded' : ''}
      />
    </div>
  )
}

// ============================================
// PORTFOLIO COLUMN - With auto-scroll
// ============================================
function PortfolioColumn({ items, direction = 'up', speed = 30 }) {
  const columnRef = useRef(null)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    let animationId
    let lastTime = 0

    const animate = (timestamp) => {
      if (!lastTime) lastTime = timestamp
      const delta = timestamp - lastTime
      lastTime = timestamp

      setScrollY(prev => {
        const newY = prev + (direction === 'up' ? 1 : -1) * (delta / 1000) * speed
        const column = columnRef.current
        if (!column) return prev

        const contentHeight = column.scrollHeight / 2
        if (Math.abs(newY) >= contentHeight) {
          return 0
        }
        return newY
      })

      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [direction, speed])

  // Duplicate items for infinite scroll
  const duplicatedItems = [...items, ...items]

  return (
    <div className="portfolio-column">
      <div 
        ref={columnRef}
        className="column-inner"
        style={{ transform: `translateY(${scrollY}px)` }}
      >
        {duplicatedItems.map((item, index) => (
          <div key={index} className="portfolio-item">
            {item.type === 'image' ? (
              <OptimizedImage {...item} />
            ) : (
              <LazyVideo vimeoId={item.vimeoId} width={item.width} height={item.height} title={item.title} />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ============================================
// MAIN APP
// ============================================
function App() {
  const [currentPage, setCurrentPage] = useState('home')

  return (
    <div className="app">
      <CustomCursor />
      
      {/* Header */}
      <header className="header">
        <a href="/" className="logo" onClick={(e) => { e.preventDefault(); setCurrentPage('home') }}>
          XENIA ZAHAROVA
        </a>
        <nav className="nav">
          <button 
            className={currentPage === 'home' ? 'active' : ''} 
            onClick={() => setCurrentPage('home')}
          >
            Work
          </button>
          <button 
            className={currentPage === 'about' ? 'active' : ''} 
            onClick={() => setCurrentPage('about')}
          >
            About
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="main">
        {currentPage === 'home' ? (
          <div className="portfolio-grid">
            <PortfolioColumn items={PORTFOLIO_DATA.column1} direction="up" speed={25} />
            <PortfolioColumn items={PORTFOLIO_DATA.column2} direction="down" speed={30} />
            <PortfolioColumn items={PORTFOLIO_DATA.column3} direction="up" speed={28} />
            <PortfolioColumn items={PORTFOLIO_DATA.column4} direction="down" speed={32} />
          </div>
        ) : (
          <div className="about-page">
            <div className="about-content">
              <h1>Xenia Zaharova</h1>
              <p className="bio">
                Stylist based in Vienna, working internationally in fashion, 
                editorial, and commercial projects.
              </p>
              <div className="contact">
                <a href="mailto:hello@xeniazaharova.com">hello@xeniazaharova.com</a>
                <a href="https://instagram.com/xeniazaharova" target="_blank" rel="noopener noreferrer">
                  @xeniazaharova
                </a>
              </div>
            </div>
            <div className="about-images">
              {ABOUT_IMAGES.map((img, i) => (
                <OptimizedImage key={i} {...img} alt={`About ${i + 1}`} />
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="footer">
        <span>© 2024</span>
        <a href="https://instagram.com/xeniazaharova" target="_blank" rel="noopener noreferrer">
          Instagram
        </a>
      </footer>
    </div>
  )
}

export default App
