
// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', function() {
  const navbarToggler = document.getElementById('navbarToggler');
  const navbarMenu = document.getElementById('navbarMenu');
  
  if (navbarToggler && navbarMenu) {
    navbarToggler.addEventListener('click', function() {
      navbarMenu.classList.toggle('active');
    });
  }
  
  // Mobile dropdown toggle
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function(e) {
      if (window.innerWidth < 768) {
        e.preventDefault();
        const dropdownMenu = this.nextElementSibling;
        dropdownMenu.classList.toggle('show');
      }
    });
  });
  
  // Close mobile menu on window resize
  window.addEventListener('resize', function() {
    if (window.innerWidth >= 768 && navbarMenu.classList.contains('active')) {
      navbarMenu.classList.remove('active');
      
      // Hide all opened dropdown menus
      document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
        menu.classList.remove('show');
      });
    }
  });
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', function(e) {
    if (
      window.innerWidth < 768 &&
      !e.target.closest('.navbar-toggler') &&
      !e.target.closest('.navbar-menu') &&
      navbarMenu.classList.contains('active')
    ) {
      navbarMenu.classList.remove('active');
    }
  });
  
  // Set current year in footer
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
  
  // Scroll animations
  const animateElements = document.querySelectorAll('.animate-fade-in');
  
  const animateOnScroll = function() {
    animateElements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementPosition < windowHeight - 50) {
        element.style.animation = 'fadeIn 0.5s ease-out forwards';
      }
    });
  };
  
  // Run once on page load
  animateOnScroll();
  
  // Run on scroll
  window.addEventListener('scroll', animateOnScroll);
});
