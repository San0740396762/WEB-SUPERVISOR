const distributionCanvas = document.getElementById('grade-distribution-chart');
distributionCanvas.height = 300;
const distributionCtx = distributionCanvas.getContext('2d');

const performanceCanvas = document.getElementById('semester-performance-chart');
performanceCanvas.height = 300;
const performanceCtx = performanceCanvas.getContext('2d');

// Mock data
const studentData = {
  gpa: 3.85/4*100,
  totalCredits: 120,
  completedCredits: 75,
  inProgressCredits: 15,
  courses: [
    {
      id: 1,
      code: 'CS101',
      name: 'Introduction to Programming',
      currentGrade: 92,
      assignments: [
        { name: 'Midterm', score: 90, maxScore: 100, weight: 30 },
        { name: 'Final Project', score: 95, maxScore: 100, weight: 40 },
        { name: 'Assignments', score: 88, maxScore: 100, weight: 30 }
      ]
    },
    {
      id: 1,
      code: 'CS101',
      name: 'Introduction to Programming',
      currentGrade: 70,
      assignments: [
        { name: 'Midterm', score: 90, maxScore: 100, weight: 30 },
        { name: 'Final Project', score: 95, maxScore: 100, weight: 40 },
        { name: 'Assignments', score: 88, maxScore: 100, weight: 30 }
      ]
    },
    {
      id: 1,
      code: 'CS101',
      name: 'Introduction to Programming',
      currentGrade: 32,
      assignments: [
        { name: 'Midterm', score: 90, maxScore: 100, weight: 30 },
        { name: 'Final Project', score: 95, maxScore: 100, weight: 40 },
        { name: 'Assignments', score: 88, maxScore: 100, weight: 30 }
      ]
    },
    {
      id: 1,
      code: 'CS101',
      name: 'Introduction to Programming',
      currentGrade: 82,
      assignments: [
        { name: 'Midterm', score: 90, maxScore: 100, weight: 30 },
        { name: 'Final Project', score: 95, maxScore: 100, weight: 40 },
        { name: 'Assignments', score: 88, maxScore: 100, weight: 30 }
      ]
    },
    {
      id: 1,
      code: 'CS101',
      name: 'Introduction to Programming',
      currentGrade: 45,
      assignments: [
        { name: 'Midterm', score: 90, maxScore: 100, weight: 30 },
        { name: 'Final Project', score: 95, maxScore: 100, weight: 40 },
        { name: 'Assignments', score: 88, maxScore: 100, weight: 30 }
      ]
    }
  ]
};

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  function getCBETGrade(percentage) {
    if (percentage >= 80) return 'Mastery';
    if (percentage >= 65) return 'Proficiency';
    if (percentage >= 50) return 'Competent';
    return 'Not Yet Competent';
  }

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
  const userInitials = document.getElementById('user-initials').textContent = initials;
  // Set user info
  userName.textContent = `${currentUser.firstName} ${currentUser.lastName}`;
  userInitials.textContent = user.email.charAt(0).toUpperCase();

  

  // Initialize GPA display
  document.getElementById('current-gpa').textContent = getCBETGrade(studentData.gpa);

  // Initialize credits progress bar
  const progressBar = document.getElementById('credits-progress');
  const progressPercentage = (studentData.completedCredits / studentData.totalCredits) * 100;
  progressBar.style.width = `${progressPercentage}%`;

  // Initialize grade distribution chart
  const distributionCtx = document.getElementById('grade-distribution-chart').getContext('2d');
  new Chart(distributionCtx, {
    type: 'doughnut',
    data: {
      labels: ['A', 'B', 'C', 'D', 'F'],
      datasets: [{
        data: [8, 4, 2, 1, 0],
        backgroundColor: [
          '#22c55e',
          '#3b82f6',
          '#f59e0b',
          '#ef4444',
          '#7c3aed'
        ]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });

  // Initialize semester performance chart
  const performanceCtx = document.getElementById('semester-performance-chart').getContext('2d');
  new Chart(performanceCtx, {
    type: 'bar',
    data: {
      labels: studentData.courses.map(course => course.code),
      datasets: [{
        labels: ['Mastery', 'Proficiency', 'Competent', 'Not Yet Competent', 'Fail'],
        data: studentData.courses.map(course => course.currentGrade),
        backgroundColor: '#3b82f6'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          max: 100
        }
      }
    }
  });

  // Initialize course list
  const courseList = document.getElementById('course-list');
  studentData.courses.forEach(course => {
    const courseElement = document.createElement('div');
    courseElement.className = 'course-item';
    courseElement.innerHTML = `
      <div class="course-header">
        <div>
          <strong>${course.code}</strong> - ${course.name}
        </div>
        <div>
          Grade: ${getCBETGrade(course.currentGrade)}
          <i class="fas fa-chevron-down"></i>
        </div>
      </div>
      <div class="course-details">
        <table class="assignments-table">
          <thead>
            <tr>
              <th>Assignment</th>
              <th>Score</th>
              <th>Weight</th>
            </tr>
          </thead>
          <tbody>
            ${course.assignments.map(assignment => `
              <tr>
                <td>${assignment.name}</td>
                <td>${getCBETGrade((assignment.score / assignment.maxScore) * 100)}</td>
                <td>${assignment.weight}%</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;

    // Add click handler for expanding/collapsing course details
    const header = courseElement.querySelector('.course-header');
    const details = courseElement.querySelector('.course-details');
    header.addEventListener('click', () => {
      details.classList.toggle('active');
      header.querySelector('i').classList.toggle('fa-chevron-up');
      header.querySelector('i').classList.toggle('fa-chevron-down');
    });

    courseList.appendChild(courseElement);
  });

  // Setup tabs
  const tabs =

 document.querySelectorAll('.tab-trigger');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Update active tab
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Show corresponding content
      const tabContents = document.querySelectorAll('.tab-content');
      tabContents.forEach(content => content.classList.remove('active'));
      document.getElementById(`${tab.dataset.tab}-tab`).classList.add('active');
    });
  });

  // Setup logout
  const logoutButton = document.getElementById('logout-button');
  logoutButton.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('currentUser');
    window.location.href = '/portal/auth.html';
  });
});
