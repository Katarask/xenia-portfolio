import { useState, memo } from 'react';

// ============================================
// SOCIAL LINKS
// ============================================
const SOCIAL_LINKS = [
  { name: 'Instagram', url: 'https://www.instagram.com/xeniasnapiro/' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/xenia-snapiro/' },
  { name: 'Facebook', url: 'https://www.facebook.com/k.snapiro/' },
  { name: 'Pinterest', url: 'https://es.pinterest.com/xeniasnapiro/' },
];

// ============================================
// CONTACT SECTION - Exact Webflow Recreation
// Grid: 2 columns x 2 rows
// Left: Heading "LEAVE YOUR CONTACT BELOW"
// Right: Info + Form
// ============================================
const Contact = memo(() => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, sending, success, error
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setErrorMsg(data.error || 'Something went wrong');
      }
    } catch (error) {
      setStatus('error');
      setErrorMsg('Network error. Please try again.');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="section_contact">
      {/* Left Column: Heading */}
      <div className="contact_heading-wrapper">
        <h2 className="contact_heading">
          LEAVE<br />
          YOUR<br />
          CONTACT<br />
          BELOW
        </h2>
      </div>

      {/* Right Column: Content */}
      <div className="contact_content-wrapper">
        {/* Info Section */}
        <div className="contact_info-wrapper">
          <h3 className="contact_subheading">Contact Us</h3>
          <p className="contact_description">
            Interested in working together? Whether you have a project in mind, need creative direction or want to discuss a collaboration — reach out. I'll get back to you as soon as possible.
          </p>

          {/* Social Dots */}
          <div className="social-dots-wrapper">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`social-dot is-${social.name.toLowerCase()}`}
                data-social={social.name}
              >
                <span className="social-icon"></span>
              </a>
            ))}
          </div>
        </div>

        {/* Form Section */}
        <div className="contact_form-wrapper">
          {status === 'success' ? (
            <div className="form-success">
              Thank you! Your message has been sent.
            </div>
          ) : (
            <form className="contact_form" onSubmit={handleSubmit}>
              <input
                className="form_input"
                type="text"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                className="form_input"
                type="email"
                name="email"
                placeholder="Your email address"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <textarea
                className="form_textarea"
                name="message"
                placeholder="Leave your Message here"
                value={formData.message}
                onChange={handleChange}
                required
              />
              {status === 'error' && (
                <div className="form-error">{errorMsg}</div>
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
    </section>
  );
});

Contact.displayName = 'Contact';

export default Contact;
