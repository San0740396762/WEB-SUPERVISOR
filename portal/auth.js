document.addEventListener('DOMContentLoaded', function () {
  const tabTriggers = document.querySelectorAll('.tab-trigger');
  const tabContents = document.querySelectorAll('.tab-content');

  tabTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      tabTriggers.forEach(t => t.classList.remove('active'));
      trigger.classList.add('active');
      tabContents.forEach(content => content.classList.add('hidden'));
      document.getElementById(`${trigger.dataset.tab}-tab`).classList.remove('hidden');
    });
  });

  const signinForm = document.getElementById('signin-form');
  const signinButton = document.getElementById('signin-button');

  const API_BASE = 'https://binarywizard.pythonanywhere.com/api';

  // Sign In Handler
  signinForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    signinButton.disabled = true;
    signinButton.textContent = 'Signing in...';

    const payload = {
      email: signinForm.email.value,
      password: signinForm.password.value
    };

    try {
      const res = await fetch(`${API_BASE}/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (res.ok && data.success) {
        localStorage.setItem('currentUser', JSON.stringify(data.user));
        localStorage.setItem('authToken', data.token);

        showToast('Success', 'Signed in successfully!');
        setTimeout(() => {
          const redirect = data.user.role === 'admin' ? 'admin/index' : 'index';
          window.location.href = redirect;
        }, 1000);
      } else {
        showToast('Error', data.error || 'Invalid credentials', true);
        signinButton.disabled = false;
        signinButton.textContent = 'Sign In';
      }

    } catch (err) {
      showToast('Error', 'Network or server error', true);
      signinButton.disabled = false;
      signinButton.textContent = 'Sign In';
    }
  });

  function showToast(title, description, isError = false) {
    const toastContainer = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${isError ? 'toast-error' : ''}`;
    toast.innerHTML = `
      <div>
        <div class="toast-title">${title}</div>
        <div class="toast-description">${description}</div>
      </div>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'slideOut 0.3s ease forwards';
      setTimeout(() => toast.remove(), 300);
    }, 5000);
  }

  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (currentUser) {
    window.location.href = 'index';
  }

  const token = localStorage.getItem('JWT_TOKEN');
  if (token && isTokenValid(token)) {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    window.location.href = user?.role === 'admin' ? 'admin/index' : 'index';
  }

  function isTokenValid(token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const now = Math.floor(Date.now() / 1000);
      return payload.exp > now;
    } catch {
      return false;
    }
  }
});


// logout function
function logout() {
  localStorage.removeItem('currentUser');
  localStorage.removeItem('authToken');
  localStorage.removeItem('JWT_TOKEN');
  showToast('Info', 'Logged out successfully!');
  setTimeout(() => {
    window.location.href = 'auth';
  }, 1000);
}

const logoutButton = document.getElementById('logout-button');
if (logoutButton) {
  logoutButton.addEventListener('click', logout);
}