document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");
  
    let autoCloseTimer;
  
    toggleBtn.addEventListener("click", () => {
      navMenu.classList.toggle("active");
  
      if (navMenu.classList.contains("active")) {
        autoCloseTimer = setTimeout(() => {
          navMenu.classList.remove("active");
        }, 3000); // 3000ms = 3 seconds
      } else {
        clearTimeout(autoCloseTimer);
      }
    });
  
    // Optional: close immediately on link click
    document.querySelectorAll(".nav-menu a").forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        clearTimeout(autoCloseTimer);
      });
    });
  });
  