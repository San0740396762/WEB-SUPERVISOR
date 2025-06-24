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

  // Mock schedule data
  const scheduleEvents = [
    {
      id: 1,
      title: 'Introduction to Digital Literacy',
      day: 'Monday',
      startTime: '10:00',
      endTime: '11:15',
      location: 'CLB',
      type: 'Lecture',
      courseCode: 'CS 101'
    },
    {
      id: 2,
      title: 'Numeracy Skills',
      day: 'Monday',
      startTime: '13:00',
      endTime: '14:30',
      location: 'CR 1',
      type: 'Lecture',
      courseCode: 'MATH 240'
    },
    {
      id: 3,
      title: 'Entereprenuership Skills',
      day: 'Monday',
      startTime: '15:00',
      endTime: '16:15',
      location: 'Cr 6',
      type: 'Seminar',
      courseCode: 'ENG 220'
    },
    {
      id: 4,
      title: 'Basic Electronics',
      day: 'Tuesday',
      startTime: '09:00',
      endTime: '10:30',
      location: 'Lab 3',
      type: 'Lecture',
      courseCode: 'PSY 101'
    },
    {
      id: 5,
      title: 'Computer Repair and Maintenance',
      day: 'Tuesday',
      startTime: '11:00',
      endTime: '12:15',
      location: 'CLB',
      type: 'Lecture',
      courseCode: 'CRM 101'
    },
    {
      id: 6,
      title: 'Data Structures and Algorithms',
      day: 'Wednesday',
      startTime: '10:00',
      endTime: '11:15',
      location: 'CLB',
      type: 'Lecture',
      courseCode: 'CS 201'
    },
    {
      id: 7,
      title: 'Probability and Statistics',
      day: 'Wednesday',
      startTime: '13:00',
      endTime: '14:30',
      location: 'Science Hall 201',
      type: 'Lecture',
      courseCode: 'Math 102'
    },
    {
      id: 8,
      title: 'Computer Software installation',
      day: 'Thursday',
      startTime: '09:00',
      endTime: '10:15',
      location: 'CLB',
      type: 'Lecture',
      courseCode: 'CSI 101'
    },
    {
      id: 9,
      title: 'Computer Programming',
      day: 'Thursday',
      startTime: '11:00',
      endTime: '12:30',
      location: 'Jitume Lab',
      type: 'Lab',
      courseCode: 'Cs 301'
    },
    {
      id: 10,
      title: 'Basic Electromis',
      day: 'Friday',
      startTime: '10:00',
      endTime: '11:15',
      location: 'Lab 3',
      type: 'Lecture',
      courseCode: 'PHYS 320'
    },
    {
      id: 11,
      title: 'Operating System',
      day: 'Friday',
      startTime: '13:00',
      endTime: '14:30',
      location: 'Cr 6',
      type: 'Lecture',
      courseCode: 'Os 101'
    }
  ];

  // Group events by day
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const eventsByDay = {};
  days.forEach(day => {
    eventsByDay[day] = scheduleEvents.filter(event => event.day === day);
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

  // Helper function to format time (24h to 12h)
  function formatTime(time) {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const hour12 = hours % 12 || 12;
    return `${hour12}:${minutes.toString().padStart(2, '0')} ${period}`;
  }

  // Helper function to calculate duration
  function getDuration(start, end) {
    const [startHours, startMinutes] = start.split(':').map(Number);
    const [endHours, endMinutes] = end.split(':').map(Number);
    
    const startTotalMinutes = startHours * 60 + startMinutes;
    const endTotalMinutes = endHours * 60 + endMinutes;
    const durationMinutes = endTotalMinutes - startTotalMinutes;
    
    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;
    
    if (hours === 0) {
      return `${minutes}m`;
    } else if (minutes === 0) {
      return `${hours}h`;
    } else {
      return `${hours}h ${minutes}m`;
    }
  }

  // Render schedule
  const scheduleGrid = document.querySelector('.schedule-grid');
  
  days.forEach(day => {
    const dayEvents = eventsByDay[day];
    const daySection = document.createElement('div');
    daySection.className = 'day-schedule';
    
    daySection.innerHTML = `
      <div class="day-header">
        <h3 class="day-title">${day}</h3>
      </div>
      <div class="events-list">
        ${dayEvents.length > 0 ? dayEvents
          .sort((a, b) => a.startTime.localeCompare(b.startTime))
          .map(event => `
            <div class="event-card">
              <div class="event-header">
                <h4 class="event-title">${event.title}</h4>
                <span class="event-duration">${getDuration(event.startTime, event.endTime)}</span>
              </div>
              <div class="event-details">
                <div class="event-info">
                  <i class="fas fa-clock"></i>
                  <span>${formatTime(event.startTime)} - ${formatTime(event.endTime)}</span>
                </div>
                <div class="event-info">
                  <i class="fas fa-map-marker-alt"></i>
                  <span>${event.location}</span>
                </div>
                <div class="event-info">
                  <i class="fas fa-bookmark"></i>
                  <span>${event.courseCode} - ${event.type}</span>
                </div>
              </div>
            </div>
          `).join('') : `
          <div class="empty-day">
            <p>No events scheduled</p>
          </div>
        `}
      </div>
    `;
    
    scheduleGrid.appendChild(daySection);
  });

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
