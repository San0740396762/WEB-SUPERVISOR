
// Handle sidebar toggle
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebar-toggle');

sidebarToggle.addEventListener('click', () => {
  sidebar.classList.toggle('collapsed');
  
  // Save preference to localStorage
  localStorage.setItem('sidebarCollapsed', sidebar.classList.contains('collapsed'));
});

// Load sidebar state from localStorage
const sidebarCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
if (sidebarCollapsed) {
  sidebar.classList.add('collapsed');
}

const tableSection = document.querySelector('#user-table-section');
const table = document.querySelector('.user-table');

tableSection.addEventListener('scroll', () => {
  table.querySelector('thead').style.transform = `translateX(${-tableSection.scrollLeft}px)`;
});