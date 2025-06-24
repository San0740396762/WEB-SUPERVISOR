document.addEventListener("DOMContentLoaded", () => {
  // Check authentication
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.role !== 'admin') {
      window.location.href = '../auth.html';
      return;
    }
    
    const tbody = document.getElementById("user-table-body");
    const searchInput = document.getElementById("user-search");
    const roleFilter = document.getElementById("role-filter");
  
    const modal = document.getElementById("user-modal");
    const modalTitle = document.getElementById("modal-title");
    const form = document.getElementById("user-form");
    const addUserBtn = document.getElementById("add-user-btn");
    const closeModal = document.getElementById("close-modal");
  
    let currentEditId = null;
  
    const loadUsers = async (query = "", role = "") => {
      const res = await fetch(`https://binarywizard.pythonanywhere.com/api/admin/users/search?q=${query}&role=${role}`);
      const users = await res.json();
      tbody.innerHTML = users
        .filter(u => !["admin", "superadmin", "assessor"].includes(u.role))
        .map(
          (u) => `
        <tr>
          <td>${u.full_name}</td>
          <td>${u.email}</td>
          <td>${u.role}</td>
          <td>${u.active ? "Active" : "Inactive"}</td>
          <td>
            <button class="primary-btn" onclick="editUser(${u.id})">Edit</button>  
            <button class="secondary-btn" onclick="deleteUser(${u.id})">Delete</button>
          </td>
        </tr>`
        )
        .join("");
    };
  
    window.editUser = async (id) => {
      const res = await fetch(`https://binarywizard.pythonanywhere.com/api/admin/users`);
      const users = await res.json();
      const user = users.find((u) => u.id === id);
      if (!user) return;
  
      currentEditId = id;
      modalTitle.textContent = "Edit User";
      document.getElementById("user-id").value = user.id;
      document.getElementById("full-name").value = user.full_name;
      document.getElementById("email").value = user.email;
      document.getElementById("role").value = user.role;
      document.getElementById("active-status").checked = user.active;
      modal.classList.remove("hidden");
    };
  
    window.deleteUser = async (id) => {
      if (!confirm("Are you sure you want to delete this user?")) return;
      await fetch(`https://binarywizard.pythonanywhere.com/api/admin/users/${id}`, { method: "DELETE" });
      loadUsers();
    };
  
    addUserBtn.onclick = () => {
      modalTitle.textContent = "Add User";
      form.reset();
      currentEditId = null;
      modal.classList.remove("hidden");
    };
  
    closeModal.onclick = () => {
      modal.classList.add("hidden");
    };
  
    form.onsubmit = async (e) => {
      e.preventDefault();
      const userData = {
        full_name: document.getElementById("full-name").value,
        email: document.getElementById("email").value,
        role: document.getElementById("role").value,
        password: document.getElementById("password").value,
        active: document.getElementById("active-status").checked,
      };
  
      const url = currentEditId
        ? `https://binarywizard.pythonanywhere.com/api/admin/users/${currentEditId}`
        : `https://binarywizard.pythonanywhere.com/api/admin/users`;
      const method = currentEditId ? "PUT" : "POST";
  
      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
  
      modal.classList.add("hidden");
      loadUsers();
    };
  
    searchInput.oninput = () =>
      loadUsers(searchInput.value, roleFilter.value);
  
    roleFilter.onchange = () =>
      loadUsers(searchInput.value, roleFilter.value);
  
    // Initial load
    loadUsers();
  });
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


// logout function
function logout() {
  localStorage.removeItem('currentUser');
  localStorage.removeItem('authToken');
  localStorage.removeItem('JWT_TOKEN');
  showToast('Info', 'Logged out successfully!');
  setTimeout(() => {
    window.location.href = '../auth.html';
  }, 1000);
}

const logoutButton = document.getElementById('logout-button');
if (logoutButton) {
  logoutButton.addEventListener('click', logout);
}

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