// Add search functionality
const searchInput = document.getElementById('searchInput');
const searchField = document.getElementById('searchField');
const dateFilter = document.getElementById('dateFilter');

// Update the filterSubmissions function to remove pagination
function filterSubmissions() {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedField = searchField.value;
  const selectedDate = dateFilter.value;
  
  let filteredSubmissions = [...submissions];
  
  // Apply date filter if selected
  if (selectedDate) {
    filteredSubmissions = filteredSubmissions.filter(sub => sub.date === selectedDate);
  }
  
  // Apply search filter if search term exists
  if (searchTerm) {
    filteredSubmissions = filteredSubmissions.filter(sub => {
      if (selectedField === 'all') {
        return (
          sub.name.toLowerCase().includes(searchTerm) ||
          sub.studentNumber.toLowerCase().includes(searchTerm) ||
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

// Update the updateTableWithFilters function to show all records
function updateTableWithFilters() {
  const filteredSubmissions = filterSubmissions();
  const tbody = document.querySelector('#adminDashboard table tbody');
  tbody.innerHTML = '';
  
  // Update export button text based on filters
  const searchTerm = searchInput.value;
  const selectedDate = dateFilter.value;
  const adminExportBtn = document.getElementById('adminExportBtn');
  
  if (searchTerm || selectedDate) {
    adminExportBtn.innerHTML = '<i class="ri-download-line mr-2"></i>Export Filtered Records';
  } else {
    adminExportBtn.innerHTML = '<i class="ri-download-line mr-2"></i>Export All Records';
  }
  
  // Show all filtered submissions
  filteredSubmissions.forEach(submission => {
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

// Add event listeners for search and filter
searchInput.addEventListener('input', updateTableWithFilters);
searchField.addEventListener('change', updateTableWithFilters);
dateFilter.addEventListener('change', updateTableWithFilters);