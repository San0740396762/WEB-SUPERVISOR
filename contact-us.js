document.addEventListener('DOMContentLoaded', function() {
  // Initialize Intersection Observer for scroll animations
  const animateElements = document.querySelectorAll('.animate-on-scroll');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible'); 
      }
    });
  }, { threshold: 0.1 });

  animateElements.forEach(element => {
    observer.observe(element);
  });

  // Form Validation
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      let valid = true;

      // Reset errors
      document.querySelectorAll('.error-message').forEach(el => el.remove());
      document.querySelectorAll('.form-group input, .form-group textarea').forEach(el => {
        el.style.borderColor = '#ddd';
      });

      // Validate fields
      const fields = {
        name: { min: 2, message: 'Name must be at least 2 characters' },
        email: { pattern: 'email', message: 'Please enter a valid email address' },
        subject: { min: 5, message: 'Subject must be at least 5 characters' },
        message: { min: 10, message: 'Message must be at least 10 characters' }
      };

      Object.entries(fields).forEach(([id, rules]) => {
        const field = document.getElementById(id);
        const value = field.value.trim();

        if (rules.min && value.length < rules.min) {
          addError(field, rules.message);
          valid = false;
        }

        if (rules.pattern === 'email' && !isValidEmail(value)) {
          addError(field, rules.message);
          valid = false;
        }
      });

      if (valid) {
        showToast('Message Sent!', 'We\'ll respond within 24 business hours');
        contactForm.reset();
      }
    });
  }

  // Error Handling
  function addError(field, message) {
    field.style.borderColor = 'var(--university-burgundy)';
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = 'var(--university-burgundy)';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.5rem';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
  }

  // Email Validation
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // Toast Notification
  function showToast(title, message) {
    const toast = document.createElement('div');
    toast.style.cssText = `
      position: fixed;
      top: 1.5rem;
      right: 1.5rem;
      background: var(--university-burgundy);
      color: var(--university-light);
      padding: 1rem 1.5rem;
      border-radius: var(--border-radius);
      box-shadow: var(--box-shadow);
      z-index: 1000;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      opacity: 0;`;
    toast.innerHTML = `
      <strong>${title}</strong>
      <p>${message}</p>
      <button style="background: none; border: none; color: var(--university-light); cursor: pointer;">Close</button>`;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = 1;
    }
    , 100);
    toast.querySelector('button').addEventListener('click', () => {
      toast.style.opacity = 0;
      setTimeout(() => {
        toast.remove();
      }, 300);
    }
    );
    setTimeout(() => {
      toast.style.opacity = 0;
      setTimeout(() => {
        toast.remove();
      }, 300);
    }
    , 5000);
  }
  // Scroll Animation
  const animateOnScroll = () => {
    const windowHeight = window.innerHeight;
    animateElements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      // Check if the element is in the viewport
      if (elementPosition < windowHeight - 50) {
        element.classList.add('animate-fade-in');
      }
    });
  };
  
  // Run once on page load
  animateOnScroll();
  
  // Run on scroll
  window.addEventListener('scroll', animateOnScroll);
});

