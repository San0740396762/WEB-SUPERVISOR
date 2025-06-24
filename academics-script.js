
// Set current year in footer and initialize page functionality
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

  // Highlight active tab based on scroll position
  const sections = document.querySelectorAll('section[id]');
  
  function highlightActiveTab() {
    const navbarHeight = document.querySelector('.navbar').offsetHeight;
    const tabsHeight = document.querySelector('.nav-tabs').offsetHeight;
    const scrollPosition = window.scrollY + navbarHeight + tabsHeight + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        document.querySelectorAll('.tab-link').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  
  window.addEventListener('scroll', highlightActiveTab);
  highlightActiveTab(); // Run once on page load
  
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

  // Department filtering
  const filterButtons = document.querySelectorAll('.filter-btn');
  const departmentItems = document.querySelectorAll('.department-item');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      button.classList.add('active');
      
      // Get faculty filter value
      const faculty = button.getAttribute('data-faculty');
      
      // Filter departments
      departmentItems.forEach(item => {
        if (faculty === 'all' || item.getAttribute('data-faculty') === faculty) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Programs tab switching
  const programTabButtons = document.querySelectorAll('.tab-button');
  const programTabPanes = document.querySelectorAll('.tab-pane');
  
  programTabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons and panes
      programTabButtons.forEach(btn => btn.classList.remove('active'));
      programTabPanes.forEach(pane => pane.classList.remove('active'));
      
      // Add active class to clicked button
      button.classList.add('active');
      
      // Show corresponding tab pane
      const tabId = button.getAttribute('data-tab');
      document.getElementById(tabId + '-tab').classList.add('active');
    });
  });

  // Academic Calendar Year Switching
  const calendarYearButtons = document.querySelectorAll('.calendar-tab-button');
  const calendarYearPanes = document.querySelectorAll('.calendar-pane');
  
  calendarYearButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons and panes
      calendarYearButtons.forEach(btn => btn.classList.remove('active'));
      calendarYearPanes.forEach(pane => pane.classList.remove('active'));
      
      // Add active class to clicked button
      button.classList.add('active');
      
      // Show corresponding year pane
      const yearId = button.getAttribute('data-year');
      document.getElementById('year-' + yearId).classList.add('active');
    });
  });

  // Semester Switching
  const semesterButtons = document.querySelectorAll('.semester-button');
  const semesterPanes = document.querySelectorAll('.semester-pane');
  
  semesterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Find the parent semester-selector to only activate within current year view
      const parentSelector = button.closest('.semester-selector');
      
      // Get all semester buttons and panes within this year
      const yearButtons = parentSelector.querySelectorAll('.semester-button');
      const yearContent = button.closest('.calendar-pane').querySelector('.semester-content');
      const yearPanes = yearContent.querySelectorAll('.semester-pane');
      
      // Remove active class from all buttons and panes in this year
      yearButtons.forEach(btn => btn.classList.remove('active'));
      yearPanes.forEach(pane => pane.classList.remove('active'));
      
      // Add active class to clicked button
      button.classList.add('active');
      
      // Show corresponding semester pane
      const semesterId = button.getAttribute('data-semester');
      yearContent.querySelector('#' + semesterId).classList.add('active');
    });
  });

  // Program search functionality
  const programSearchInputs = document.querySelectorAll('.program-search-input');
  
  programSearchInputs.forEach(input => {
    input.addEventListener('keyup', function() {
      const searchTerm = this.value.toLowerCase();
      const tabPane = this.closest('.tab-pane');
      const programCards = tabPane.querySelectorAll('.program-card');
      
      programCards.forEach(card => {
        const title = card.querySelector('.program-title').textContent.toLowerCase();
        const faculty = card.querySelector('.program-faculty').textContent.toLowerCase();
        const description = card.querySelector('.program-description').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || faculty.includes(searchTerm) || description.includes(searchTerm)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
  
  // Add animation classes to elements as they come into view
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.faculty-card, .department-item, .program-card, .resource-card');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.2;
      
      if (elementPosition < screenPosition) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };
  
  // Initialize animation styles
  const elements = document.querySelectorAll('.faculty-card, .department-item, .program-card, .resource-card');
  elements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.5s ease-out';
  });
  
  // Run animations on scroll and on page load
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); // Run once on page load
});
