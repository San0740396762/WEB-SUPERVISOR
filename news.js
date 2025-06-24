
document.addEventListener('DOMContentLoaded', function() {
  // Navbar toggle functionality
  const navbarToggler = document.getElementById('navbarToggler');
  const navbarMenu = document.getElementById('navbarMenu');
  
  if (navbarToggler) {
    navbarToggler.addEventListener('click', function() {
      navbarMenu.classList.toggle('active');
    });
  }

  // Filter functionality
  const searchInput = document.querySelector('.search-input');
  const categorySelect = document.querySelector('.filter-select:nth-child(1)');
  const sortSelect = document.querySelector('.filter-select:nth-child(2)');
  const newsCards = document.querySelectorAll('.news-card');

  function filterNews() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categorySelect.value;

    newsCards.forEach(card => {
      const title = card.querySelector('.news-title').textContent.toLowerCase();
      const category = card.querySelector('.news-category').textContent.toLowerCase();
      const matchesSearch = title.includes(searchTerm);
      const matchesCategory = selectedCategory === '' || selectedCategory === 'all' || category === selectedCategory;

      card.style.display = matchesSearch && matchesCategory ? 'block' : 'none';
    });
  }

  searchInput.addEventListener('input', filterNews);
  categorySelect.addEventListener('change', filterNews);
  sortSelect.addEventListener('change', function() {
    const newsGrid = document.querySelector('.news-grid');
    const cards = Array.from(newsCards);
    
    cards.sort((a, b) => {
      const dateA = new Date(a.querySelector('.news-date').textContent);
      const dateB = new Date(b.querySelector('.news-date').textContent);
      return this.value === 'latest' ? dateB - dateA : dateA - dateB;
    });

    cards.forEach(card => newsGrid.appendChild(card));
  });
});
