// Thesis Search Functionality
document.addEventListener('DOMContentLoaded', function() {
  // Get DOM elements
  const thesisTitleInput = document.getElementById('thesisTitle');
  const suggestionsList = document.getElementById('thesisTitleSuggestions');
  
  // Only initialize if both elements exist (we're on the submission form page)
  if (!thesisTitleInput || !suggestionsList) return;
  
  let thesisRecords = [];
  
  // Fetch thesis records from localStorage
  function loadThesisRecords() {
    try {
      // Get thesis records from localStorage
      thesisRecords = JSON.parse(localStorage.getItem('thesisRecords')) || [];
      console.log('Loaded thesis records for search:', thesisRecords.length);
    } catch (error) {
      console.error('Error loading thesis records:', error);
      thesisRecords = [];
    }
  }
  
  // Initial load of thesis records
  loadThesisRecords();
  
  // Function to filter thesis records based on search input
  function filterThesisTitles(searchText) {
    if (!searchText || searchText.length < 2) return []; // Require at least 2 characters
    
    searchText = searchText.toLowerCase().trim();
    
    return thesisRecords
      .filter(thesis => thesis.title && thesis.title.toLowerCase().includes(searchText))
      .map(thesis => thesis.title)
      .filter((title, index, self) => self.indexOf(title) === index) // Remove duplicates
      .slice(0, 8); // Limit to 8 results
  }
  
  // Function to render suggestion items
  function renderSuggestions(titles) {
    // Clear existing suggestions
    suggestionsList.innerHTML = '';
    
    if (titles.length === 0) {
      suggestionsList.classList.add('hidden');
      return;
    }
    
    // Create suggestion items
    titles.forEach(title => {
      const item = document.createElement('div');
      item.className = 'px-4 py-2 cursor-pointer hover:bg-gray-100';
      item.textContent = title;
      
      // Add click event to select this title
      item.addEventListener('click', function() {
        thesisTitleInput.value = title;
        suggestionsList.classList.add('hidden');
      });
      
      suggestionsList.appendChild(item);
    });
    
    // Show suggestions
    suggestionsList.classList.remove('hidden');
  }
  
  // Handle input in the thesis title field
  thesisTitleInput.addEventListener('input', function() {
    const searchText = this.value.trim();
    const matchingTitles = filterThesisTitles(searchText);
    renderSuggestions(matchingTitles);
  });
  
  // Hide suggestions when clicking outside
  document.addEventListener('click', function(e) {
    if (!thesisTitleInput.contains(e.target) && !suggestionsList.contains(e.target)) {
      suggestionsList.classList.add('hidden');
    }
  });
  
  // Add keyboard navigation for suggestions
  thesisTitleInput.addEventListener('keydown', function(e) {
    const items = suggestionsList.querySelectorAll('div');
    
    if (items.length === 0) return;
    
    // Find currently focused item
    const focusedItem = suggestionsList.querySelector('.bg-gray-100');
    const focusedIndex = Array.from(items).indexOf(focusedItem);
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (suggestionsList.classList.contains('hidden')) {
          // If suggestions are hidden, show them
          const matchingTitles = filterThesisTitles(this.value.trim());
          renderSuggestions(matchingTitles);
        } else if (focusedIndex < 0) {
          // Focus first item
          items[0].classList.add('bg-gray-100');
        } else {
          // Move focus down
          items[focusedIndex].classList.remove('bg-gray-100');
          const newIndex = (focusedIndex + 1) % items.length;
          items[newIndex].classList.add('bg-gray-100');
        }
        break;
        
      case 'ArrowUp':
        e.preventDefault();
        if (!suggestionsList.classList.contains('hidden')) {
          if (focusedIndex < 0) {
            // Focus last item
            items[items.length - 1].classList.add('bg-gray-100');
          } else {
            // Move focus up
            items[focusedIndex].classList.remove('bg-gray-100');
            const newIndex = (focusedIndex - 1 + items.length) % items.length;
            items[newIndex].classList.add('bg-gray-100');
          }
        }
        break;
        
      case 'Enter':
        if (focusedItem) {
          e.preventDefault();
          thesisTitleInput.value = focusedItem.textContent;
          suggestionsList.classList.add('hidden');
        }
        break;
        
      case 'Escape':
        suggestionsList.classList.add('hidden');
        break;
    }
  });
  
  // Focus event to show suggestions when input is focused
  thesisTitleInput.addEventListener('focus', function() {
    if (this.value.trim().length >= 2) {
      const matchingTitles = filterThesisTitles(this.value.trim());
      renderSuggestions(matchingTitles);
    }
  });
  
  // Update thesis records when the page becomes visible again
  // (in case new theses were added in another tab)
  document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
      loadThesisRecords();
    }
  });
}); 