// Toggle between LPU and Non-LPU fields
const lpuRadio = document.getElementById('lpuRadio');
const nonLpuRadio = document.getElementById('nonLpuRadio');
const lpuFields = document.getElementById('lpuFields');
const campusField = document.getElementById('campusField');
const programField = document.getElementById('programField');
const schoolField = document.getElementById('schoolField');
const studentNumber = document.getElementById('studentNumber');
const campus = document.getElementById('campus');
const program = document.getElementById('program');
const schoolName = document.getElementById('schoolName');
lpuRadio.addEventListener('change', function() {
if (this.checked) {
lpuFields.classList.remove('hidden');
campusField.classList.remove('hidden');
programField.classList.remove('hidden');
schoolField.classList.add('hidden');
studentNumber.required = true;
campus.required = true;
program.required = true;
schoolName.required = false;
}
});
nonLpuRadio.addEventListener('change', function() {
if (this.checked) {
lpuFields.classList.add('hidden');
programField.classList.add('hidden');
schoolField.classList.remove('hidden');
// Keep campus field visible for non-LPU students
campusField.classList.remove('hidden');
studentNumber.required = false;
program.required = false;
schoolName.required = true;
campus.required = true; // Campus is required for both user types
}
});
// Form submission
const researchForm = document.getElementById('researchForm');
const successModal = document.getElementById('successModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const closeSuccessBtn = document.getElementById('closeSuccessBtn');
const downloadReceiptBtn = document.getElementById('downloadReceiptBtn');
// Generate a random reference number
function generateReferenceNumber() {
const prefix = "RR";
const timestamp = new Date().getTime().toString().slice(-6);
const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
return `${prefix}-${timestamp}-${random}`;
}
// Format date to readable format
function formatDate(date) {
const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
return date.toLocaleDateString('en-US', options);
}
// Close modal function
function closeModal() {
successModal.classList.add('hidden');
}
// Event listeners for closing the modal
closeModalBtn.addEventListener('click', function() {
successModal.classList.add('hidden');
});
// Close rating animation
document.getElementById('closeRatingBtn').addEventListener('click', function() {
  document.getElementById('ratingAnimation').classList.add('hidden');
  
  // Reload the page after closing the rating popup
  setTimeout(function() {
    window.location.reload();
  }, 300);
});
// Submit rating button
document.getElementById('submitRatingBtn').addEventListener('click', function() {
  document.getElementById('ratingAnimation').classList.add('hidden');
  // Skip thank you animation and directly reload the page
  setTimeout(function() {
    window.location.reload();
  }, 300);
});
// Edit submission function
document.getElementById('editSubmissionBtn').addEventListener('click', function() {
successModal.classList.add('hidden');
  // Reset the form
  researchForm.reset();
  // Restore the radio button state
  if (document.getElementById('summaryUserType').textContent === 'LPU') {
    lpuRadio.checked = true;
    lpuFields.classList.remove('hidden');
    programField.classList.remove('hidden');
    schoolField.classList.add('hidden');
    studentNumber.required = true;
    program.required = true;
    schoolName.required = false;
  } else {
    nonLpuRadio.checked = true;
    lpuFields.classList.add('hidden');
    programField.classList.add('hidden');
    schoolField.classList.remove('hidden');
    studentNumber.required = false;
    program.required = false;
    schoolName.required = true;
  }
});
// Confirm submission function
document.getElementById('confirmSubmissionBtn').addEventListener('click', function() {
// Show confirmation message
const modalContent = document.querySelector('#successModal .bg-white');
modalContent.innerHTML = `
<div class="bg-primary px-6 py-4 flex justify-between items-center">
<h3 class="text-xl font-medium text-white flex items-center">
<i class="ri-check-line mr-2"></i>
Submission Successful
</h3>
<button id="finalCloseBtn" class="text-white hover:text-gray-200">
<i class="ri-close-line text-xl"></i>
</button>
</div>
<div class="px-6 py-4">
<div class="mb-6 text-center">
<div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
<i class="ri-check-line text-green-500 ri-2x"></i>
</div>
<p class="text-gray-700 text-lg">Your research record has been submitted successfully.</p>
</div>
<button id="finalCloseBtn2" class="w-full bg-primary text-white px-4 py-3 !rounded-button font-medium hover:bg-opacity-90 transition whitespace-nowrap">
Done
</button>
</div>
`;
  
// Add event listeners to new close buttons
document.getElementById('finalCloseBtn').addEventListener('click', function() {
  successModal.classList.add('hidden');
  // Show rating popup after successful submission
  document.getElementById('ratingAnimation').classList.remove('hidden');
  researchForm.reset();
});
  
document.getElementById('finalCloseBtn2').addEventListener('click', function() {
  successModal.classList.add('hidden');
  // Show rating popup after successful submission
  document.getElementById('ratingAnimation').classList.remove('hidden');
  researchForm.reset();
});
});
// Store submissions
let submissions = JSON.parse(localStorage.getItem('submissions')) || [
  {
    date: '2025-04-10',
    userType: 'LPU',
    name: 'Michael Johnson',
    studentNumber: '2023-0142',
    program: 'Computer Science',
    school: '-',
    campus: 'Main Campus',
    thesisTitle: 'Machine Learning Applications in Healthcare'
  },
  {
    date: '2025-04-09',
    userType: 'Non-LPU',
    name: 'Emily Rodriguez',
    studentNumber: '-',
    program: '-',
    school: 'Stanford University',
    campus: '-',
    thesisTitle: 'Sustainable Urban Development Models'
  },
  {
    date: '2025-04-08',
    userType: 'LPU',
    name: 'David Thompson',
    studentNumber: '2022-1875',
    program: 'Business Administration',
    school: '-',
    campus: 'LIMA Campus',
    thesisTitle: 'Impact of Digital Transformation on SMEs'
  },
  {
    date: '2025-04-07',
    userType: 'LPU',
    name: 'Sarah Williams',
    studentNumber: '2023-0563',
    program: 'Psychology',
    school: '-',
    campus: 'Riverside Campus',
    thesisTitle: 'Cognitive Behavioral Therapy in Adolescents'
  },
  {
    date: '2025-04-06',
    userType: 'Non-LPU',
    name: 'Robert Chen',
    studentNumber: '-',
    program: '-',
    school: 'MIT',
    campus: '-',
    thesisTitle: 'Quantum Computing Applications in Cryptography'
  }
];
// Function to save submissions to localStorage
function saveSubmissions() {
  localStorage.setItem('submissions', JSON.stringify(submissions));
}
// Check if admin is logged in on page load
document.addEventListener('DOMContentLoaded', function() {
  const isAdminLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
  const profileDropdownContainer = document.getElementById('profileDropdownContainer');
  const tutorialBtn = document.getElementById('tutorialBtn');
  
  if (isAdminLoggedIn) {
    adminDashboard.classList.remove('hidden');
    document.getElementById('submissionForm').classList.add('hidden');
    adminLoginBtn.classList.add('hidden');
    // Hide tutorial button in admin mode
    if (tutorialBtn) {
      tutorialBtn.classList.add('hidden');
    }
    // Show profile dropdown in header
    if (profileDropdownContainer) {
      profileDropdownContainer.classList.remove('hidden');
    }
    updateAdminTable();
  }
  
  // Initialize visit counter or increment it
  let visitCount = parseInt(localStorage.getItem('visitCount') || 0);
  visitCount++;
  localStorage.setItem('visitCount', visitCount);
  
  // Update visit counter in achievements modal
  document.getElementById('achievementVisitCounter').textContent = visitCount;
  
  // Update badge statuses based on visit count
  const badgeElements = document.querySelectorAll('#achievementsModal .badge');
  
  // Bronze badge (at least 3 visits)
  if (visitCount >= 3) {
    badgeElements[0].style.background = 'linear-gradient(145deg, #cd7f32, #e9c4a7)';
    badgeElements[0].classList.remove('opacity-60', 'bg-gray-100');
    badgeElements[0].classList.add('badge-glow', 'badge-bronze-glow');
    
    const icon = badgeElements[0].querySelector('.ri-lock-line');
    if (icon) {
      icon.classList.add('ri-medal-line', 'badge-icon');
      icon.classList.remove('ri-lock-line');
    }
    
    const bgElement = badgeElements[0].querySelector('.bg-gray-300');
    if (bgElement) {
      bgElement.classList.add('bg-amber-800');
      bgElement.classList.remove('bg-gray-300');
    }
  }
  
  // Silver badge (at least 6 visits)
  if (visitCount >= 6) {
    badgeElements[1].style.background = 'linear-gradient(145deg, #c0c0c0, #e6e6e6)';
    badgeElements[1].classList.remove('opacity-60', 'bg-gray-100');
    badgeElements[1].classList.add('badge-glow', 'badge-silver-glow');
    
    const icon = badgeElements[1].querySelector('.ri-lock-line');
    if (icon) {
      icon.classList.add('ri-medal-line', 'badge-icon');
      icon.classList.remove('ri-lock-line');
    }
    
    const bgElement = badgeElements[1].querySelector('.bg-gray-300');
    if (bgElement) {
      bgElement.classList.add('bg-gray-400');
      bgElement.classList.remove('bg-gray-300');
    }
  }
  
  // Gold badge (at least 10 visits)
  if (visitCount >= 10) {
    badgeElements[2].style.background = 'linear-gradient(145deg, #ffd700, #ffec99)';
    badgeElements[2].classList.remove('opacity-60', 'bg-gray-100');
    badgeElements[2].classList.add('badge-glow', 'badge-gold-glow');
    
    const icon = badgeElements[2].querySelector('.ri-lock-line');
    if (icon) {
      icon.classList.add('ri-medal-line', 'badge-icon');
      icon.classList.remove('ri-lock-line');
    }
    
    const bgElement = badgeElements[2].querySelector('.bg-gray-300');
    if (bgElement) {
      bgElement.classList.add('bg-yellow-500');
      bgElement.classList.remove('bg-gray-300');
    }
  }
});
// Modify the form submission handler to save to localStorage
researchForm.addEventListener('submit', function(e) {
e.preventDefault();
// Get form values
const userType = lpuRadio.checked ? 'LPU' : 'Non-LPU';
const fullName = document.getElementById('fullName').value;
const thesisTitle = document.getElementById('thesisTitle').value;
const currentDate = new Date();

// Create new submission object
const newSubmission = {
  date: currentDate.toISOString().split('T')[0],
  userType: userType,
  name: fullName,
  studentNumber: lpuRadio.checked ? document.getElementById('studentNumber').value : '-',
  program: lpuRadio.checked ? document.getElementById('program').value : '-',
  school: !lpuRadio.checked ? document.getElementById('schoolName').value : '-',
  campus: document.getElementById('campus').value, // Campus is always collected, regardless of user type
  thesisTitle: thesisTitle
};

// Add to submissions array
submissions.unshift(newSubmission);
  
  // Save to localStorage
  saveSubmissions();

// Update admin table if visible
if (!adminDashboard.classList.contains('hidden')) {
  updateAdminTable();
}
// Fill in the summary in the modal
document.getElementById('summaryUserType').textContent = userType;
document.getElementById('summaryName').textContent = fullName;
document.getElementById('summaryThesis').textContent = thesisTitle;
document.getElementById('summaryDate').textContent = formatDate(currentDate);
if (lpuRadio.checked) {
const studentNumber = document.getElementById('studentNumber').value;
const program = document.getElementById('program').value;
const campus = document.getElementById('campus').value;
    document.getElementById('summaryStudentNumber').textContent = studentNumber;
document.getElementById('summaryProgram').textContent = program;
document.getElementById('summaryCampus').textContent = campus;
document.getElementById('summaryStudentNumberRow').classList.remove('hidden');
document.getElementById('summaryProgramRow').classList.remove('hidden');
document.getElementById('summaryCampusRow').classList.remove('hidden');
document.getElementById('summarySchoolRow').classList.add('hidden');
} else {
const schoolName = document.getElementById('schoolName').value;
const campus = document.getElementById('campus').value;
document.getElementById('summarySchool').textContent = schoolName;
document.getElementById('summaryCampus').textContent = campus;
document.getElementById('summaryStudentNumberRow').classList.add('hidden');
document.getElementById('summaryProgramRow').classList.add('hidden');
    document.getElementById('summaryCampusRow').classList.remove('hidden'); // Show campus for non-LPU students
document.getElementById('summarySchoolRow').classList.remove('hidden');
}
// Show the modal
successModal.classList.remove('hidden');
});
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
    // Save admin login state before reloading
    localStorage.setItem('adminLoggedIn', 'true');
    
    // Reset form and hide error message
    adminLoginForm.reset();
    loginError.classList.add('hidden');
    
    // Show a brief success message
    const successMessage = document.createElement('div');
    successMessage.className = 'text-green-500 text-sm mt-2';
    successMessage.innerHTML = '<i class="ri-check-line mr-1"></i>Login successful! Loading admin dashboard...';
    loginError.parentNode.insertBefore(successMessage, loginError.nextSibling);
    
    // Reload the page after a short delay to show the success message
    setTimeout(function() {
      window.location.reload();
    }, 1000);
  } else {
    loginError.textContent = 'Invalid username or password. Please try again.';
    loginError.classList.remove('hidden');
  }
});
// Modify admin logout
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
  
  // Show tutorial button when returning to user mode
  const tutorialBtn = document.getElementById('tutorialBtn');
  if (tutorialBtn) {
    tutorialBtn.classList.remove('hidden');
  }
  
  // Hide profile dropdown in header
  const profileDropdownContainer = document.getElementById('profileDropdownContainer');
  if (profileDropdownContainer) {
    profileDropdownContainer.classList.add('hidden');
  }
  
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

