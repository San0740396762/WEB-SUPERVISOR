
document.addEventListener('DOMContentLoaded', function() {
  // Check authentication
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (!currentUser || currentUser.role !== 'admin') {
    window.location.href = '../auth/index.html';
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
  document.getElementById('logout-button').addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('currentUser');
    showToast('Success', 'You have been logged out successfully');
    setTimeout(() => {
      window.location.href = '../auth/index.html';
    }, 1000);
  });

  // Initialize charts
  initializeCharts();

  // Load recent activity
  loadRecentActivity();
});

// Mock data for charts
function initializeCharts() {
  // Enrollment trends chart
  const enrollmentCtx = document.getElementById('enrollment-chart').getContext('2d');
  new Chart(enrollmentCtx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        label: 'Student Enrollment',
        data: [2100, 2300, 2400, 2450, 2500, 2543],
        borderColor: '#0a2240',
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    }
  });

  // Grade distribution chart
  const gradesCtx = document.getElementById('grades-chart').getContext('2d');
  new Chart(gradesCtx, {
    type: 'bar',
    data: {
      labels: ['A', 'B', 'C', 'D', 'F'],
      datasets: [{
        label: 'Grade Distribution',
        data: [35, 45, 15, 4, 1],
        backgroundColor: '#c5a900'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    }
  });
}

// Mock recent activity data
const recentActivities = [
  {
    title: 'New Course Added',
    description: 'CS 401: Advanced Programming',
    time: '2 hours ago',
    icon: 'book'
  },
  {
    title: 'Grade Updated',
    description: 'MATH 240: Calculus II',
    time: '4 hours ago',
    icon: 'graduation-cap'
  },
  {
    title: 'New Student Enrolled',
    description: 'Sarah Johnson joined CS Department',
    time: '5 hours ago',
    icon: 'user'
  }
];

function loadRecentActivity() {
  const activityList = document.getElementById('activity-list');
  
  recentActivities.forEach(activity => {
    const activityItem = document.createElement('div');
    activityItem.className = 'activity-item';
    activityItem.innerHTML = `
      <div class="activity-icon">
        <i class="fas fa-${activity.icon}"></i>
      </div>
      <div class="activity-details">
        <div class="activity-title">${activity.title}</div>
        <div class="activity-description">${activity.description}</div>
        <div class="activity-time">${activity.time}</div>
      </div>
    `;
    activityList.appendChild(activityItem);
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
