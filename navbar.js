fetch('navbar.html')
    .then(res => res.text())
    .then(data => {
    document.getElementById('navbar-placeholder').innerHTML = data;

    // Highlight active page
    const currentPage = location.pathname.split('/').pop();
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
        }
    });
});