// Delete functionality
const deleteConfirmationModal = document.getElementById('deleteConfirmationModal');
const closeDeleteModalBtn = document.getElementById('closeDeleteModalBtn');
const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
let currentSubmissionToDelete = null;

// Function to show delete confirmation modal
function showDeleteConfirmation(submission) {
  currentSubmissionToDelete = submission;
  deleteConfirmationModal.classList.remove('hidden');
}

// Function to hide delete confirmation modal
function hideDeleteConfirmation() {
  deleteConfirmationModal.classList.add('hidden');
  currentSubmissionToDelete = null;
}

// Event listeners for delete modal
closeDeleteModalBtn.addEventListener('click', hideDeleteConfirmation);
cancelDeleteBtn.addEventListener('click', hideDeleteConfirmation);

// Handle delete confirmation
confirmDeleteBtn.addEventListener('click', function() {
  if (currentSubmissionToDelete) {
    // Find and remove the submission from the array
    submissions = submissions.filter(sub => 
      sub.date !== currentSubmissionToDelete.date || 
      sub.name !== currentSubmissionToDelete.name
    );
    
    // Save updated submissions to localStorage
    saveSubmissions();
    
    // Refresh the table
    updateAdminTable();
    
    // Hide the modal
    hideDeleteConfirmation();
  }
});

