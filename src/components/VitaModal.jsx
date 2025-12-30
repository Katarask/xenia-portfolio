import { useState, useEffect, useCallback, memo } from 'react';

// ============================================
// VITA MODAL - Apple-Style Animation
// Open: Scale 0.85 -> 1, opacity 0 -> 1
// Close: X becomes heart, then fade out
// ============================================
const VitaModal = memo(({ isOpen, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [showHeart, setShowHeart] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleClose = useCallback(() => {
    // Show heart animation
    setShowHeart(true);

    // Wait 1 second for heart effect
    setTimeout(() => {
      setIsClosing(true);

      // After close animation, reset and call onClose
      setTimeout(() => {
        setIsClosing(false);
        setShowHeart(false);
        onClose();
      }, 500);
    }, 1000);
  }, [onClose]);

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          subject: 'Vita Request',
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      try {
        await response.json();
      } catch {
        // JSON parsing failed, but response was OK - continue
      }

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => {
        handleClose();
        setStatus('idle');
      }, 2000);
    } catch (error) {
      // Silently handle errors - don't log to console in production
      setStatus('error');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!isOpen) return null;

  return (
    <div
      className={`vita-modal ${isClosing ? 'is-closing' : ''}`}
      onClick={handleClose}
    >
      <div
        className="vita-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={`vita-close ${showHeart ? 'is-heart' : ''}`}
          onClick={handleClose}
        >
          {showHeart ? '♥' : '✕'}
        </button>

        <h3 className="vita-title">Request Vita</h3>

        {status === 'success' ? (
          <div className="form-success">
            Thank you! We'll send you the vita shortly.
          </div>
        ) : (
          <form className="vita-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your email address"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Leave your message here (optional)"
              value={formData.message}
              onChange={handleChange}
              rows={4}
            />
            {status === 'error' && (
              <div className="form-error">Something went wrong. Please try again.</div>
            )}
            <button
              type="submit"
              className="button"
              disabled={status === 'sending'}
            >
              {status === 'sending' ? 'Sending...' : 'Send message'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
});

VitaModal.displayName = 'VitaModal';

export default VitaModal;
