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
  const modalTitle = document.querySelector('#exportModal h3');
  const recordCountElement = document.getElementById('exportRecordCount');
  
  if (searchTerm || selectedDate) {
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
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
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
      if (selectedFields.includes('Program/Department')) row.push(sub.program);
      if (selectedFields.includes('School Name')) row.push(sub.school);
      if (selectedFields.includes('Thesis Title')) row.push(sub.thesisTitle);
      return row;
    });
    
    // Add title
    doc.setFontSize(16);
    const searchTerm = searchInput.value;
    const selectedDate = dateFilter.value;
    const title = (searchTerm || selectedDate) ? 'Filtered Research Records Export' : 'Researchers\' Records Export';
    doc.text(title, 14, 15);
    
    // Add date and filter info
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 25);
    
    // Add filter information
    let filterInfo = '';
    if (searchTerm) {
      const selectedField = searchField.value;
      filterInfo += `Search: "${searchTerm}" in ${selectedField === 'all' ? 'all fields' : selectedField}`;
    }
    if (selectedDate) {
      filterInfo += filterInfo ? `, Date: ${selectedDate}` : `Date: ${selectedDate}`;
    }
    
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
      columnStyles: {
        0: { cellWidth: 20 },
        1: { cellWidth: 20 },
        2: { cellWidth: 30 },
        3: { cellWidth: 20 },
        4: { cellWidth: 30 },
        5: { cellWidth: 30 },
        6: { cellWidth: 40 }
      }
    });
    
    // Save the PDF with appropriate filename
    const filename = filterInfo ? 'filtered_research_records.pdf' : 'research_records_export.pdf';
    doc.save(filename);
    
    // Close the modal
    closeExportModal();
    
    // Show success message
    alert('Export successful! The file has been downloaded.');
  } catch (error) {
    console.error('Export failed:', error);
    alert('Export failed. Please try again or check the console for details.');
  }
});
