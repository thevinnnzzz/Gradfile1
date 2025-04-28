// Admin Login Functionality
const adminLoginBtn = document.getElementById('adminLoginBtn');
const adminLoginModal = document.getElementById('adminLoginModal');
const closeLoginModalBtn = document.getElementById('closeLoginModalBtn');
const adminLoginForm = document.getElementById('adminLoginForm');
const adminDashboard = document.getElementById('adminDashboard');
const adminLogoutBtn = document.getElementById('adminLogoutBtn');
const togglePassword = document.getElementById('togglePassword');
const adminPassword = document.getElementById('adminPassword');
const loginError = document.getElementById('loginError');

// Show admin login modal
adminLoginBtn.addEventListener('click', function() {
  adminLoginModal.classList.remove('hidden');
});

// Close admin login modal
closeLoginModalBtn.addEventListener('click', function() {
  adminLoginModal.classList.add('hidden');
  adminLoginForm.reset();
  loginError.classList.add('hidden');
});

// Toggle password visibility
togglePassword.addEventListener('click', function() {
  const type = adminPassword.getAttribute('type') === 'password' ? 'text' : 'password';
  adminPassword.setAttribute('type', type);
  this.innerHTML = type === 'password' ? '<i class="ri-eye-off-line text-gray-500"></i>' : '<i class="ri-eye-line text-gray-500"></i>';
});

// Modify admin login form submission
adminLoginForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const username = document.getElementById('adminUsername').value;
  const password = document.getElementById('adminPassword').value;
  
  // Check credentials
  if (username === 'slrclpubatangasmain' && password === 'slrclpubatangasmain') {
    adminLoginModal.classList.add('hidden');
    adminDashboard.classList.remove('hidden');
    document.getElementById('submissionForm').classList.add('hidden');
    adminLoginBtn.classList.add('hidden');
    adminLogoutBtn.classList.remove('hidden');
    adminLoginForm.reset();
    loginError.classList.add('hidden');
    
    // Save admin login state
    localStorage.setItem('adminLoggedIn', 'true');
    
    // Update table with current submissions
    updateAdminTable();
  } else {
    loginError.textContent = 'Invalid username or password. Please try again.';
    loginError.classList.remove('hidden');
  }
});