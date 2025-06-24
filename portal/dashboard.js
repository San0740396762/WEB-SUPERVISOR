
document.addEventListener('DOMContentLoaded', function() {
  // Check authentication
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (!currentUser) {
    // Redirect to login page if not logged in
    window.location.href = '/portal/auth';
    return;
  }

  // Set user information
  document.getElementById('user-name').textContent = `${currentUser.firstName} ${currentUser.lastName}`;
  document.getElementById('welcome-name').textContent = currentUser.firstName;
  
  // Set user initials for avatar
  const initials = `${currentUser.firstName.charAt(0)}${currentUser.lastName.charAt(0)}`;
  document.getElementById('user-initials').textContent = initials;

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

  // Handle logout
  document.getElementById('logout-button').addEventListener('click', (e) => {
    e.preventDefault();
    
    // Clear user data from localStorage
    localStorage.removeItem('currentUser');
    
    // Show logout message
    showToast('Success', 'You have been logged out successfully');
    
    // Redirect to login page after a brief delay
    setTimeout(() => {
      window.location.href = 'auth';
    }, 1000);
  });



  // Mock course data
  const courses = [
    {
      id: 'cs101',
      code: 'CS 101',
      name: 'Introduction to Digital Literacy',
      instructor: 'Mr. Hosea Kiplangat',
      progress: 65,
      credits: 3,
      schedule: '10:00 AM - 11:15 AM',
      location: 'CLB',
      nextAssignment: {
        title: 'Midterm Exam',
        dueDate: 'April 18, 2025'
      }
    },
    {
      id: 'math240',
      code: ' MATH 240',
      name: 'Numeracy Skills',
      instructor: 'Mr. Mathias',
      progress: 78,
      credits: 4,
      schedule: 'TTh 1:00 PM - 2:30 PM',
      location: 'Cr 1',
      nextAssignment: {
        title: 'Problem Set 7',
        dueDate: 'April 21, 2025'
      }
    },
    {
      id: 'eng220',
      code: 'ENG 220',
      name: 'communication Skills',
      instructor: 'Md. Thabita',
      progress: 42,
      credits: 3,
      schedule: 'MWF 2:00 PM - 3:15 PM',
      location: 'CR 5',
      nextAssignment: null
    },
    {
      id: 'psy101',
      code: 'PSY 101',
      name: 'Basic Electronics',
      instructor: 'Mr. Morris',
      progress: 89,
      credits: 3,
      schedule: 'TTh 10:00 AM - 11:30 AM',
      location: 'Lab 3',
      nextAssignment: {
        title: 'Research Paper',
        dueDate: 'April 29, 2025'
      }
    }
  ];

  // Mock events data
  const events = [
    {
      id: 1,
      title: 'CS 101 Midterm Exam',
      date: 'April 18',
      month: 'Apr',
      day: '18',
      time: '10:00 AM',
      location: 'Tech Building'
    },
    {
      id: 2,
      title: 'Academic Advising Appointment',
      date: 'April 22',
      month: 'Apr',
      day: '22',
      time: '2:30 PM',
      location: 'Accademic Office'
    },
    {
      id: 3,
      title: 'Research Paper Deadline',
      date: 'April 29',
      month: 'Apr',
      day: '29',
      time: '11:59 PM',
      location: 'Online Submission'
    }
  ];

  // get course data in particular the progress and if 80-100 then = Mastery, 65-79 = Proficiency, 50-64 = Competent, 0-49 = Not Yet Competent
  courses.forEach(course => {
    if (course.progress >= 80) {
      course.status = 'Mastery';
    } else if (course.progress >= 65) {
      course.status = 'Proficiency';
    } else if (course.progress >= 50) {
      course.status = 'Competent';
    } else {
      course.status = 'Not Yet Competent';
    }
  });

  // Render courses
  const coursesGrid = document.querySelector('.courses-grid');
  
  courses.forEach(course => {
    const courseCard = document.createElement('div');
    courseCard.className = 'course-card';
    courseCard.innerHTML = `
      <div class="course-header">
        <span class="course-code">${course.code}</span>
        <h3 class="course-title">${course.name}</h3>
        <div class="course-instructor">
          <i class="fas fa-user"></i>
          <span>${course.instructor}</span>
        </div>
      </div>
      <div class="course-content">
        <div class="progress-container">
          <div class="progress-info">
            <span>Progress</span>
            <span>${course.status}</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${course.progress}%"></div>
          </div>
        </div>
      </div>
    `;
    
    courseCard.addEventListener('click', () => {
      window.location.href = 'courses.html';
    });
    
    coursesGrid.appendChild(courseCard);
  });

  // Render events
  const eventsList = document.querySelector('.events-list');
  
  events.forEach(event => {
    const eventItem = document.createElement('div');
    eventItem.className = 'event-item';
    eventItem.innerHTML = `
      <div class="event-date">
        <span class="event-month">${event.month}</span>
        <span class="event-day">${event.day}</span>
      </div>
      <div class="event-details">
        <h4 class="event-title">${event.title}</h4>
        <div class="event-time">
          <i class="fas fa-clock"></i>
          <span>${event.time}</span>
        </div>
      </div>
    `;
    
    eventsList.appendChild(eventItem);
  });

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
    
    // Remove toast after 5 seconds
    setTimeout(() => {
      toast.style.animation = 'slideOut 0.3s ease forwards';
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 5000);
  }
});
