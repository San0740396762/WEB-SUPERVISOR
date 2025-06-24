
document.addEventListener('DOMContentLoaded', function() {
  // Check authentication
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (!currentUser || currentUser.role !== 'admin') {
    window.location.href = '../auth.html';
    return;
  }

  // Set user information
  document.getElementById('user-name').textContent = `${currentUser.firstName} ${currentUser.lastName}`;
  document.getElementById('user-email').textContent = currentUser.email;
  
  // Set user initials for avatar
  const initials = `${currentUser.firstName.charAt(0)}${currentUser.lastName.charAt(0)}`;
  document.getElementById('user-initials').textContent = initials;

  // Handle sidebar toggle
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebar-toggle');
  
  sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    localStorage.setItem('sidebarCollapsed', sidebar.classList.contains('collapsed'));
  });
  
  // Load sidebar state from localStorage
  const sidebarCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
  if (sidebarCollapsed) {
    sidebar.classList.add('collapsed');
  }

  // Handle logout
  // logout function
  function logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');
    localStorage.removeItem('JWT_TOKEN');
    showToast('Info', 'Logged out successfully!');
    setTimeout(() => {
      window.location.href = '../auth/login.html';
    }, 1000);
  }

  const logoutButton = document.getElementById('logout-button');
  if (logoutButton) {
    logoutButton.addEventListener('click', logout);
  }

  // Initialize charts
  initializeCharts();

  // Load recent activity
  loadRecentActivity();
});

document.addEventListener("DOMContentLoaded", () => {
  loadDashboardStats();
  renderCharts();
  loadActivityLog();
});

async function loadDashboardStats() {
  try {
    const res = await fetch('https://binarywizard.pythonanywhere.com/api/admin/dashboard');
    const data = await res.json();

    document.getElementById('total-students').textContent = data.students;
    document.getElementById('competency-progress').textContent = `${data.competencyCompletion}%`;
    document.getElementById('total-assessors').textContent = data.assessors;
    document.getElementById('modules-progress').textContent = data.modules;

  } catch (err) {
    console.error("Failed to load dashboard stats:", err);
  }
}

function renderCharts() {
  renderEnrollmentChart();
  renderCompetencyChart();
}

function renderEnrollmentChart() {
  new Chart(document.getElementById('enrollmentChart'), {
    type: 'bar',
    data: {
      labels: ['ICT', 'Business', 'Electrical', 'Social Work'],
      datasets: [{
        label: 'Students',
        data: [120, 80, 45, 70],
        backgroundColor: '#4e73df'
      }]
    }
  });
}

function renderCompetencyChart() {
  new Chart(document.getElementById('competencyChart'), {
    type: 'doughnut',
    data: {
      labels: ['Completed', 'In Progress', 'Not Started'],
      datasets: [{
        data: [60, 25, 15],
        backgroundColor: ['#1cc88a', '#f6c23e', '#e74a3b']
      }]
    }
  });
}

async function loadActivityLog() {
  const res = await fetch('https://binarywizard.pythonanywhere.com//api/admin/activity');
  const logs = await res.json();
  const container = document.getElementById('activity-list');
  container.innerHTML = '';

  logs.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.timestamp}: ${item.action}`;
    container.appendChild(li);
  });
}


// Toast notification function
function showToast(title, description, isError = false) {
  const toastContainer = document.getElementById('toast-container');
  
  const toast = document.createElement('div');
  toast.className = `toast ${isError ? 'toast-error' : ''}`;
  
  toast.innerHTML = `
    <div>
      <div class="toast-title">${title}</div>
      <div class="toast-description">${description}</div>
    </div>
  `;
  
  toastContainer.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = 'slideOut 0.3s ease forwards';
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 5000);
}

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
