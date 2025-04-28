// Form submission
const researchForm = document.getElementById('researchForm');
const successModal = document.getElementById('successModal');

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
document.getElementById('closeModalBtn').addEventListener('click', closeModal);

// Edit submission function
document.getElementById('editSubmissionBtn').addEventListener('click', function() {
  successModal.classList.add('hidden');
  resetForm();
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
    resetForm();
  });
  
  document.getElementById('finalCloseBtn2').addEventListener('click', function() {
    successModal.classList.add('hidden');
    resetForm();
  });
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
    document.getElementById('summarySchool').textContent = schoolName;
    document.getElementById('summaryStudentNumberRow').classList.add('hidden');
    document.getElementById('summaryProgramRow').classList.add('hidden');
    document.getElementById('summaryCampusRow').classList.add('hidden');
    document.getElementById('summarySchoolRow').classList.remove('hidden');
  }
  
  // Show the modal
  successModal.classList.remove('hidden');
});