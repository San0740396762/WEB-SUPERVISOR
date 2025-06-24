document.addEventListener('DOMContentLoaded', function() {
  // Check authentication
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (!currentUser) {
    window.location.href = '/portal/auth.html';
    return;
  }

  // Set user information
  document.getElementById('user-name').textContent = `${currentUser.firstName} ${currentUser.lastName}`;
  document.getElementById('user-initials').textContent = `${currentUser.firstName.charAt(0)}${currentUser.lastName.charAt(0)}`;

  // Mock units data
  const units = [
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

  // get unit data in particular the progress and if 80-100 then = Mastery, 65-79 = Proficiency, 50-64 = Competent, 0-49 = Not Yet Competent
  units.forEach(unit => {
    if (unit.progress >= 80) {
      unit.status = 'Mastery';
    } else if (unit.progress >= 65) {
      unit.status = 'Proficiency';
    } else if (unit.progress >= 50) {
      unit.status = 'Competent';
    } else {
      unit.status = 'Not Yet Competent';
    }
  });

  // Handle tab switching
  const tabTriggers = document.querySelectorAll('.tab-trigger');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      tabTriggers.forEach(t => t.classList.remove('active'));
      trigger.classList.add('active');
      
      tabContents.forEach(content => content.classList.add('hidden'));
      const targetTab = document.getElementById(`${trigger.dataset.tab}-tab`);
      targetTab.classList.remove('hidden');
    });
  });

  // Render unit list
  const unitList = document.querySelector('.unit-list');
  let selectedunitId = null;

  function renderunitList() {
    unitList.innerHTML = '';
    units.forEach(unit => {
      const unitCard = document.createElement('div');
      unitCard.className = `unit-card ${unit.id === selectedunitId ? 'selected' : ''}`;
      unitCard.innerHTML = `
        <span class="unit-code">${unit.code}</span>
        <h3 class="unit-title">${unit.name}</h3>
        <div class="unit-instructor">
          <i class="fas fa-user"></i>
          <span>${unit.instructor}</span>
        </div>
        <div class="progress-container">
          <div class="progress-info">
            <span>Progress</span>
            <span>${unit.status}</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${unit.progress}%"></div>
          </div>
        </div>
      `;
      
      unitCard.addEventListener('click', () => {
        selectedunitId = unit.id;
        renderunitList(); // Re-render to update selection
        renderunitDetails(unit);
      });
      
      unitList.appendChild(unitCard);
    });
  }

  function renderunitDetails(unit) {
    document.getElementById('selected-unit-code').textContent = unit.code;
    document.getElementById('selected-unit-name').textContent = unit.name;
    
    const unitInfo = document.querySelector('.unit-info');
    unitInfo.innerHTML = `
      <div class="info-grid">
        <div class="info-item">
          <span class="info-label">
            <i class="fas fa-user"></i> Instructor
          </span>
          <span class="info-value">${unit.instructor}</span>
        </div>
        <div class="info-item">
          <span class="info-label">
            <i class="fas fa-clock"></i> Schedule
          </span>
          <span class="info-value">${unit.schedule}</span>
        </div>
        <div class="info-item">
          <span class="info-label">
            <i class="fas fa-map-marker-alt"></i> Location
          </span>
          <span class="info-value">${unit.location}</span>
        </div>
      </div>

      <div class="progress-section">
        <h3 class="section-title">Unit Progress</h3>
        <div class="progress-container">
          <div class="progress-info">
            <span>${unit.status}</span>
          </div>
          <div class="progress-bar erwa">
            <div class="progress-fill" style="width: ${unit.progress}%"></div>
          </div>
        </div>
      </div>

      ${unit.nextAssignment ? `
        <div class="upcoming-work">
          <h3 class="section-title">Upcoming Work</h3>
          <div class="card">
            <div class="assignment-info">
              <i class="fas fa-calendar"></i>
              <div>
                <p class="assignment-title">${unit.nextAssignment.title}</p>
                <p class="assignment-due">Due: ${unit.nextAssignment.dueDate}</p>
              </div>
            </div>
          </div>
        </div>
      ` : ''}
    `;
  }

  // Initial render
  renderunitList();
  if (units.length > 0) {
    selectedunitId = units[0].id;
    renderunitDetails(units[0]);
  }

  // Handle sidebar toggle
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebar-toggle');
  
  sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    localStorage.setItem('sidebarCollapsed', sidebar.classList.contains('collapsed'));
  });
  
  // Load sidebar state
  const sidebarCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
  if (sidebarCollapsed) {
    sidebar.classList.add('collapsed');
  }

  // Handle logout
  document.getElementById('logout-button').addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('currentUser');
    window.location.href = '/portal/auth.html';
  });
});
