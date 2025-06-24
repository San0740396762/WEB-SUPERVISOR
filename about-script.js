
// Set current year in footer
document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  const currentYearElement = document.getElementById('current-year');
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }

  // Mobile menu toggle
  const navbarToggler = document.getElementById('navbarToggler');
  const navbarMenu = document.getElementById('navbarMenu');

  if (navbarToggler && navbarMenu) {
    navbarToggler.addEventListener('click', function() {
      navbarMenu.classList.toggle('active');
    });
  }

  // Smooth scrolling for tab navigation
  const tabLinks = document.querySelectorAll('.tab-link');
  
  tabLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Get the height of the navbar and tabs
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const tabsHeight = document.querySelector('.nav-tabs').offsetHeight;
        const offset = navbarHeight + tabsHeight + 20; // Adding extra padding
        
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  
  // Handle dropdown toggle for mobile
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  
  if (window.innerWidth < 768) {
    dropdownToggles.forEach(toggle => {
      toggle.addEventListener('click', function(e) {
        e.preventDefault();
        const dropdownMenu = this.nextElementSibling;
        dropdownMenu.classList.toggle('show');
      });
    });
  }

  // Add CSS class for active tab link styling
  const style = document.createElement('style');
  style.textContent = `
    .tab-link.active {
      color: var(--university-burgundy);
      font-weight: 600;
      border-bottom: 2px solid var(--university-burgundy);
    }
  `;
  document.head.appendChild(style);
});
