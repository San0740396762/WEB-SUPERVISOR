
// Mock data for resources
const resources = [
  {
    id: 1,
    category: 'academic',
    name: 'Library Database',
    description: 'Access millions of academic journals, books, and research papers.',
    link: '#'
  },
  {
    id: 2,
    category: 'technology',
    name: 'Student Software Hub',
    description: 'Download free software and tools for your academic needs.',
    link: '#'
  },
  {
    id: 3,
    category: 'campus',
    name: 'Student Health Services',
    description: 'Schedule appointments and access health resources.',
    link: '#'
  },
  // Add more resources as needed
];

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (!currentUser) {
    // Redirect to login page if not logged in
    window.location.href = '/portal/auth.html';
    return;
  }

  // Set user information
  document.getElementById('user-name').textContent = `${currentUser.firstName} ${currentUser.lastName}`;
  
  // Set user initials for avatar
  const initials = `${currentUser.firstName.charAt(0)}${currentUser.lastName.charAt(0)}`;
  

  const user = currentUser;
  const userName = document.getElementById('user-name');
  const userInitials = document.getElementById('user-initials');
  
  // Set user info
  userName.textContent = `${currentUser.firstName} ${currentUser.lastName}`;
  userInitials.textContent = initials;

  // Initialize resources
  displayResources(resources);
  
  // Setup search functionality
  const searchInput = document.getElementById('resource-search');
  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredResources = resources.filter(resource => 
      resource.name.toLowerCase().includes(searchTerm) ||
      resource.description.toLowerCase().includes(searchTerm)
    );
    displayResources(filteredResources);
  });

  // Setup tabs
  const tabs = document.querySelectorAll('.tab-trigger');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Update active tab
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Filter resources by category
      const category = tab.dataset.tab;
      const filteredResources = category === 'all' 
        ? resources 
        : resources.filter(r => r.category === category);
      
      displayResources(filteredResources);

      // Show/hide empty state for saved tab
      const savedTab = document.getElementById('saved-tab');
      if (category === 'saved') {
        savedTab.classList.add('active');
        document.getElementById('all-tab').classList.remove('active');
      } else {
        savedTab.classList.remove('active');
        document.getElementById('all-tab').classList.add('active');
      }
    });
  });

  // Setup logout
  const logoutButton = document.getElementById('logout-button');
  logoutButton.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('user');
    window.location.href = '/portal/auth.html';
  });
});

// Function to display resources
function displayResources(resources) {
  const container = document.getElementById('resources-container');
  container.innerHTML = '';

  resources.forEach(resource => {
    const card = document.createElement('div');
    card.className = 'resource-card';
    card.innerHTML = `
      <div class="resource-card-header">
        <h3 class="resource-title">${resource.name}</h3>
        <button class="bookmark-button">
          <i class="fas fa-bookmark"></i>
        </button>
      </div>
      <p class="resource-description">${resource.description}</p>
      <a href="${resource.link}" class="resource-link">
        Visit Resource
        <i class="fas fa-external-link-alt"></i>
      </a>
    `;

    // Setup bookmark functionality
    const bookmarkButton = card.querySelector('.bookmark-button');
    bookmarkButton.addEventListener('click', () => {
      bookmarkButton.classList.toggle('active');
      // Here you would typically save this to localStorage or a backend
    });

    container.appendChild(card);
  });
}
