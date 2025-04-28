// Admin Logout Functionality
const logoutConfirmationModal = document.getElementById('logoutConfirmationModal');
const closeLogoutModalBtn = document.getElementById('closeLogoutModalBtn');
const cancelLogoutBtn = document.getElementById('cancelLogoutBtn');
const confirmLogoutBtn = document.getElementById('confirmLogoutBtn');

// Function to show logout confirmation modal
function showLogoutConfirmation() {
  logoutConfirmationModal.classList.remove('hidden');
}

// Function to hide logout confirmation modal
function hideLogoutConfirmation() {
  logoutConfirmationModal.classList.add('hidden');
}

// Function to perform logout
function performLogout() {
  adminDashboard.classList.add('hidden');
  document.getElementById('submissionForm').classList.remove('hidden');
  adminLoginBtn.classList.remove('hidden');
  adminLogoutBtn.classList.add('hidden');
  // Clear admin login state
  localStorage.removeItem('adminLoggedIn');
  hideLogoutConfirmation();
  
  // Reset the form when logging out
  resetForm();
  
  // Refresh the page
  window.location.reload();
}

// Event listeners for logout modal
closeLogoutModalBtn.addEventListener('click', hideLogoutConfirmation);
cancelLogoutBtn.addEventListener('click', hideLogoutConfirmation);
confirmLogoutBtn.addEventListener('click', performLogout);

// Update admin logout button click handler
adminLogoutBtn.addEventListener('click', showLogoutConfirmation);