// Add delete button event listeners to table rows
function addDeleteButtonListeners() {
  document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', function() {
      const row = this.closest('tr');
      const submission = {
        date: row.cells[0].textContent,
        userType: row.cells[1].textContent,
        name: row.cells[2].textContent,
        studentNumber: row.cells[3].textContent,
        campus: row.cells[4].textContent,
        program: row.cells[5].textContent,
        school: row.cells[6].textContent,
        thesisTitle: row.cells[7].textContent
      };
      showDeleteConfirmation(submission);
    });
  });
}

// Update the updateAdminTable function to include delete buttons
function updateAdminTable() {
  const tbody = document.querySelector('#adminDashboard table tbody');
  tbody.innerHTML = '';
  
  // Sort submissions by date in descending order (newest first)
  const sortedSubmissions = [...submissions].sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });
  
  sortedSubmissions.forEach(submission => {
    const tr = document.createElement('tr');
    tr.className = 'hover:bg-gray-50';
    tr.innerHTML = `
      <td class="py-3 px-2">${submission.date}</td>
      <td class="py-3 px-2">${submission.userType}</td>
      <td class="py-3 px-2">${submission.name}</td>
      <td class="py-3 px-2">${submission.studentNumber}</td>
      <td class="py-3 px-2">${submission.campus || '-'}</td>
      <td class="py-3 px-2">${submission.program}</td>
      <td class="py-3 px-2">${submission.school}</td>
      <td class="py-3 px-2">${submission.thesisTitle}</td>
      <td class="py-3 px-2">
        <div class="flex space-x-2">
          <button class="text-blue-600 hover:text-blue-800 w-8 h-8 flex items-center justify-center">
            <i class="ri-eye-line"></i>
          </button>
          <button class="edit-btn text-green-600 hover:text-green-800 w-8 h-8 flex items-center justify-center">
            <i class="ri-edit-line"></i>
          </button>
          <button class="delete-btn text-red-600 hover:text-red-800 w-8 h-8 flex items-center justify-center">
            <i class="ri-delete-bin-line"></i>
          </button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
  
  // Add event listeners to the new delete buttons
  addDeleteButtonListeners();
}

// Initial render of the table
updateAdminTable();

// Edit functionality
const editModal = document.getElementById('editModal');
const closeEditModalBtn = document.getElementById('closeEditModalBtn');
const cancelEditBtn = document.getElementById('cancelEditBtn');
const editForm = document.getElementById('editForm');
let currentSubmissionToEdit = null;

// Function to show edit modal
function showEditModal(submission) {
  currentSubmissionToEdit = submission;
  
  // Populate form fields
  document.getElementById('editFullName').value = submission.name;
  document.getElementById('editThesisTitle').value = submission.thesisTitle;
  
  if (submission.userType === 'LPU') {
    document.getElementById('editLpuRadio').checked = true;
    document.getElementById('editStudentNumber').value = submission.studentNumber;
    document.getElementById('editProgram').value = submission.program;
    document.getElementById('editCampus').value = submission.campus || '';
    document.getElementById('editLpuFields').classList.remove('hidden');
    document.getElementById('editProgramField').classList.remove('hidden');
    document.getElementById('editCampusField').classList.remove('hidden');
    document.getElementById('editSchoolField').classList.add('hidden');
  } else {
    document.getElementById('editNonLpuRadio').checked = true;
    document.getElementById('editSchoolName').value = submission.school;
    document.getElementById('editCampus').value = submission.campus || ''; // Set campus value for non-LPU students
    document.getElementById('editLpuFields').classList.add('hidden');
    document.getElementById('editProgramField').classList.add('hidden');
    document.getElementById('editCampusField').classList.remove('hidden'); // Keep campus field visible
    document.getElementById('editSchoolField').classList.remove('hidden');
  }
  
  editModal.classList.remove('hidden');
}

// Function to hide edit modal
function hideEditModal() {
  editModal.classList.add('hidden');
  currentSubmissionToEdit = null;
  editForm.reset();
}

// Event listeners for edit modal
closeEditModalBtn.addEventListener('click', hideEditModal);
cancelEditBtn.addEventListener('click', hideEditModal);

// Toggle between LPU and Non-LPU fields in edit form
document.getElementById('editLpuRadio').addEventListener('change', function() {
  if (this.checked) {
    document.getElementById('editLpuFields').classList.remove('hidden');
    document.getElementById('editProgramField').classList.remove('hidden');
    document.getElementById('editCampusField').classList.remove('hidden');
    document.getElementById('editSchoolField').classList.add('hidden');
    document.getElementById('editStudentNumber').required = true;
    document.getElementById('editProgram').required = true;
    document.getElementById('editSchoolName').required = false;
  }
});

document.getElementById('editNonLpuRadio').addEventListener('change', function() {
  if (this.checked) {
    document.getElementById('editLpuFields').classList.add('hidden');
    document.getElementById('editProgramField').classList.add('hidden');
    // Keep campus field visible for non-LPU students
    document.getElementById('editCampusField').classList.remove('hidden');
    document.getElementById('editSchoolField').classList.remove('hidden');
    document.getElementById('editStudentNumber').required = false;
    document.getElementById('editProgram').required = false;
    document.getElementById('editSchoolName').required = true;
    document.getElementById('editCampus').required = true; // Campus is required for both user types
  }
});

// Handle edit form submission
editForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  if (currentSubmissionToEdit) {
    // Update the submission with new values
    const updatedSubmission = {
      ...currentSubmissionToEdit,
      userType: document.getElementById('editLpuRadio').checked ? 'LPU' : 'Non-LPU',
      name: document.getElementById('editFullName').value,
      thesisTitle: document.getElementById('editThesisTitle').value,
      studentNumber: document.getElementById('editLpuRadio').checked ? document.getElementById('editStudentNumber').value : '-',
      program: document.getElementById('editLpuRadio').checked ? document.getElementById('editProgram').value : '-',
      campus: document.getElementById('editCampus').value, // Campus value for both LPU and non-LPU students
      school: !document.getElementById('editLpuRadio').checked ? document.getElementById('editSchoolName').value : '-'
    };
    
    // Find and update the submission in the array
    const index = submissions.findIndex(sub => 
      sub.date === currentSubmissionToEdit.date && 
      sub.name === currentSubmissionToEdit.name
    );
    
    if (index !== -1) {
      submissions[index] = updatedSubmission;
      saveSubmissions();
      updateAdminTable();
      hideEditModal();
    }
  }
});

// Update the updateAdminTable function to include edit button functionality
function updateAdminTable() {
  const tbody = document.querySelector('#adminDashboard table tbody');
  tbody.innerHTML = '';
  
  const sortedSubmissions = [...submissions].sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });
  
  sortedSubmissions.forEach(submission => {
    const tr = document.createElement('tr');
    tr.className = 'hover:bg-gray-50';
    tr.innerHTML = `
      <td class="py-3 px-2">${submission.date}</td>
      <td class="py-3 px-2">${submission.userType}</td>
      <td class="py-3 px-2">${submission.name}</td>
      <td class="py-3 px-2">${submission.studentNumber}</td>
      <td class="py-3 px-2">${submission.campus || '-'}</td>
      <td class="py-3 px-2">${submission.program}</td>
      <td class="py-3 px-2">${submission.school}</td>
      <td class="py-3 px-2">${submission.thesisTitle}</td>
      <td class="py-3 px-2">
        <div class="flex space-x-2">
          <button class="text-blue-600 hover:text-blue-800 w-8 h-8 flex items-center justify-center">
            <i class="ri-eye-line"></i>
          </button>
          <button class="edit-btn text-green-600 hover:text-green-800 w-8 h-8 flex items-center justify-center">
            <i class="ri-edit-line"></i>
          </button>
          <button class="delete-btn text-red-600 hover:text-red-800 w-8 h-8 flex items-center justify-center">
            <i class="ri-delete-bin-line"></i>
          </button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
  
  // Add event listeners to the new buttons
  addDeleteButtonListeners();
  addEditButtonListeners();
}

// Add edit button event listeners
function addEditButtonListeners() {
  document.querySelectorAll('.edit-btn').forEach(button => {
    button.addEventListener('click', function() {
      const row = this.closest('tr');
      const submission = {
        date: row.cells[0].textContent,
        userType: row.cells[1].textContent,
        name: row.cells[2].textContent,
        studentNumber: row.cells[3].textContent,
        campus: row.cells[4].textContent,
        program: row.cells[5].textContent,
        school: row.cells[6].textContent,
        thesisTitle: row.cells[7].textContent
      };
      showEditModal(submission);
    });
  });
}

// Initial render of the table
updateAdminTable();

// View functionality
const viewModal = document.getElementById('viewModal');
const closeViewModalBtn = document.getElementById('closeViewModalBtn');
const closeViewModalBtn2 = document.getElementById('closeViewModalBtn2');

// Function to show view modal
function showViewModal(submission) {
  // Format the date to include time
  const submissionDate = new Date(submission.date);
  const formattedDate = submissionDate.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  
  // Populate the view modal with submission data
  document.getElementById('viewDate').textContent = formattedDate;
  document.getElementById('viewUserType').textContent = submission.userType;
  document.getElementById('viewName').textContent = submission.name;
  document.getElementById('viewThesisTitle').textContent = submission.thesisTitle;
  
  if (submission.userType === 'LPU') {
    document.getElementById('viewStudentNumber').textContent = submission.studentNumber;
    document.getElementById('viewCampus').textContent = submission.campus || 'Not specified';
    document.getElementById('viewProgram').textContent = submission.program;
    
    document.getElementById('viewStudentNumberContainer').classList.remove('hidden');
    document.getElementById('viewCampusContainer').classList.remove('hidden');
    document.getElementById('viewProgramContainer').classList.remove('hidden');
    document.getElementById('viewSchoolContainer').classList.add('hidden');
  } else {
    document.getElementById('viewSchool').textContent = submission.school;
    document.getElementById('viewCampus').textContent = submission.campus || 'Not specified';
    
    document.getElementById('viewStudentNumberContainer').classList.add('hidden');
    document.getElementById('viewCampusContainer').classList.remove('hidden'); // Show campus for non-LPU students
    document.getElementById('viewProgramContainer').classList.add('hidden');
    document.getElementById('viewSchoolContainer').classList.remove('hidden');
  }
  
  viewModal.classList.remove('hidden');
}

// Function to hide view modal
function hideViewModal() {
  viewModal.classList.add('hidden');
}

// Event listeners for view modal
closeViewModalBtn.addEventListener('click', hideViewModal);
closeViewModalBtn2.addEventListener('click', hideViewModal);

// Add view button event listeners
function addViewButtonListeners() {
  document.querySelectorAll('.view-btn').forEach(button => {
    button.addEventListener('click', function() {
      const row = this.closest('tr');
      const submission = {
        date: row.cells[0].textContent,
        userType: row.cells[1].textContent,
        name: row.cells[2].textContent,
        studentNumber: row.cells[3].textContent,
        campus: row.cells[4].textContent,
        program: row.cells[5].textContent,
        school: row.cells[6].textContent,
        thesisTitle: row.cells[7].textContent
      };
      showViewModal(submission);
    });
  });
}

// Update the updateAdminTable function to include view button functionality
function updateAdminTable() {
  const tbody = document.querySelector('#adminDashboard table tbody');
  tbody.innerHTML = '';
  
  const sortedSubmissions = [...submissions].sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });
  
  sortedSubmissions.forEach(submission => {
    const tr = document.createElement('tr');
    tr.className = 'hover:bg-gray-50';
    tr.innerHTML = `
      <td class="py-3 px-2">${submission.date}</td>
      <td class="py-3 px-2">${submission.userType}</td>
      <td class="py-3 px-2">${submission.name}</td>
      <td class="py-3 px-2">${submission.studentNumber}</td>
      <td class="py-3 px-2">${submission.campus || '-'}</td>
      <td class="py-3 px-2">${submission.program}</td>
      <td class="py-3 px-2">${submission.school}</td>
      <td class="py-3 px-2">${submission.thesisTitle}</td>
      <td class="py-3 px-2">
        <div class="flex space-x-2">
          <button class="view-btn text-blue-600 hover:text-blue-800 w-8 h-8 flex items-center justify-center">
            <i class="ri-eye-line"></i>
          </button>
          <button class="edit-btn text-green-600 hover:text-green-800 w-8 h-8 flex items-center justify-center">
            <i class="ri-edit-line"></i>
          </button>
          <button class="delete-btn text-red-600 hover:text-red-800 w-8 h-8 flex items-center justify-center">
            <i class="ri-delete-bin-line"></i>
          </button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
  
  // Add event listeners to the new buttons
  addDeleteButtonListeners();
  addEditButtonListeners();
  addViewButtonListeners();
}

// Initial render of the table
updateAdminTable();

// Add search functionality
const searchInput = document.getElementById('searchInput');
const searchField = document.getElementById('searchField');
const dateFilter = document.getElementById('dateFilter');
const userTypeFilter = document.getElementById('userTypeFilter');
const campusFilter = document.getElementById('campusFilter');

// Helper function to calculate column widths for PDF export
function generateColumnStyles(headers, data) {
  const columnStyles = {};
  
  // Calculate the total available width for all columns (subtract margins)
  const availableWidth = 190; // Approximate available width in PDF document in mm
  
  // Calculate column content lengths
  const contentLengths = [];
  
  // Check headers
  headers.forEach((header, index) => {
    contentLengths[index] = String(header).length;
  });
  
  // Check all data rows
  data.forEach(row => {
    row.forEach((cell, index) => {
      const cellLength = String(cell || '').length;
      contentLengths[index] = Math.max(contentLengths[index] || 0, cellLength);
    });
  });
  
  // Calculate total content length
  const totalContentLength = contentLengths.reduce((sum, length) => sum + length, 0);
  
  // Distribute available width proportionally based on content length
  contentLengths.forEach((length, index) => {
    // Calculate proportional width (min 15, max 60)
    const proportion = length / totalContentLength;
    const width = Math.max(15, Math.min(60, proportion * availableWidth));
    
    // Assign to column styles
    columnStyles[index] = { cellWidth: width };
  });
  
  return columnStyles;
}

// Update the filterSubmissions function to include new filters
function filterSubmissions() {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedField = searchField.value;
  const selectedDate = dateFilter.value;
  const selectedUserType = userTypeFilter.value;
  const selectedCampus = campusFilter.value;
  
  let filteredSubmissions = [...submissions];
  
  // Apply date filter if selected
  if (selectedDate) {
    filteredSubmissions = filteredSubmissions.filter(sub => sub.date === selectedDate);
  }
  
  // Apply user type filter if selected
  if (selectedUserType !== 'all') {
    filteredSubmissions = filteredSubmissions.filter(sub => 
      sub.userType.toLowerCase() === selectedUserType.toLowerCase()
    );
  }
  
  // Apply campus filter if selected (for both LPU and non-LPU students)
  if (selectedCampus !== 'all') {
    filteredSubmissions = filteredSubmissions.filter(sub => {
      // Check if campus matches for any student type
      return sub.campus === selectedCampus;
    });
  }
  
  // Apply search filter if search term exists
  if (searchTerm) {
    filteredSubmissions = filteredSubmissions.filter(sub => {
      if (selectedField === 'all') {
        return (
          sub.name.toLowerCase().includes(searchTerm) ||
          sub.studentNumber.toLowerCase().includes(searchTerm) ||
          sub.campus.toLowerCase().includes(searchTerm) ||
          sub.program.toLowerCase().includes(searchTerm) ||
          sub.school.toLowerCase().includes(searchTerm) ||
          sub.thesisTitle.toLowerCase().includes(searchTerm)
        );
      } else {
        const fieldValue = sub[selectedField].toLowerCase();
        return fieldValue.includes(searchTerm);
      }
    });
  }
  
  return filteredSubmissions;
}

// Remove updatePagination function and its references
function updatePagination(filteredSubmissions) {
  // Remove pagination functionality
}

// Update the updateTableWithFilters function to show all records
function updateTableWithFilters() {
  const filteredSubmissions = filterSubmissions();
  const tbody = document.querySelector('#adminDashboard table tbody');
  tbody.innerHTML = '';
  
  // Update export button text based on filters
  const searchTerm = searchInput.value;
  const selectedDate = dateFilter.value;
  const selectedUserType = userTypeFilter.value;
  const selectedCampus = campusFilter.value;
  const adminExportBtn = document.getElementById('adminExportBtn');
  
  if (searchTerm || selectedDate || selectedUserType !== 'all' || selectedCampus !== 'all') {
    adminExportBtn.innerHTML = '<i class="ri-download-line mr-2"></i>Export Filtered Records';
  } else {
    adminExportBtn.innerHTML = '<i class="ri-download-line mr-2"></i>Export All Records';
  }
  
  // Show all filtered submissions
  filteredSubmissions.forEach(submission => {
    const tr = document.createElement('tr');
    tr.className = 'hover:bg-gray-50';
    tr.innerHTML = `
      <td class="py-3 px-2">${submission.date}</td>
      <td class="py-3 px-2">${submission.userType}</td>
      <td class="py-3 px-2">${submission.name}</td>
      <td class="py-3 px-2">${submission.studentNumber}</td>
      <td class="py-3 px-2">${submission.campus || '-'}</td>
      <td class="py-3 px-2">${submission.program}</td>
      <td class="py-3 px-2">${submission.school}</td>
      <td class="py-3 px-2">${submission.thesisTitle}</td>
      <td class="py-3 px-2">
        <div class="flex space-x-2">
          <button class="view-btn text-blue-600 hover:text-blue-800 w-8 h-8 flex items-center justify-center">
            <i class="ri-eye-line"></i>
          </button>
          <button class="edit-btn text-green-600 hover:text-green-800 w-8 h-8 flex items-center justify-center">
            <i class="ri-edit-line"></i>
          </button>
          <button class="delete-btn text-red-600 hover:text-red-800 w-8 h-8 flex items-center justify-center">
            <i class="ri-delete-bin-line"></i>
          </button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
  
  // Add event listeners to the new buttons
  addDeleteButtonListeners();
  addEditButtonListeners();
  addViewButtonListeners();
}

// Add event listeners for search and filter
searchInput.addEventListener('input', updateTableWithFilters);
searchField.addEventListener('change', updateTableWithFilters);
dateFilter.addEventListener('change', updateTableWithFilters);
userTypeFilter.addEventListener('change', updateTableWithFilters);
campusFilter.addEventListener('change', updateTableWithFilters);

// Initial render
updateTableWithFilters();

// Add export functionality
const exportModal = document.getElementById('exportModal');
const closeExportModalBtn = document.getElementById('closeExportModalBtn');
const cancelExportBtn = document.getElementById('cancelExportBtn');
const confirmExportBtn = document.getElementById('confirmExportBtn');
const exportFormat = document.getElementById('exportFormat');
const adminExportBtn = document.getElementById('adminExportBtn');

// Show export modal
adminExportBtn.addEventListener('click', function() {
  // Get filtered submissions
  const filteredSubmissions = filterSubmissions();
  
  // Update modal title based on filters
  const searchTerm = searchInput.value;
  const selectedDate = dateFilter.value;
  const selectedUserType = userTypeFilter.value;
  const selectedCampus = campusFilter.value;
  const modalTitle = document.querySelector('#exportModal h3');
  const recordCountElement = document.getElementById('exportRecordCount');
  
  if (searchTerm || selectedDate || selectedUserType !== 'all' || selectedCampus !== 'all') {
    modalTitle.innerHTML = '<i class="ri-download-line mr-2"></i>Export Filtered Records';
  } else {
    modalTitle.innerHTML = '<i class="ri-download-line mr-2"></i>Export All Records';
  }
  
  // Update record count
  recordCountElement.textContent = `${filteredSubmissions.length} records will be exported`;
  
  // Show the modal
  exportModal.classList.remove('hidden');
});

// Close export modal
function closeExportModal() {
  exportModal.classList.add('hidden');
}

closeExportModalBtn.addEventListener('click', closeExportModal);
cancelExportBtn.addEventListener('click', closeExportModal);

// Handle export confirmation
confirmExportBtn.addEventListener('click', function() {
  try {
    // Get selected fields
    const selectedFields = Array.from(document.querySelectorAll('#exportModal input[type="checkbox"]:checked')).map(cb => 
      cb.nextElementSibling.textContent.trim()
    );
    
    // Get filtered submissions
    const filteredSubmissions = filterSubmissions();
    
    // Prepare data for export
    const headers = selectedFields;
    const data = filteredSubmissions.map(sub => {
      const row = [];
      if (selectedFields.includes('Date')) row.push(sub.date);
      if (selectedFields.includes('User Type')) row.push(sub.userType);
      if (selectedFields.includes('Name')) row.push(sub.name);
      if (selectedFields.includes('Student Number')) row.push(sub.studentNumber);
      if (selectedFields.includes('Campus')) row.push(sub.campus || '-');
      if (selectedFields.includes('Program/Department')) row.push(sub.program);
      if (selectedFields.includes('School Name')) row.push(sub.school);
      if (selectedFields.includes('Thesis Title')) row.push(sub.thesisTitle);
      return row;
    });
    
    // Get filter information
    const searchTerm = searchInput.value;
    const selectedDate = dateFilter.value;
    const selectedUserType = userTypeFilter.value;
    const selectedCampus = campusFilter.value;
    const title = (searchTerm || selectedDate || selectedUserType !== 'all' || selectedCampus !== 'all') ? 'Filtered Research Records Export' : 'Researchers\' Records Export';
    
    // Build filter information text
    let filterInfo = '';
    if (searchTerm) {
      const selectedField = searchField.value;
      filterInfo += `Search: "${searchTerm}" in ${selectedField === 'all' ? 'all fields' : selectedField}`;
    }
    if (selectedDate) {
      filterInfo += filterInfo ? `, Date: ${selectedDate}` : `Date: ${selectedDate}`;
    }
    if (selectedUserType !== 'all') {
      filterInfo += filterInfo ? `, User Type: ${selectedUserType}` : `User Type: ${selectedUserType}`;
    }
    if (selectedCampus !== 'all') {
      filterInfo += filterInfo ? `, Campus: ${selectedCampus}` : `Campus: ${selectedCampus}`;
    }

    // Check export format selection
    const exportType = exportFormat.value;
    
    if (exportType === 'pdf') {
      // PDF Export
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();
      
      // Add title
      doc.setFontSize(16);
      doc.text(title, 14, 15);
      
      // Add date and filter info
      doc.setFontSize(10);
      doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 25);
      
      // Add filter information
      if (filterInfo) {
        doc.text(`Filters applied: ${filterInfo}`, 14, 30);
        doc.text(`Records found: ${filteredSubmissions.length}`, 14, 35);
      }
      
      // Add table
      doc.autoTable({
        head: [headers],
        body: data,
        startY: filterInfo ? 45 : 35,
        theme: 'grid',
        headStyles: {
          fillColor: [191, 47, 47], // Primary color
          textColor: 255,
          fontStyle: 'bold'
        },
        styles: {
          fontSize: 8,
          cellPadding: 2
        },
        columnStyles: generateColumnStyles(headers, data),
        didDrawPage: function(data) {
          // Add page number at the bottom
          const pageCount = doc.internal.getNumberOfPages();
          doc.setFontSize(8);
          doc.text(`Page ${data.pageNumber} of ${pageCount}`, data.settings.margin.left, doc.internal.pageSize.height - 10);
        }
      });
      
      // Save the PDF with appropriate filename
      const filename = filterInfo ? 'filtered_research_records.pdf' : 'research_records_export.pdf';
      doc.save(filename);
    } else if (exportType === 'excel') {
      // Excel Export
      const xlsx = window.XLSX;
      
      // Create worksheet with headers
      const ws = xlsx.utils.aoa_to_sheet([headers, ...data]);
      
      // Auto-size columns
      const colWidths = [];
      
      // First calculate maximum width needed for each column
      [headers, ...data].forEach(row => {
        row.forEach((cell, i) => {
          const cellValue = String(cell || '');
          // Approximate width based on character count
          const cellWidth = Math.max(cellValue.length, 10); // minimum 10 characters
          colWidths[i] = Math.max(colWidths[i] || 0, cellWidth);
        });
      });
      
      // Apply column widths
      ws['!cols'] = colWidths.map(width => ({ wch: width + 2 })); // +2 for padding
      
      // Create workbook and add the worksheet
      const wb = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(wb, ws, 'Research Records');
      
      // Add metadata
      wb.Props = {
        Title: title,
        Subject: "Research Records",
        CreatedDate: new Date()
      };
      
      // Generate filename
      const filename = filterInfo ? 'filtered_research_records.xlsx' : 'research_records_export.xlsx';
      
      // Save the file
      xlsx.writeFile(wb, filename);
    }
    
    // Close the modal
    closeExportModal();
    
    // Show success message
    alert('Export successful! The file has been downloaded.');
  } catch (error) {
    console.error('Export failed:', error);
    alert('Export failed. Please try again or check the console for details.');
  }
});

