document.addEventListener('DOMContentLoaded', () => {
  // Lightbox open
  const gallery = document.querySelectorAll('.gallery-item');
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = lightbox?.querySelector('img');
  const caption = lightbox?.querySelector('.caption');

  gallery.forEach(item => {
    item.addEventListener('click', (e) => {
      const img = item.querySelector('img');
      const src = img.dataset.large || img.src;
      const alt = img.alt || '';
      if (!lightbox) return;
      lightboxImg.src = src;
      lightboxImg.alt = alt;
      caption.textContent = alt;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
      lightbox.focus();
    });
  });

  // close handlers
  const closeLB = () => {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    lightboxImg.src = '';
  };

  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.id === 'lb-close') closeLB();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLB();
  });

  // CONTACT FORM - client-side validation & mock submission
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const form = e.target;
      const name = form.querySelector('[name="name"]');
      const email = form.querySelector('[name="email"]');
      const phone = form.querySelector('[name="phone"]');
      const message = form.querySelector('[name="message"]');

      // simple validation
      let errors = [];
      if (!name.value.trim()) errors.push('Please enter your name.');
      if (!/^\S+@\S+\.\S+$/.test(email.value)) errors.push('Please enter a valid email.');
      if (!message.value.trim()) errors.push('Please enter a message.');

      const feedback = form.querySelector('.form-feedback');
      if (errors.length) {
        feedback.innerHTML = '<div style="color:#b00">' + errors.join('<br>') + '</div>';
        return;
      }

      // MOCK submission — replace with your backend (Formspree/Netlify/email API)
      feedback.innerHTML = 'Sending...';
      try {
        // Example: send to Formspree (replace ACTION_URL with your endpoint)
        const ACTION_URL = form.action || '';
        if (ACTION_URL) {
          await fetch(ACTION_URL, {
            method:'POST',
            body: new FormData(form),
            headers: { 'Accept':'application/json' }
          });
          feedback.innerHTML = '<div style="color:green">Thank you — your message has been sent.</div>';
          form.reset();
        } else {
          // If no action configured, just simulate success
          await new Promise(r => setTimeout(r, 800));
          feedback.innerHTML = '<div style="color:green">Thanks! (This is a local demo. Hook up a form endpoint in the form "action" attribute to send real emails.)</div>';
          form.reset();
        }
      } catch (err) {
        feedback.innerHTML = '<div style="color:#b00">Error sending message. Try again later.</div>';
      }
    });
  }
});