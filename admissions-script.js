
// Admissions Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navbarToggler = document.getElementById('navbarToggler');
    const navbarMenu = document.getElementById('navbarMenu');
    
    if (navbarToggler && navbarMenu) {
        navbarToggler.addEventListener('click', function() {
            navbarMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (navbarMenu && navbarMenu.classList.contains('active')) {
                    navbarMenu.classList.remove('active');
                    navbarToggler.classList.remove('active');
                }
            }
        });
    });

    // Tab Navigation
    const tabLinks = document.querySelectorAll('.tab-link');
    const sections = document.querySelectorAll('section[id]');

    tabLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all tabs
            tabLinks.forEach(tab => tab.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Get target section
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Smooth scroll to target
                const headerOffset = 120;
                const elementPosition = targetElement.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Update active tab on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        tabLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // Accordion Functionality
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const accordionItem = this.parentElement;
            const accordionContent = accordionItem.querySelector('.accordion-content');
            const accordionIcon = this.querySelector('.accordion-icon i');
            
            // Close all other accordion items
            accordionHeaders.forEach(otherHeader => {
                if (otherHeader !== header) {
                    const otherItem = otherHeader.parentElement;
                    const otherContent = otherItem.querySelector('.accordion-content');
                    const otherIcon = otherHeader.querySelector('.accordion-icon i');
                    
                    otherContent.style.display = 'none';
                    otherIcon.classList.remove('fa-minus');
                    otherIcon.classList.add('fa-plus');
                }
            });
            
            // Toggle current accordion item
            if (accordionContent.style.display === 'block') {
                accordionContent.style.display = 'none';
                accordionIcon.classList.remove('fa-minus');
                accordionIcon.classList.add('fa-plus');
            } else {
                accordionContent.style.display = 'block';
                accordionIcon.classList.remove('fa-plus');
                accordionIcon.classList.add('fa-minus');
            }
        });
    });

    // Scholarship Tabs
    const scholarshipTabButtons = document.querySelectorAll('.tab-button');
    const scholarshipTabPanes = document.querySelectorAll('.tab-pane');
    
    scholarshipTabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and panes
            scholarshipTabButtons.forEach(btn => btn.classList.remove('active'));
            scholarshipTabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button and corresponding pane
            this.classList.add('active');
            document.getElementById(targetTab + '-tab').classList.add('active');
        });
    });

    // Testimonials Slider
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const sliderDots = document.querySelectorAll('.dot');
    const prevButton = document.querySelector('.slider-prev');
    const nextButton = document.querySelector('.slider-next');
    let currentSlide = 0;

    function showSlide(index) {
        // Hide all testimonials
        testimonialCards.forEach(card => card.style.display = 'none');
        sliderDots.forEach(dot => dot.classList.remove('active'));
        
        // Show current testimonial
        if (testimonialCards[index]) {
            testimonialCards[index].style.display = 'flex';
            sliderDots[index].classList.add('active');
        }
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % testimonialCards.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + testimonialCards.length) % testimonialCards.length;
        showSlide(currentSlide);
    }

    // Initialize slider
    if (testimonialCards.length > 0) {
        showSlide(0);
        
        // Auto-advance slider
        setInterval(nextSlide, 5000);
        
        // Navigation buttons
        if (nextButton) nextButton.addEventListener('click', nextSlide);
        if (prevButton) prevButton.addEventListener('click', prevSlide);
        
        // Dot navigation
        sliderDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
            });
        });
    }

    // Cost Calculator
    const costCalculatorForm = document.getElementById('costCalculatorForm');
    const calculatorResults = document.getElementById('calculatorResults');
    
    if (costCalculatorForm) {
        costCalculatorForm.addEventListener('submit', function(e) {
            e.preventDefault();
            calculateCosts();
        });
        
        costCalculatorForm.addEventListener('reset', function() {
            calculatorResults.style.display = 'none';
        });
    }

    function calculateCosts() {
        const studentType = document.getElementById('studentType').value;
        const residency = document.getElementById('residency').value;
        const housing = document.getElementById('housing').value;
        const gpa = parseFloat(document.getElementById('gpa').value) || 0;
        const testScore = parseInt(document.getElementById('testScore').value) || 0;
        
        // Base costs
        let tuition = 0;
        let roomBoard = 0;
        const books = 1200;
        
        // Calculate tuition based on student type and residency
        if (studentType === 'undergraduate') {
            tuition = residency === 'inState' ? 12000 : 28000;
        } else if (studentType === 'graduate') {
            tuition = residency === 'inState' ? 15000 : 32000;
        } else if (studentType === 'international') {
            tuition = 35000;
        }
        
        // Calculate room and board
        if (housing === 'onCampus') {
            roomBoard = 12000;
        } else if (housing === 'offCampus') {
            roomBoard = 8000;
        } else {
            roomBoard = 0;
        }
        
        // Calculate potential scholarships based on merit
        let scholarships = 0;
        if (gpa >= 3.8 && testScore >= 1400) {
            scholarships = 25000; // Presidential Scholarship
        } else if (gpa >= 3.5 && testScore >= 1300) {
            scholarships = 15000; // Dean's Scholarship
        } else if (gpa >= 3.3 && testScore >= 1200) {
            scholarships = 10000; // Academic Achievement Award
        }
        
        const totalCost = tuition + roomBoard + books;
        const netCost = Math.max(0, totalCost - scholarships);
        
        // Display results
        document.getElementById('tuitionResult').textContent = '$' + tuition.toLocaleString();
        document.getElementById('housingResult').textContent = '$' + roomBoard.toLocaleString();
        document.getElementById('booksResult').textContent = '$' + books.toLocaleString();
        document.getElementById('totalCostResult').textContent = '$' + totalCost.toLocaleString();
        document.getElementById('scholarshipsResult').textContent = '$' + scholarships.toLocaleString();
        document.getElementById('netCostResult').textContent = '$' + netCost.toLocaleString();
        
        calculatorResults.style.display = 'block';
        calculatorResults.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Form Submissions
    const infoRequestForm = document.getElementById('infoRequestForm');
    
    if (infoRequestForm) {
        infoRequestForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Collect form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Simulate form submission
            alert('Thank you for your interest! We will contact you soon with more information.');
            this.reset();
        });
    }

    // Scroll to Top functionality
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--university-burgundy);
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        cursor: pointer;
        display: none;
        z-index: 1000;
        box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Animate elements on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.requirement-card, .program-card, .service-card, .scholarship-card, .step-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

    // Update current year in footer
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    console.log('Admissions page JavaScript loaded successfully');
});

// Utility functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\+]?[1-9][\d]{0,15}$/;
    return re.test(phone.replace(/\s/g, ''));
}