// Function to reset the form completely
function resetForm() {
  const form = document.getElementById('researchForm');
  form.reset();
  
  // Reset radio buttons to default state
  document.getElementById('lpuRadio').checked = true;
  
  // Reset all input fields
  document.getElementById('fullName').value = '';
  document.getElementById('studentNumber').value = '';
  document.getElementById('campus').value = '';
  document.getElementById('program').value = '';
  document.getElementById('schoolName').value = '';
  document.getElementById('thesisTitle').value = '';
  
  // Reset field visibility
  document.getElementById('lpuFields').classList.remove('hidden');
  document.getElementById('programField').classList.remove('hidden');
  document.getElementById('schoolField').classList.add('hidden');
  
  // Reset required attributes
  document.getElementById('studentNumber').required = true;
  document.getElementById('program').required = true;
  document.getElementById('schoolName').required = false;
}

// Modify the form submission handler
researchForm.addEventListener('submit', function(e) {
  e.preventDefault();
  // ... existing submission code ...
  
  // After successful submission, reset the form
  resetForm();
});

// Update the admin logout function
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
// Update the edit submission function
document.getElementById('editSubmissionBtn').addEventListener('click', function() {
  successModal.classList.add('hidden');
  resetForm();
});

// Update the final close buttons
document.getElementById('finalCloseBtn').addEventListener('click', function() {
  successModal.classList.add('hidden');
  resetForm();
});

document.getElementById('finalCloseBtn2').addEventListener('click', function() {
  successModal.classList.add('hidden');
  resetForm();
});
