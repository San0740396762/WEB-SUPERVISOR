
// Mock data
const profileData = {
  name: 'John Smith',
  email: 'john.smith@university.edu',
  studentId: '12345678',
  program: 'Computer Science',
  year: 'Senior Year',
  enrollmentDate: 'Fall 2021',
  expectedGraduation: 'Spring 2025',
  credits: {
    completed: 100,
    total: 120
  },
  advisor: {
    name: 'Dr. Anderson',
    email: 'dr.anderson@university.edu',
    department: 'Computer Science Department'
  }
};

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
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
  userInitials.textContent = initials;

  // Set profile data
  document.getElementById('profile-name').textContent = profileData.name;
  document.getElementById('profile-email').textContent = profileData.email;
  document.getElementById('profile-initials').textContent = getInitials(profileData.name);
  const overallProgress = document.getElementById('overall-progress');
  const progressWords = document.getElementById('progress-words');

  function getCBETGrade(percentage) {
    if (percentage >= 80) return 'Mastery';
    if (percentage >= 65) return 'Proficiency';
    if (percentage >= 50) return 'Competent';
    return 'Not Yet Competent';
  }

  function getProgressWords(percentage) {
    if (percentage >= 80) return 'You are on track to graduate with honors! Keep up the great work!';
    if (percentage >= 65) return 'You are doing well, but there is room for improvement.';
    if (percentage >= 50) return 'You are making progress, but consider seeking help.';
    return 'You need to improve your performance to stay on track for graduation.';
  }

  // Calculate and set progress bar
  const progressPercentage = (profileData.credits.completed / profileData.credits.total) * 100;
  const progressBar = document.querySelector('.progress-bar');
  progressBar.style.width = `${progressPercentage}%`;

  overallProgress.textContent = getCBETGrade(progressPercentage);
  overallProgress.classList.remove('mastery', 'proficiency', 'competent', 'not-yet-competent');
  if (progressPercentage >= 80) overallProgress.classList.add('mastery');
  else if (progressPercentage >= 65) overallProgress.classList.add('proficiency');
  else if (progressPercentage >= 50) overallProgress.classList.add('competent');
  else overallProgress.classList.add('not-yet-competent');
  progressWords.textContent = getProgressWords(progressPercentage);

  // Setup tabs
  const tabs = document.querySelectorAll('.tab-trigger');
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

// Helper function to get initials from name
function getInitials(name) {
  return name
    .split(' ')
    .map(n => n[0])
    .join('');
}
