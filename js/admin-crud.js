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
        program: row.cells[4].textContent,
        school: row.cells[5].textContent,
        thesisTitle: row.cells[6].textContent
      };
      showDeleteConfirmation(submission);
    });
  });
}

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
    document.getElementById('editLpuFields').classList.add('hidden');
    document.getElementById('editProgramField').classList.add('hidden');
    document.getElementById('editCampusField').classList.add('hidden');
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
    document.getElementById('editCampusField').classList.add('hidden');
    document.getElementById('editSchoolField').classList.remove('hidden');
    document.getElementById('editStudentNumber').required = false;
    document.getElementById('editProgram').required = false;
    document.getElementById('editSchoolName').required = true;
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
      campus: document.getElementById('editLpuRadio').checked ? document.getElementById('editCampus').value : '-',
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
    
    document.getElementById('viewStudentNumberContainer').classList.add('hidden');
    document.getElementById('viewCampusContainer').classList.add('hidden');
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
        program: row.cells[4].textContent,
        school: row.cells[5].textContent,
        thesisTitle: row.cells[6].textContent
      };
      showViewModal(submission);
    });
  });
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
        program: row.cells[4].textContent,
        school: row.cells[5].textContent,
        thesisTitle: row.cells[6].textContent
      };
      showEditModal(submission);
    });
  });
}

// Update the updateAdminTable function to include all CRUD functionality
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
      <td class="py-3 px-4">${submission.date}</td>
      <td class="py-3 px-4">${submission.userType}</td>
      <td class="py-3 px-4">${submission.name}</td>
      <td class="py-3 px-4">${submission.studentNumber}</td>
      <td class="py-3 px-4">${submission.program}</td>
      <td class="py-3 px-4">${submission.school}</td>
      <td class="py-3 px-4">${submission.thesisTitle}</td>
      <td class="py-3 px-4">
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