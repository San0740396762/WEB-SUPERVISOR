(function() {
    // Polyfill for NodeList.forEach (IE11)
    if (window.NodeList && !NodeList.prototype.forEach) {
        NodeList.prototype.forEach = Array.prototype.forEach;
    }

    document.addEventListener('DOMContentLoaded', function() {
        // Mobile navigation toggle
        var navbarToggler = document.getElementById('navbarToggler');
        var navbarMenu = document.getElementById('navbarMenu');

        if (navbarToggler && navbarMenu) {
            navbarToggler.addEventListener('click', function() {
                navbarMenu.classList.toggle('active');
                var expanded = this.getAttribute('aria-expanded') === 'true';
                this.setAttribute('aria-expanded', !expanded);
            });
        }

        // Mobile dropdown toggle
        var dropdownToggles = document.querySelectorAll('.dropdown-toggle');

        dropdownToggles.forEach(function(toggle) {
            toggle.addEventListener('click', function(e) {
                if (window.innerWidth < 768) {
                    e.preventDefault();
                    var dropdownMenu = this.nextElementSibling;
                    if (!dropdownMenu) return;

                    // Close other open dropdowns
                    document.querySelectorAll('.dropdown-menu.show').forEach(function(menu) {
                        if (menu !== dropdownMenu) {
                            menu.classList.remove('show');
                            var relatedToggle = menu.previousElementSibling;
                            if (relatedToggle) relatedToggle.setAttribute('aria-expanded', 'false');
                        }
                    });

                    // Toggle this dropdown
                    var isShown = dropdownMenu.classList.toggle('show');
                    this.setAttribute('aria-expanded', isShown ? 'true' : 'false');
                }
            });
        });

        // Close mobile menu on window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth >= 768 && navbarMenu.classList.contains('active')) {
                navbarMenu.classList.remove('active');
                if (navbarToggler) navbarToggler.setAttribute('aria-expanded', 'false');

                // Hide all opened dropdown menus
                document.querySelectorAll('.dropdown-menu.show').forEach(function(menu) {
                    menu.classList.remove('show');
                    var relatedToggle = menu.previousElementSibling;
                    if (relatedToggle) relatedToggle.setAttribute('aria-expanded', 'false');
                });
            }
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (
                window.innerWidth < 768 &&
                !e.target.closest('#navbarToggler') &&
                !e.target.closest('#navbarMenu') &&
                navbarMenu.classList.contains('active')
            ) {
                navbarMenu.classList.remove('active');
                if (navbarToggler) navbarToggler.setAttribute('aria-expanded', 'false');
            }
        });

        // Set current year in footer
        var yearElement = document.getElementById('current-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }

        // Scroll animations
        var animateElements = document.querySelectorAll('.animate-fade-in');

        var animateOnScroll = function() {
            animateElements.forEach(function(element) {
                var elementPosition = element.getBoundingClientRect().top;
                var windowHeight = window.innerHeight;

                if (elementPosition < windowHeight - 50) {
                    element.style.animation = 'fadeIn 0.5s ease-out forwards';
                }
            });
        };

        // Run once on page load
        animateOnScroll();

        // Run on scroll (optional: debounce for better performance)
        window.addEventListener('scroll', animateOnScroll);

        // Smooth scroll for student life page anchor links
        var studentLifeLinks = document.querySelectorAll('.student-life-nav a');

        studentLifeLinks.forEach(function(link) {
            link.addEventListener('click', function(e) {
                var targetId = this.getAttribute('href').substring(1);
                var targetElement = document.getElementById(targetId);

                if (targetElement) {
                    e.preventDefault();

                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Gallery image lightbox
        var galleryImages = document.querySelectorAll('.gallery-image');
        var lightbox = document.getElementById('gallery-lightbox');

        if (galleryImages.length > 0 && lightbox) {
            var lightboxImage = lightbox.querySelector('img');
            var lightboxClose = lightbox.querySelector('.lightbox-close');

            galleryImages.forEach(function(image) {
                image.addEventListener('click', function() {
                    var imgSrc = this.getAttribute('src');
                    lightboxImage.setAttribute('src', imgSrc);
                    lightbox.classList.add('active');
                });
            });

            if (lightboxClose) {
                lightboxClose.addEventListener('click', function() {
                    lightbox.classList.remove('active');
                });
            }

            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox) {
                    lightbox.classList.remove('active');
                }
            });
        }

        // Document click listener to close dropdowns on mobile when clicking outside
        document.addEventListener('click', function(event) {
            // Only on mobile width
            if (window.innerWidth >= 768) return;

            var isClickInsideDropdownToggle = event.target.closest('.dropdown-toggle');
            var isClickInsideDropdownMenu = event.target.closest('.dropdown-menu');

            if (!isClickInsideDropdownToggle && !isClickInsideDropdownMenu) {
                // Close all open dropdown menus
                document.querySelectorAll('.dropdown-menu.show').forEach(function(menu) {
                    menu.classList.remove('show');
                    var relatedToggle = menu.previousElementSibling;
                    if (relatedToggle && relatedToggle.classList.contains('dropdown-toggle')) {
                        relatedToggle.setAttribute('aria-expanded', 'false');
                    }
                });
            }
        });

    });
})();



