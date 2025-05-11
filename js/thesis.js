// Thesis Details Tab Functionality
document.addEventListener('DOMContentLoaded', function() {

  // Tab switching for admin dashboard
  const recordsTabBtn = document.getElementById('recordsTabBtn');
  const statisticsTabBtn = document.getElementById('statisticsTabBtn');
  const thesisTabBtn = document.getElementById('thesisTabBtn');
  
  // Thesis upload method tab switching
  const thesisDetailsTabBtn = document.getElementById('thesisDetailsTabBtn');
  const thesisDocumentTabBtn = document.getElementById('thesisDocumentTabBtn');
  const thesisDatabaseTabBtn = document.getElementById('thesisDatabaseTabBtn');
  const thesisDetailsTabContent = document.getElementById('thesisDetailsTabContent');
  const thesisDocumentTabContent = document.getElementById('thesisDocumentTabContent');
  const thesisDatabaseTabContent = document.getElementById('thesisDatabaseTabContent');
  const recordsTabContent = document.getElementById('recordsTabContent');
  const statisticsTabContent = document.getElementById('statisticsTabContent');
  const thesisTabContent = document.getElementById('thesisTabContent');
  
  // Initialize thesis records array from localStorage
  let thesisRecords = JSON.parse(localStorage.getItem('thesisRecords')) || [];
  
  // Debug
  console.log('Initial thesis records:', thesisRecords);
  
  // If there are no thesis records, create some sample data
  if (thesisRecords.length === 0) {
    // Sample data for testing
    const sampleTheses = [
      {
        id: '1000001',
        title: 'Machine Learning Applications in Healthcare',
        author: 'John Smith',
        department: 'Computer Science',
        year: '2023',
        abstract: 'This research explores the application of machine learning in healthcare diagnostics.',
        keywords: ['machine learning', 'healthcare', 'ai'],
        recordType: 'manual',
        uploadDate: new Date('2023-06-15').toISOString()
      },
      {
        id: '1000002',
        title: 'Sustainable Business Practices in Emerging Markets',
        author: 'Sarah Johnson',
        department: 'Business Administration',
        year: '2024',
        abstract: 'A study on implementing sustainable business models in developing economies.',
        keywords: ['sustainability', 'business', 'emerging markets'],
        recordType: 'manual',
        uploadDate: new Date('2024-01-10').toISOString()
      }
    ];
    
    // Add sample data
    thesisRecords = sampleTheses;
    
    // Save to localStorage
    localStorage.setItem('thesisRecords', JSON.stringify(thesisRecords));
    
    console.log('Created sample thesis records:', thesisRecords);
  }
  
  // Reset all tabs function
  function resetAllTabs() {
    // Reset all tab buttons
    recordsTabBtn.classList.remove('border-primary', 'text-primary');
    recordsTabBtn.classList.add('border-transparent', 'hover:text-gray-600', 'hover:border-gray-300');
    statisticsTabBtn.classList.remove('border-primary', 'text-primary');
    statisticsTabBtn.classList.add('border-transparent', 'hover:text-gray-600', 'hover:border-gray-300');
    thesisTabBtn.classList.remove('border-primary', 'text-primary');
    thesisTabBtn.classList.add('border-transparent', 'hover:text-gray-600', 'hover:border-gray-300');
    
    // Hide all tab contents
    recordsTabContent.classList.add('hidden');
    statisticsTabContent.classList.add('hidden');
    thesisTabContent.classList.add('hidden');
  }
  
  // Records Tab
  if (recordsTabBtn) {
    recordsTabBtn.addEventListener('click', function(e) {
      e.preventDefault();
      resetAllTabs();
      
      // Activate this tab
      recordsTabBtn.classList.remove('border-transparent', 'hover:text-gray-600', 'hover:border-gray-300');
      recordsTabBtn.classList.add('border-primary', 'text-primary');
      recordsTabContent.classList.remove('hidden');
    });
  }
  
  // Statistics Tab
  if (statisticsTabBtn) {
    statisticsTabBtn.addEventListener('click', function(e) {
      e.preventDefault();
      resetAllTabs();
      
      // Activate this tab
      statisticsTabBtn.classList.remove('border-transparent', 'hover:text-gray-600', 'hover:border-gray-300');
      statisticsTabBtn.classList.add('border-primary', 'text-primary');
      statisticsTabContent.classList.remove('hidden');
    });
  }
  
  // Thesis Tab
  if (thesisTabBtn) {
    thesisTabBtn.addEventListener('click', function(e) {
      e.preventDefault();
      resetAllTabs();
      
      // Activate this tab
      thesisTabBtn.classList.remove('border-transparent', 'hover:text-gray-600', 'hover:border-gray-300');
      thesisTabBtn.classList.add('border-primary', 'text-primary');
      thesisTabContent.classList.remove('hidden');
      
      // Show database tab content by default if no other tab is active
      if (thesisDatabaseTabBtn && 
          !thesisDetailsTabContent.classList.contains('block') && 
          !thesisDocumentTabContent.classList.contains('block')) {
        thesisDatabaseTabBtn.click();
      }
    });
  }

  // Function to reset all inner tabs
  function resetThesisTabs() {
    // Hide all tab contents
    thesisDetailsTabContent.classList.add('hidden');
    thesisDetailsTabContent.classList.remove('block');
    thesisDocumentTabContent.classList.add('hidden');
    thesisDocumentTabContent.classList.remove('block');
    thesisDatabaseTabContent.classList.add('hidden');
    thesisDatabaseTabContent.classList.remove('block');
    
    // Reset all tab button styles
    thesisDetailsTabBtn.classList.remove('border-primary', 'text-primary');
    thesisDetailsTabBtn.classList.add('border-transparent', 'hover:text-gray-600', 'hover:border-gray-300');
    thesisDocumentTabBtn.classList.remove('border-primary', 'text-primary');
    thesisDocumentTabBtn.classList.add('border-transparent', 'hover:text-gray-600', 'hover:border-gray-300');
    thesisDatabaseTabBtn.classList.remove('border-primary', 'text-primary');
    thesisDatabaseTabBtn.classList.add('border-transparent', 'hover:text-gray-600', 'hover:border-gray-300');
  }
  
  // Handle thesis upload method tab switching
  if (thesisDetailsTabBtn) {
    thesisDetailsTabBtn.addEventListener('click', function() {
      resetThesisTabs();
      
      // Show thesis details tab
      thesisDetailsTabContent.classList.remove('hidden');
      thesisDetailsTabContent.classList.add('block');
      
      // Update tab styling
      thesisDetailsTabBtn.classList.add('border-primary', 'text-primary');
      thesisDetailsTabBtn.classList.remove('border-transparent', 'hover:text-gray-600', 'hover:border-gray-300');
    });
  }
  
  if (thesisDocumentTabBtn) {
    thesisDocumentTabBtn.addEventListener('click', function() {
      resetThesisTabs();
      
      // Show document upload tab
      thesisDocumentTabContent.classList.remove('hidden');
      thesisDocumentTabContent.classList.add('block');
      
      // Update tab styling
      thesisDocumentTabBtn.classList.add('border-primary', 'text-primary');
      thesisDocumentTabBtn.classList.remove('border-transparent', 'hover:text-gray-600', 'hover:border-gray-300');
    });
  }
  
  if (thesisDatabaseTabBtn) {
    thesisDatabaseTabBtn.addEventListener('click', function() {
      resetThesisTabs();
      
      // Show database table tab
      thesisDatabaseTabContent.classList.remove('hidden');
      thesisDatabaseTabContent.classList.add('block');
      
      // Update tab styling
      thesisDatabaseTabBtn.classList.add('border-primary', 'text-primary');
      thesisDatabaseTabBtn.classList.remove('border-transparent', 'hover:text-gray-600', 'hover:border-gray-300');
      
      // Populate the table with current data
      populateThesisTable();
    });
  }
  
  // Thesis details form variables
  const thesisUploadForm = document.getElementById('thesisUploadForm');
  const submitThesisBtn = document.getElementById('submitThesisBtn');
  
  // Thesis document upload form variables
  const thesisDocumentUploadForm = document.getElementById('thesisDocumentUploadForm');
  const thesisDocPdfUpload = document.getElementById('thesisDocPdfUpload');
  const thesisDocExcelUpload = document.getElementById('thesisDocExcelUpload');
  const docSelectedFileInfo = document.getElementById('docSelectedFileInfo');
  const docSelectedFileName = document.getElementById('docSelectedFileName');
  const docSelectedFileSize = document.getElementById('docSelectedFileSize');
  const docRemoveSelectedFile = document.getElementById('docRemoveSelectedFile');
  const submitDocumentBtn = document.getElementById('submitDocumentBtn');
  
  // File selection variables
  let selectedDocFile = null;
  let docFileType = '';
  
  // Enable submit button by default for thesis details form as it no longer requires file upload
  if (submitThesisBtn) {
    submitThesisBtn.disabled = false;
  }
  
  // File upload handlers for thesis document form
  if (thesisDocPdfUpload) {
    thesisDocPdfUpload.addEventListener('change', function(e) {
      if (e.target.files.length > 0) {
        selectedDocFile = e.target.files[0];
        docFileType = 'pdf';
        
        // Show file info
        showDocSelectedFileInfo(selectedDocFile, docFileType);
        
        // Enable submit button
        if (submitDocumentBtn) submitDocumentBtn.disabled = false;
        
        // Clear other file input
        if (thesisDocExcelUpload) thesisDocExcelUpload.value = '';
      }
    });
  }
  
  if (thesisDocExcelUpload) {
    thesisDocExcelUpload.addEventListener('change', function(e) {
      if (e.target.files.length > 0) {
        selectedDocFile = e.target.files[0];
        docFileType = 'excel';
        
        // Show file info
        showDocSelectedFileInfo(selectedDocFile, docFileType);
        
        // Enable submit button
        if (submitDocumentBtn) submitDocumentBtn.disabled = false;
        
        // Clear other file input
        if (thesisDocPdfUpload) thesisDocPdfUpload.value = '';
      }
    });
  }
  
  // Remove selected document file
  if (docRemoveSelectedFile) {
    docRemoveSelectedFile.addEventListener('click', function() {
      // Clear file inputs
      if (thesisDocPdfUpload) thesisDocPdfUpload.value = '';
      if (thesisDocExcelUpload) thesisDocExcelUpload.value = '';
      
      // Hide file info
      if (docSelectedFileInfo) docSelectedFileInfo.classList.add('hidden');
      
      // Reset variables
      selectedDocFile = null;
      docFileType = '';
      
      // Disable submit button
      if (submitDocumentBtn) submitDocumentBtn.disabled = true;
    });
  }
  
  // Function to display document file information
  function showDocSelectedFileInfo(file, fileType) {
    if (docSelectedFileInfo && docSelectedFileName && docSelectedFileSize) {
      docSelectedFileInfo.classList.remove('hidden');
      docSelectedFileName.textContent = file.name;
      docSelectedFileSize.textContent = formatFileSize(file.size);
      
      // Update icon based on file type
      const fileIcon = docSelectedFileInfo.querySelector('i.ri-file-line');
      if (fileIcon) {
        if (fileType === 'pdf') {
          fileIcon.className = 'ri-file-pdf-line text-red-600 mr-2';
        } else if (fileType === 'excel') {
          fileIcon.className = 'ri-file-excel-line text-green-600 mr-2';
        } else {
          fileIcon.className = 'ri-file-line text-gray-600 mr-2';
        }
      }
    }
  }
  
  // Format file size (bytes to KB/MB)
  function formatFileSize(bytes) {
    if (bytes < 1024) {
      return bytes + ' bytes';
    } else if (bytes < 1048576) {
      return (bytes / 1024).toFixed(2) + ' KB';
    } else {
      return (bytes / 1048576).toFixed(2) + ' MB';
    }
  }
  
  // Thesis Details Form Submit Handler
  if (thesisUploadForm) {
    thesisUploadForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values - use form-specific selectors to avoid ID conflicts
      const thesisForm = document.getElementById('thesisUploadForm');
      const thesisTitle = thesisForm.querySelector('#thesisTitle').value.trim();
      const thesisAuthor = thesisForm.querySelector('#thesisAuthor').value.trim();
      const thesisDepartment = thesisForm.querySelector('#thesisDepartment').value;
      const thesisYear = thesisForm.querySelector('#thesisYear').value;
      const thesisAbstract = thesisForm.querySelector('#thesisAbstract').value.trim();
      const thesisKeywords = thesisForm.querySelector('#thesisKeywords').value;
      
      // Debug - check what values are being captured
      console.log('Form submit - Title:', thesisTitle);
      console.log('Form submit - Author:', thesisAuthor);
      console.log('Form submit - Department:', thesisDepartment);
      
      // Validate title is not empty
      if (!thesisTitle) {
        alert('Please enter a thesis title');
        return;
      }
      
      // Update button to show loading state
      if (submitThesisBtn) {
        submitThesisBtn.innerHTML = '<i class="ri-loader-4-line animate-spin mr-2"></i>Uploading...';
        submitThesisBtn.disabled = true;
      }
      
      // Simulate processing delay
      setTimeout(function() {
        // Create new thesis record with a generated ID instead of a file
        const newThesis = {
          id: Date.now().toString(),
          title: thesisTitle,
          author: thesisAuthor,
          department: thesisDepartment,
          year: thesisYear,
          abstract: thesisAbstract,
          keywords: thesisKeywords.split(',').map(k => k.trim()),
          recordType: 'manual',
          uploadDate: new Date().toISOString()
        };
        
        // Debug log the new thesis object
        console.log('New thesis record:', newThesis);
        
        // Add to records array
        thesisRecords.unshift(newThesis);
        
        // Save to localStorage
        localStorage.setItem('thesisRecords', JSON.stringify(thesisRecords));
        
        // Reset form and re-enable submit button
        thesisForm.reset();
        
        if (submitThesisBtn) {
          submitThesisBtn.innerHTML = '<i class="ri-save-line mr-2"></i>Save Thesis';
          submitThesisBtn.disabled = false;
        }
        
        // If database tab is visible, refresh the table
        if (thesisDatabaseTabContent && !thesisDatabaseTabContent.classList.contains('hidden')) {
          populateThesisTable();
        }
        
        // Show success message
        const successToast = document.createElement('div');
        successToast.className = 'fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded shadow-lg z-50 flex items-center';
        successToast.innerHTML = `
          <i class="ri-check-line mr-2 text-xl"></i>
          <div>
            <p class="font-medium">Thesis details saved successfully</p>
            <p class="text-sm opacity-80">${thesisTitle}</p>
          </div>
        `;
        document.body.appendChild(successToast);
        
        // Remove toast after 5 seconds
        setTimeout(function() {
          successToast.classList.add('opacity-0', 'transition-opacity', 'duration-300');
          setTimeout(() => successToast.remove(), 300);
        }, 5000);
      }, 1500);
    });
  }
  
  // Thesis Document Upload Form Submit Handler
  if (thesisDocumentUploadForm) {
    thesisDocumentUploadForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      if (!selectedDocFile) {
        alert('Please select a document to upload');
        return;
      }
      
      // Update button to show loading state
      if (submitDocumentBtn) {
        submitDocumentBtn.innerHTML = '<i class="ri-loader-4-line animate-spin mr-2"></i>Processing...';
        submitDocumentBtn.disabled = true;
      }
      
      // Simulate processing delay (this would be replaced with actual document parsing in a real implementation)
      setTimeout(function() {
        // Get file name for display
        const fileName = selectedDocFile.name;
        
        // In a real implementation, you would:
        // 1. Parse the PDF or Excel document to extract thesis records
        // 2. Process each record and add to the thesisRecords array
        // 3. Save all records to localStorage
        
        // For demo purposes, simulate adding multiple records from the document
        const recordCount = Math.floor(Math.random() * 5) + 3; // Random number between 3-7 records
        const departments = ['Computer Science', 'Engineering', 'Business Administration', 'Nursing', 'Psychology'];
        const years = ['2022', '2023', '2024'];
        
        // Array to store new records for debugging
        const newRecords = [];
        
        for (let i = 0; i < recordCount; i++) {
          const newThesis = {
            id: (Date.now() + i).toString(),
            title: `Extracted Thesis ${i+1} from ${fileName}`,
            author: `Author ${i+1}`,
            department: departments[Math.floor(Math.random() * departments.length)],
            year: years[Math.floor(Math.random() * years.length)],
            abstract: `This is an automatically extracted abstract for thesis ${i+1} from the uploaded document.`,
            keywords: ['extracted', 'document', 'thesis'],
            fileType: docFileType,
            fileName: fileName,
            uploadDate: new Date().toISOString(),
            importedFromDocument: true
          };
          
          // Add to new records array for debugging
          newRecords.push(newThesis);
          
          // Add to records array
          thesisRecords.unshift(newThesis);
        }
        
        // Debug log the new records
        console.log('New thesis records from document:', newRecords);
        
        // Save to localStorage
        localStorage.setItem('thesisRecords', JSON.stringify(thesisRecords));
        
        // Reset form
        thesisDocumentUploadForm.reset();
        if (docSelectedFileInfo) docSelectedFileInfo.classList.add('hidden');
        if (submitDocumentBtn) {
          submitDocumentBtn.innerHTML = '<i class="ri-upload-cloud-line mr-2"></i>Upload Document';
          submitDocumentBtn.disabled = true;
        }
        
        // If database tab is visible, refresh the table
        if (thesisDatabaseTabContent && !thesisDatabaseTabContent.classList.contains('hidden')) {
          populateThesisTable();
        }
        
        // Show success message
        const successToast = document.createElement('div');
        successToast.className = 'fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded shadow-lg z-50 flex items-center';
        successToast.innerHTML = `
          <i class="ri-check-line mr-2 text-xl"></i>
          <div>
            <p class="font-medium">Document processed successfully</p>
            <p class="text-sm opacity-80">${recordCount} thesis records extracted from ${fileName}</p>
          </div>
        `;
        document.body.appendChild(successToast);
        
        // Remove toast after 5 seconds
        setTimeout(function() {
          successToast.classList.add('opacity-0', 'transition-opacity', 'duration-300');
          setTimeout(() => successToast.remove(), 300);
        }, 5000);
      }, 2500); // Longer delay to simulate document processing
    });
  }
  
  // No table functionality needed
  
  // Thesis Database Table functionality
  const thesisTable = document.getElementById('thesisTable');
  const thesisTableBody = document.getElementById('thesisTableBody');
  const thesisSearchInput = document.getElementById('thesisSearchInput');
  const thesisSearchBtn = document.getElementById('thesisSearchBtn');
  const thesisDeptFilter = document.getElementById('thesisDeptFilter');
  const thesisYearFilter = document.getElementById('thesisYearFilter');
  const thesisTypeFilter = document.getElementById('thesisTypeFilter');
  
  // Sort state
  let currentSortField = 'uploadDate';
  let currentSortDirection = 'desc'; // desc = newest first
  
  // Call populateThesisTable when admin page is loaded if database tab is visible
  if (thesisTabBtn && thesisDatabaseTabContent && !thesisDatabaseTabContent.classList.contains('hidden')) {
    console.log('Initializing thesis table on page load');
    setTimeout(populateThesisTable, 500); // Small delay to ensure DOM is ready
  }
  
  // Function to populate the thesis table with data
  function populateThesisTable() {
    if (!thesisTableBody) return;
    
    // Get filtered records
    const filteredRecords = filterThesisRecords();
    
    // Debug - log the records
    console.log('Filtered thesis records:', filteredRecords);
    
    // Clear the table body
    thesisTableBody.innerHTML = '';
    
    // If no records, show message
    if (filteredRecords.length === 0) {
      const noRecordsRow = document.createElement('tr');
      noRecordsRow.className = 'text-gray-500 text-center';
      noRecordsRow.innerHTML = `
        <td colspan="7" class="px-6 py-12">No thesis records found. Add records using the other tabs.</td>
      `;
      thesisTableBody.appendChild(noRecordsRow);
      return;
    }
    
    // Sort the records
    sortThesisRecords(filteredRecords);
    
    // Add each record to the table
    filteredRecords.forEach(thesis => {
      // Debug - log each thesis object
      console.log('Rendering thesis record:', thesis);
      
      const row = document.createElement('tr');
      row.className = 'hover:bg-gray-50';
      row.dataset.id = thesis.id;
      
      // Format the date
      const uploadDate = new Date(thesis.uploadDate);
      const formattedDate = uploadDate.toLocaleDateString();
      
      // Determine the type display
      let typeDisplay = '';
      let typeClass = '';
      
      if (thesis.recordType === 'manual') {
        typeDisplay = 'Manual Entry';
        typeClass = 'bg-blue-100 text-blue-800';
      } else if (thesis.fileType === 'pdf') {
        typeDisplay = 'PDF';
        typeClass = 'bg-red-100 text-red-800';
      } else if (thesis.fileType === 'excel') {
        typeDisplay = 'Excel';
        typeClass = 'bg-green-100 text-green-800';
      } else {
        typeDisplay = 'Unknown';
        typeClass = 'bg-gray-100 text-gray-800';
      }
      
      // Debug title value
      console.log('Thesis title:', thesis.title, typeof thesis.title);
      
      // Make sure title is a string and handle undefined/null
      const titleText = thesis.title ? thesis.title.toString() : 'No Title';
      const safeTitle = titleText.replace(/"/g, '&quot;'); // Escape quotes for HTML attributes
      
      // Create row HTML
      const rowHTML = `
        <td class="px-6 py-4">
          <div class="text-sm font-medium text-gray-900 line-clamp-2" title="${safeTitle}">${titleText}</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="text-sm text-gray-900">${thesis.author || 'Unknown'}</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="text-sm text-gray-900">${thesis.department || 'Unspecified'}</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="text-sm text-gray-900">${thesis.year || 'Unknown'}</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="text-sm text-gray-900">${formattedDate}</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${typeClass}">
            ${typeDisplay}
          </span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          <button data-action="view" data-id="${thesis.id}" class="text-indigo-600 hover:text-indigo-900 mr-3">
            <i class="ri-eye-line"></i>
          </button>
          <button data-action="edit" data-id="${thesis.id}" class="text-blue-600 hover:text-blue-900 mr-3">
            <i class="ri-edit-line"></i>
          </button>
          <button data-action="delete" data-id="${thesis.id}" class="text-red-600 hover:text-red-900">
            <i class="ri-delete-bin-line"></i>
          </button>
        </td>
      `;
      
      // Set row HTML and append to table
      row.innerHTML = rowHTML;
      thesisTableBody.appendChild(row);
    });
    
    // Add event listeners to action buttons
    addThesisActionListeners();
  }
  
  // Function to filter thesis records based on search and filters
  function filterThesisRecords() {
    const searchValue = thesisSearchInput ? thesisSearchInput.value.toLowerCase() : '';
    const deptFilter = thesisDeptFilter ? thesisDeptFilter.value : 'all';
    const yearFilter = thesisYearFilter ? thesisYearFilter.value : 'all';
    const typeFilter = thesisTypeFilter ? thesisTypeFilter.value : 'all';
    
    return thesisRecords.filter(thesis => {
      // Check if thesis properties exist to avoid errors
      if (!thesis) return false;
      
      // Search filter (title, author, department, keywords)
      const matchesSearch = searchValue === '' || 
        (thesis.title && thesis.title.toLowerCase().includes(searchValue)) ||
        (thesis.author && thesis.author.toLowerCase().includes(searchValue)) ||
        (thesis.department && thesis.department.toLowerCase().includes(searchValue)) ||
        (thesis.keywords && thesis.keywords.some(k => k.toLowerCase().includes(searchValue)));
      
      // Department filter
      const matchesDept = deptFilter === 'all' || thesis.department === deptFilter;
      
      // Year filter
      const matchesYear = yearFilter === 'all' || thesis.year === yearFilter;
      
      // Type filter
      let matchesType = typeFilter === 'all';
      if (typeFilter === 'manual') {
        matchesType = thesis.recordType === 'manual';
      } else if (typeFilter === 'pdf') {
        matchesType = thesis.fileType === 'pdf';
      } else if (typeFilter === 'excel') {
        matchesType = thesis.fileType === 'excel';
      }
      
      return matchesSearch && matchesDept && matchesYear && matchesType;
    });
  }
  
  // Function to sort thesis records
  function sortThesisRecords(records) {
    records.sort((a, b) => {
      let valueA = a[currentSortField];
      let valueB = b[currentSortField];
      
      // Special handling for dates
      if (currentSortField === 'uploadDate') {
        valueA = new Date(valueA).getTime();
        valueB = new Date(valueB).getTime();
      }
      
      // String comparison for string values
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return currentSortDirection === 'asc' 
          ? valueA.localeCompare(valueB) 
          : valueB.localeCompare(valueA);
      }
      
      // Numeric comparison
      return currentSortDirection === 'asc' ? valueA - valueB : valueB - valueA;
    });
  }
  
  // Add event listeners for thesis table sorting
  if (thesisTable) {
    const sortHeaders = thesisTable.querySelectorAll('th[data-sort]');
    sortHeaders.forEach(header => {
      header.addEventListener('click', function() {
        const sortField = this.dataset.sort;
        
        // Update sort direction
        if (sortField === currentSortField) {
          currentSortDirection = currentSortDirection === 'asc' ? 'desc' : 'asc';
        } else {
          currentSortField = sortField;
          currentSortDirection = 'asc';
        }
        
        // Update UI to show sort direction
        sortHeaders.forEach(h => {
          const icon = h.querySelector('i');
          if (h.dataset.sort === currentSortField) {
            icon.className = currentSortDirection === 'asc' 
              ? 'ri-arrow-up-s-line ml-1 text-primary' 
              : 'ri-arrow-down-s-line ml-1 text-primary';
          } else {
            icon.className = 'ri-arrow-up-s-line ml-1 text-gray-400';
          }
        });
        
        // Re-populate the table with sorted data
        populateThesisTable();
      });
    });
  }
  
  // Add event listeners for search and filters
  if (thesisSearchInput) {
    thesisSearchInput.addEventListener('input', populateThesisTable);
  }
  
  if (thesisSearchBtn) {
    thesisSearchBtn.addEventListener('click', populateThesisTable);
  }
  
  if (thesisDeptFilter) {
    thesisDeptFilter.addEventListener('change', populateThesisTable);
  }
  
  if (thesisYearFilter) {
    thesisYearFilter.addEventListener('change', populateThesisTable);
  }
  
  if (thesisTypeFilter) {
    thesisTypeFilter.addEventListener('change', populateThesisTable);
  }
  
  // Function to add event listeners to thesis action buttons
  function addThesisActionListeners() {
    const actionButtons = thesisTableBody.querySelectorAll('button[data-action]');
    
    actionButtons.forEach(button => {
      button.addEventListener('click', function() {
        const action = this.dataset.action;
        const id = this.dataset.id;
        const thesis = thesisRecords.find(r => r.id === id);
        
        if (!thesis) return;
        
        switch(action) {
          case 'view':
            showThesisViewModal(thesis);
            break;
          case 'edit':
            showThesisEditModal(thesis);
            break;
          case 'delete':
            showThesisDeleteConfirmation(thesis);
            break;
        }
      });
    });
  }
  
  // Function to show thesis view modal
  function showThesisViewModal(thesis) {
    // Create a simple alert for now - would be replaced with a modal in production
    alert(`Thesis Details:\n\nTitle: ${thesis.title}\nAuthor: ${thesis.author}\nDepartment: ${thesis.department}\nYear: ${thesis.year}\nAbstract: ${thesis.abstract}\nKeywords: ${thesis.keywords.join(', ')}`);
  }
  
  // Function to show thesis edit modal
  function showThesisEditModal(thesis) {
    // Create a simple prompt for now - would be replaced with a modal in production
    const newTitle = prompt('Edit thesis title:', thesis.title);
    if (newTitle !== null) {
      thesis.title = newTitle;
      localStorage.setItem('thesisRecords', JSON.stringify(thesisRecords));
      populateThesisTable();
    }
  }
  
  // Function to show thesis delete confirmation
  function showThesisDeleteConfirmation(thesis) {
    // Create a simple confirmation for now - would be replaced with a modal in production
    if (confirm(`Are you sure you want to delete the thesis "${thesis.title}"?`)) {
      const index = thesisRecords.findIndex(r => r.id === thesis.id);
      if (index !== -1) {
        thesisRecords.splice(index, 1);
        localStorage.setItem('thesisRecords', JSON.stringify(thesisRecords));
        populateThesisTable();
      }
    }
  }
  
  // Thesis Export Functionality
  const thesisExportModal = document.getElementById('thesisExportModal');
  const closeThesisExportBtn = document.getElementById('closeThesisExportBtn');
  const cancelThesisExportBtn = document.getElementById('cancelThesisExportBtn');
  const thesisExportPdfBtn = document.getElementById('thesisExportPdfBtn');
  const thesisExportExcelBtn = document.getElementById('thesisExportExcelBtn');
  
  // Function to close the export modal
  function closeThesisExportModal() {
    if (thesisExportModal) {
      thesisExportModal.classList.add('hidden');
    }
  }
  
  // Add close event listeners
  if (closeThesisExportBtn) {
    closeThesisExportBtn.addEventListener('click', closeThesisExportModal);
  }
  
  if (cancelThesisExportBtn) {
    cancelThesisExportBtn.addEventListener('click', closeThesisExportModal);
  }
  
  // Show export modal when clicking the export button
  if (thesisExportBtn) {
    thesisExportBtn.addEventListener('click', function() {
      const filteredRecords = filterThesisRecords();
      
      if (filteredRecords.length === 0) {
        alert('No records to export');
        return;
      }
      
      // Store filtered records for export functions to use
      thesisExportModal.dataset.recordCount = filteredRecords.length;
      
      // Show the export modal
      thesisExportModal.classList.remove('hidden');
    });
  }
  
  // Export to PDF functionality
  if (thesisExportPdfBtn) {
    thesisExportPdfBtn.addEventListener('click', function() {
      const filteredRecords = filterThesisRecords();
      
      if (filteredRecords.length === 0) {
        alert('No records to export');
        closeThesisExportModal();
        return;
      }
      
      // Close the modal
      closeThesisExportModal();
      
      // Show processing message
      const processingToast = document.createElement('div');
      processingToast.className = 'fixed top-4 right-4 bg-blue-600 text-white px-6 py-3 rounded shadow-lg z-50 flex items-center';
      processingToast.innerHTML = `
        <i class="ri-loader-4-line animate-spin mr-2 text-xl"></i>
        <div>
          <p class="font-medium">Generating PDF...</p>
          <p class="text-sm opacity-80">Please wait</p>
        </div>
      `;
      document.body.appendChild(processingToast);
      
      // Use jsPDF library (already included for statistics export)
      setTimeout(() => {
        try {
          const { jsPDF } = window.jspdf;
          const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
          });
          
          // Get filter information
          const searchValue = thesisSearchInput ? thesisSearchInput.value.toLowerCase() : '';
          const deptFilter = thesisDeptFilter ? thesisDeptFilter.value : 'all';
          const yearFilter = thesisYearFilter ? thesisYearFilter.value : 'all';
          const typeFilter = thesisTypeFilter ? thesisTypeFilter.value : 'all';
          
          // Create data for the table
          const headers = ['Title', 'Author', 'Department', 'Year', 'Upload Date', 'Type'];
          const data = filteredRecords.map(thesis => {
            // Format date
            const uploadDate = new Date(thesis.uploadDate);
            const formattedDate = uploadDate.toLocaleDateString();
            
            // Determine type display
            let typeDisplay = '';
            if (thesis.recordType === 'manual') {
              typeDisplay = 'Manual Entry';
            } else if (thesis.fileType === 'pdf') {
              typeDisplay = 'PDF';
            } else if (thesis.fileType === 'excel') {
              typeDisplay = 'Excel';
            } else {
              typeDisplay = 'Unknown';
            }
            
            return [
              thesis.title || 'No Title',
              thesis.author || 'Unknown',
              thesis.department || 'Unspecified',
              thesis.year || 'Unknown',
              formattedDate,
              typeDisplay
            ];
          });
          
          // Add title
          doc.setFontSize(16);
          const hasFilters = searchValue || deptFilter !== 'all' || yearFilter !== 'all' || typeFilter !== 'all';
          const title = hasFilters ? 'Filtered Thesis Repository Export' : 'Thesis Repository Export';
          doc.text(title, 14, 15);
          
          // Add date and filter info
          doc.setFontSize(10);
          doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 25);
          
          // Add filter information
          let filterInfo = '';
          if (searchValue) {
            filterInfo += `Search: "${searchValue}"`;
          }
          if (deptFilter !== 'all') {
            filterInfo += filterInfo ? `, Department: ${deptFilter}` : `Department: ${deptFilter}`;
          }
          if (yearFilter !== 'all') {
            filterInfo += filterInfo ? `, Year: ${yearFilter}` : `Year: ${yearFilter}`;
          }
          if (typeFilter !== 'all') {
            filterInfo += filterInfo ? `, Type: ${typeFilter}` : `Type: ${typeFilter}`;
          }
          
          // Add filter info and record count if filters applied
          if (filterInfo) {
            doc.text(`Filters applied: ${filterInfo}`, 14, 30);
            doc.text(`Records found: ${filteredRecords.length}`, 14, 35);
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
            columnStyles: {
              0: { cellWidth: 45 }, // Title
              1: { cellWidth: 30 }, // Author
              2: { cellWidth: 35 }, // Department
              3: { cellWidth: 15 }, // Year
              4: { cellWidth: 25 }, // Date
              5: { cellWidth: 20 }  // Type
            }
          });
          
          // Save the PDF with appropriate filename
          const filename = hasFilters ? 'filtered_thesis_records.pdf' : 'thesis_repository_export.pdf';
          doc.save(filename);
          
          // Remove processing toast
          document.body.removeChild(processingToast);
          
          // Show success message
          const successToast = document.createElement('div');
          successToast.className = 'fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded shadow-lg z-50 flex items-center';
          successToast.innerHTML = `
            <i class="ri-file-pdf-line mr-2 text-xl"></i>
            <div>
              <p class="font-medium">PDF export successful</p>
              <p class="text-sm opacity-80">${filteredRecords.length} records exported</p>
            </div>
          `;
          document.body.appendChild(successToast);
          
          // Remove toast after 5 seconds
          setTimeout(function() {
            successToast.classList.add('opacity-0', 'transition-opacity', 'duration-300');
            setTimeout(() => successToast.remove(), 300);
          }, 5000);
        } catch (error) {
          console.error('PDF export error:', error);
          
          // Remove processing toast
          document.body.removeChild(processingToast);
          
          // Show error message
          alert('Error generating PDF. Please try again.');
        }
      }, 500);
    });
  }
  
  // Export to Excel functionality
  if (thesisExportExcelBtn) {
    thesisExportExcelBtn.addEventListener('click', function() {
      const filteredRecords = filterThesisRecords();
      
      if (filteredRecords.length === 0) {
        alert('No records to export');
        closeThesisExportModal();
        return;
      }
      
      // Close the modal
      closeThesisExportModal();
      
      // Show processing message
      const processingToast = document.createElement('div');
      processingToast.className = 'fixed top-4 right-4 bg-blue-600 text-white px-6 py-3 rounded shadow-lg z-50 flex items-center';
      processingToast.innerHTML = `
        <i class="ri-loader-4-line animate-spin mr-2 text-xl"></i>
        <div>
          <p class="font-medium">Generating Excel spreadsheet...</p>
          <p class="text-sm opacity-80">Please wait</p>
        </div>
      `;
      document.body.appendChild(processingToast);
      
      setTimeout(() => {
        try {
          // Get filter information for headers
          const searchValue = thesisSearchInput ? thesisSearchInput.value.toLowerCase() : '';
          const deptFilter = thesisDeptFilter ? thesisDeptFilter.value : 'all';
          const yearFilter = thesisYearFilter ? thesisYearFilter.value : 'all';
          const typeFilter = thesisTypeFilter ? thesisTypeFilter.value : 'all';
          
          // Title and meta information
          const hasFilters = searchValue || deptFilter !== 'all' || yearFilter !== 'all' || typeFilter !== 'all';
          const title = hasFilters ? 'Filtered Thesis Repository Export' : 'Thesis Repository Export';
          const dateGenerated = new Date().toLocaleString();
          
          // Filter information for sheet header
          let filterInfo = '';
          if (searchValue) {
            filterInfo += `Search: "${searchValue}"`;
          }
          if (deptFilter !== 'all') {
            filterInfo += filterInfo ? `, Department: ${deptFilter}` : `Department: ${deptFilter}`;
          }
          if (yearFilter !== 'all') {
            filterInfo += filterInfo ? `, Year: ${yearFilter}` : `Year: ${yearFilter}`;
          }
          if (typeFilter !== 'all') {
            filterInfo += filterInfo ? `, Type: ${typeFilter}` : `Type: ${typeFilter}`;
          }
          
          // Create worksheet data with headers
          const ws_data = [];
          
          // Add title and metadata rows
          ws_data.push([title]);
          ws_data.push([`Generated on: ${dateGenerated}`]);
          
          if (filterInfo) {
            ws_data.push([`Filters applied: ${filterInfo}`]);
            ws_data.push([`Records found: ${filteredRecords.length}`]);
          }
          
          // Add empty row for spacing
          ws_data.push([]);
          
          // Add table headers
          ws_data.push(['Title', 'Author', 'Department', 'Year', 'Upload Date', 'Type', 'Keywords', 'Abstract']);
          
          // Add data rows
          filteredRecords.forEach(thesis => {
            // Format date
            const uploadDate = new Date(thesis.uploadDate);
            const formattedDate = uploadDate.toLocaleDateString();
            
            // Handle keywords - make sure it's an array and join with commas
            const keywords = Array.isArray(thesis.keywords) ? thesis.keywords.join(', ') : '';
            
            // Determine type display
            let typeDisplay = '';
            if (thesis.recordType === 'manual') {
              typeDisplay = 'Manual Entry';
            } else if (thesis.fileType === 'pdf') {
              typeDisplay = 'PDF';
            } else if (thesis.fileType === 'excel') {
              typeDisplay = 'Excel';
            } else {
              typeDisplay = 'Unknown';
            }
            
            ws_data.push([
              thesis.title || 'No Title',
              thesis.author || 'Unknown',
              thesis.department || 'Unspecified',
              thesis.year || 'Unknown',
              formattedDate,
              typeDisplay,
              keywords,
              thesis.abstract || ''
            ]);
          });
          
          // Create a worksheet
          const ws = XLSX.utils.aoa_to_sheet(ws_data);
          
          // Create a workbook
          const wb = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, 'Thesis Records');
          
          // Determine the header row index (will be 5 if filters are present, 3 otherwise)
          const headerRowIndex = filterInfo ? 5 : 3;
          
          // Apply styling to the title row (first row)
          const titleCellRef = XLSX.utils.encode_cell({ r: 0, c: 0 });
          if (ws[titleCellRef]) {
            if (typeof ws[titleCellRef] !== 'object') {
              ws[titleCellRef] = { v: ws[titleCellRef], t: 's' };
            }
            
            ws[titleCellRef].s = {
              font: {
                name: 'Arial',
                sz: 16,
                bold: true,
                color: { rgb: 'BF2F2F' } // Primary color
              },
              alignment: {
                horizontal: 'left',
                vertical: 'center'
              }
            };
          }
          
          // Apply styling to column headers - add background color
          const headerRange = XLSX.utils.decode_range(ws['!ref']);
          for (let col = headerRange.s.c; col <= headerRange.e.c; col++) {
            const cellRef = XLSX.utils.encode_cell({ r: headerRowIndex, c: col });
            if (!ws[cellRef]) continue;
            
            // Create a cell object if it doesn't exist
            if (typeof ws[cellRef] !== 'object') {
              ws[cellRef] = { v: ws[cellRef], t: 's' };
            }
            
            // Add styles to the header cell
            if (!ws[cellRef].s) ws[cellRef].s = {};
            ws[cellRef].s = {
              fill: {
                patternType: 'solid',
                fgColor: { rgb: 'BF2F2F' }, // Primary color matching the PDF
                bgColor: { rgb: 'BF2F2F' }
              },
              font: {
                name: 'Arial',
                sz: 12,
                bold: true,
                color: { rgb: 'FFFFFF' } // White text
              },
              alignment: {
                horizontal: 'center',
                vertical: 'center'
              },
              border: {
                top: { style: 'thin', color: { rgb: '000000' } },
                bottom: { style: 'thin', color: { rgb: '000000' } },
                left: { style: 'thin', color: { rgb: '000000' } },
                right: { style: 'thin', color: { rgb: '000000' } }
              }
            };
          }
          
          // Merge cells for title and header rows
          const lastCol = XLSX.utils.decode_col('H'); // Column H (8th column)
          
          // Merge cells for the title and metadata rows
          ws['!merges'] = [
            { s: { r: 0, c: 0 }, e: { r: 0, c: lastCol } }, // Title row
            { s: { r: 1, c: 0 }, e: { r: 1, c: lastCol } }  // Date row
          ];
          
          // Add additional merges for filter info if present
          if (filterInfo) {
            ws['!merges'].push(
              { s: { r: 2, c: 0 }, e: { r: 2, c: lastCol } }, // Filters row
              { s: { r: 3, c: 0 }, e: { r: 3, c: lastCol } }  // Records count row
            );
          }
          
          // Styling: Set column widths
          const col_width = [
            { wch: 50 },  // Title
            { wch: 25 },  // Author
            { wch: 30 },  // Department
            { wch: 10 },  // Year
            { wch: 15 },  // Upload Date
            { wch: 15 },  // Type
            { wch: 30 },  // Keywords
            { wch: 50 }   // Abstract
          ];
          ws['!cols'] = col_width;
          
          // Generate file with appropriate name
          const filename = hasFilters ? 
            `filtered_thesis_records_${new Date().toISOString().split('T')[0]}.xlsx` : 
            `thesis_repository_${new Date().toISOString().split('T')[0]}.xlsx`;
          
          XLSX.writeFile(wb, filename);
          
          // Remove processing toast
          document.body.removeChild(processingToast);
          
          // Show success message
          const successToast = document.createElement('div');
          successToast.className = 'fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded shadow-lg z-50 flex items-center';
          successToast.innerHTML = `
            <i class="ri-file-excel-line mr-2 text-xl"></i>
            <div>
              <p class="font-medium">Excel export successful</p>
              <p class="text-sm opacity-80">${filteredRecords.length} records exported</p>
            </div>
          `;
          document.body.appendChild(successToast);
          
          // Remove toast after 5 seconds
          setTimeout(function() {
            successToast.classList.add('opacity-0', 'transition-opacity', 'duration-300');
            setTimeout(() => successToast.remove(), 300);
          }, 5000);
        } catch (error) {
          console.error('Excel export error:', error);
          
          // Remove processing toast
          document.body.removeChild(processingToast);
          
          // Show error message
          alert('Error generating Excel file. Please try again.');
        }
      }, 500);
    });
  }
  
  // Initialize thesis table with advanced filtering and sorting
  updateThesisTableWithFilters();
});
