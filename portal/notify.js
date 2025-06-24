// Notification Popup Management
const notificationButton = document.getElementById('notifications-button');
const notificationPopup = document.createElement('div');

// Create popup structure with template outside notifications-list
notificationPopup.innerHTML = `
  <div id="notification-popup" class="hidden absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-[var(--border-color)] z-50">
    <!-- Header -->
    <div class="flex items-center justify-between p-4 border-b border-[var(--border-color)]">
      <h2 class="text-xl font-bold text-[var(--text-primary)]">All Notifications</h2>
      <div class="flex items-center gap-2">
        <button 
          id="mark-all-read"
          class="px-3 py-1.5 text-sm bg-[var(--university-gold)] text-[var(--university-navy)] rounded-[var(--radius)] hover:opacity-90 transition-opacity"
        >
          Mark All
        </button>
        <button id="close-popup" class="text-[var(--text-muted)] hover:text-[var(--text-primary)]">
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>

    <!-- Notifications List -->
    <div id="notifications-list" class="max-h-[60vh] overflow-y-auto p-2"></div>

    <!-- Empty State -->
    <div id="popup-empty-state" class="hidden p-4 text-center text-[var(--text-muted)]">
      No new notifications
    </div>

    <!-- Template (outside list) -->
    <div class="notification-item-template hidden p-4 border-b border-[var(--border-color)] hover:bg-[var(--bg-gray-50)] transition-colors">
      <div class="flex justify-between items-start mb-2">
        <h3 class="font-medium text-[var(--text-primary)]"></h3>
        <button class="mark-read-btn px-2 py-1 text-xs bg-transparent border border-[var(--university-navy)] text-[var(--university-navy)] rounded-[var(--radius)] hover:bg-[var(--university-navy)] hover:text-white transition-colors">
          Mark Read
        </button>
      </div>
      <p class="text-sm text-[var(--text-muted)] mb-2"></p>
      <span class="text-xs text-[var(--text-muted)]"></span>
    </div>
  </div>
`;

document.body.appendChild(notificationPopup);

// Cache DOM elements
const popup = document.getElementById('notification-popup');
const notificationsList = document.getElementById('notifications-list');
const popupEmptyState = document.getElementById('popup-empty-state');
const template = document.querySelector('.notification-item-template');

// Toggle popup visibility
function togglePopup() {
  popup.classList.toggle('hidden');
  
  // Position popup relative to button
  const buttonRect = notificationButton.getBoundingClientRect();
  popup.style.top = `${buttonRect.bottom + window.scrollY}px`;
  popup.style.right = `${window.innerWidth - buttonRect.right}px`;
  
  // Load notifications when opening
  if (!popup.classList.contains('hidden')) {
    fetchNotifications();
  }
}

// LocalStorage functions
const getReadNotifications = () => new Set(JSON.parse(localStorage.getItem('readNotifications') || '[]'));
const saveReadNotifications = (ids) => localStorage.setItem('readNotifications', JSON.stringify([...ids]));

async function fetchNotifications() {
  try {
    const res = await fetch('https://binarywizard.pythonanywhere.com/api/admin/broadcasts');
    const data = await res.json();
    updateNotificationCount(data);
    renderPopupNotifications(data);
  } catch (error) {
    console.error('Error fetching notifications:', error);
  }
}

function renderPopupNotifications(notifications) {
  const readNotifications = getReadNotifications();
  
  // Clear existing notifications
  notificationsList.innerHTML = '';
  
  // Show empty state if no notifications
  popupEmptyState.classList.toggle('hidden', notifications.length > 0);

  notifications.forEach(notification => {
    const clone = template.cloneNode(true);
    clone.classList.remove('notification-item-template', 'hidden');
    clone.dataset.id = notification.id;

    // Check if notification is read
    const isRead = readNotifications.has(notification.id);
    if (isRead) {
      clone.classList.add('opacity-50');
      clone.querySelector('.mark-read-btn').textContent = 'Read';
      clone.querySelector('.mark-read-btn').disabled = true;
    }

    // Populate content
    clone.querySelector('h3').textContent = notification.title;
    clone.querySelector('p').textContent = notification.message;
    clone.querySelector('span').textContent = new Date(notification.created_at).toLocaleDateString();

    // Add click handler
    clone.querySelector('.mark-read-btn').addEventListener('click', () => {
      if (!isRead) {
        const updatedRead = new Set([...readNotifications, notification.id]);
        saveReadNotifications(updatedRead);
        clone.classList.add('opacity-50');
        clone.querySelector('.mark-read-btn').textContent = 'Read';
        clone.querySelector('.mark-read-btn').disabled = true;
        updateNotificationCount(notifications);
      }
    });

    notificationsList.appendChild(clone);
  });
}

function updateNotificationCount(notifications) {
  if (!notifications) return;
  const unreadCount = notifications.filter(n => !getReadNotifications().has(n.id)).length;
  document.getElementById('notification-count').textContent = unreadCount;
}

// Event listeners
notificationButton.addEventListener('click', togglePopup);
document.getElementById('close-popup').addEventListener('click', () => popup.classList.add('hidden'));
document.getElementById('mark-all-read').addEventListener('click', () => {
  const notifications = Array.from(notificationsList.children);
  const readNotifications = getReadNotifications();
  let hasUnread = false;

  notifications.forEach(notification => {
    const notificationId = notification.dataset.id;
    if (!readNotifications.has(notificationId)) {
      hasUnread = true;
      readNotifications.add(notificationId);
      notification.classList.add('opacity-50');
      const markReadBtn = notification.querySelector('.mark-read-btn');
      markReadBtn.textContent = 'Read';
      markReadBtn.disabled = true;
    }
  });

  if (hasUnread) {
    saveReadNotifications(readNotifications);
    updateNotificationCount(notifications);
  }
});

// Close popup when clicking outside
document.addEventListener('click', (e) => {
  if (!popup.contains(e.target) && !notificationButton.contains(e.target)) {
    popup.classList.add('hidden');
  }
});

// Initial load
fetchNotifications();