import { useEffect, useRef, useState, memo } from 'react';

// ============================================
// CUSTOM CURSOR - Exact Webflow Recreation
// Dot1: 6px -> 80px on hover
// Dot2: 52px -> 80px on hover (trailing)
// ============================================
const Cursor = memo(() => {
  const dot1Ref = useRef(null);
  const dot2Ref = useRef(null);
  const cursorTextRef = useRef(null);
  const [isLarger, setIsLarger] = useState(false);
  const [cursorText, setCursorText] = useState('VIEW');
  const mousePos = useRef({ x: -100, y: -100 });
  const dot1Pos = useRef({ x: -100, y: -100 });
  const dot2Pos = useRef({ x: -100, y: -100 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile (hide cursor on tablet/mobile)
    const checkMobile = () => setIsMobile(window.innerWidth <= 991);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    if (window.innerWidth <= 991) return;

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      const target = e.target;

      // Check hover targets in order of priority
      const storyCard = target.closest('.story-card');
      const videoCard = target.closest('.video-card');
      const aboutImage = target.closest('.about_preview-image');
      const navLink = target.closest('.navbar_link');
      const socialDot = target.closest('.social-dot');
      const button = target.closest('.button, .services_link, .vita-button');

      if (storyCard || videoCard || aboutImage) {
        setIsLarger(true);
        setCursorText('VIEW');
      } else if (navLink) {
        setIsLarger(true);
        setCursorText(navLink.textContent.trim().toUpperCase());
      } else if (socialDot) {
        setIsLarger(true);
        const socialName = socialDot.getAttribute('data-social') || 'SOCIAL';
        setCursorText(socialName.toUpperCase());
      } else if (button) {
        setIsLarger(true);
        setCursorText('CLICK');
      } else {
        setIsLarger(false);
      }
    };

    // Animation loop with different easing for each dot
    const animate = () => {
      // Dot1: Fast follow (0.35)
      dot1Pos.current.x += (mousePos.current.x - dot1Pos.current.x) * 0.35;
      dot1Pos.current.y += (mousePos.current.y - dot1Pos.current.y) * 0.35;

      // Dot2: Slow trailing (0.15)
      dot2Pos.current.x += (mousePos.current.x - dot2Pos.current.x) * 0.15;
      dot2Pos.current.y += (mousePos.current.y - dot2Pos.current.y) * 0.15;

      if (dot1Ref.current) {
        dot1Ref.current.style.transform = `translate3d(${dot1Pos.current.x}px, ${dot1Pos.current.y}px, 0)`;
      }
      if (dot2Ref.current) {
        dot2Ref.current.style.transform = `translate3d(${dot2Pos.current.x}px, ${dot2Pos.current.y}px, 0)`;
      }

      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    const animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', checkMobile);
      cancelAnimationFrame(animationId);
    };
  }, []);

  if (isMobile) return null;

  return (
    <div className="cursor">
      <div
        ref={dot1Ref}
        className={`cursor_dot1 ${isLarger ? 'is--larger' : ''}`}
      />
      <div
        ref={dot2Ref}
        className={`cursor_dot2 ${isLarger ? 'is--larger' : ''}`}
      >
        <div
          ref={cursorTextRef}
          className={`cursor_text ${isLarger ? 'is--visible' : ''}`}
        >
          {cursorText.split('').map((char, i) => (
            <span
              key={i}
              style={{ animationDelay: `${i * 0.04}s` }}
            >
              {char}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
});

Cursor.displayName = 'Cursor';

export default Cursor;
