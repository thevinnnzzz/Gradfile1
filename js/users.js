// System Users Management Script

// Sample user data for demonstration
const sampleUsers = [
  {
    id: 1,
    username: "staff_john",
    fullName: "John Smith",
    email: "john.smith@slrc.edu",
    role: "Reader",
    status: "active",
    lastLogin: "2025-05-18 10:30 AM",
    permissions: ["view", "create", "edit", "delete", "manage_users"]
  },
  {
    id: 2,
    username: "staff_maria",
    fullName: "Maria Garcia",
    email: "maria.garcia@slrc.edu",
    role: "Reader",
    status: "active",
    lastLogin: "2025-05-17 03:45 PM",
    permissions: ["view", "create", "edit", "delete"]
  },
  {
    id: 3,
    username: "staff_david",
    fullName: "David Chen",
    email: "david.chen@slrc.edu",
    role: "Reader",
    status: "active",
    lastLogin: "2025-05-16 09:15 AM",
    permissions: ["view", "create", "edit"]
  },
  {
    id: 4,
    username: "staff_sarah",
    fullName: "Sarah Johnson",
    email: "sarah.johnson@slrc.edu",
    role: "Reader",
    status: "active",
    lastLogin: "2025-05-15 02:20 PM",
    permissions: ["view", "create"]
  },
  {
    id: 5,
    username: "staff_michael",
    fullName: "Michael Lee",
    email: "michael.lee@slrc.edu",
    role: "Reader",
    status: "inactive",
    lastLogin: "2025-04-30 11:10 AM",
    permissions: ["view"]
  },
  {
    id: 6,
    username: "staff_anna",
    fullName: "Anna Martinez",
    email: "anna.martinez@slrc.edu",
    role: "Reader",
    status: "active",
    lastLogin: "2025-05-14 08:45 AM",
    permissions: ["view", "create", "edit", "delete"]
  },
  {
    id: 7,
    username: "staff_james",
    fullName: "James Wilson",
    email: "james.wilson@slrc.edu",
    role: "Reader",
    status: "inactive",
    lastLogin: "2025-05-10 04:30 PM",
    permissions: ["view"]
  },
  {
    id: 8,
    username: "staff_emily",
    fullName: "Emily Brown",
    email: "emily.brown@slrc.edu",
    role: "Reader",
    status: "active",
    lastLogin: "2025-05-17 10:20 AM",
    permissions: ["view", "create", "edit"]
  },
  {
    id: 9,
    username: "staff_robert",
    fullName: "Robert Taylor",
    email: "robert.taylor@slrc.edu",
    role: "Reader",
    status: "active",
    lastLogin: "2025-05-18 09:05 AM",
    permissions: ["view", "create"]
  },
  {
    id: 10,
    username: "staff_lisa",
    fullName: "Lisa Anderson",
    email: "lisa.anderson@slrc.edu",
    role: "Reader",
    status: "suspended",
    lastLogin: "2025-05-01 01:15 PM",
    permissions: []
  }
];

// Store users in localStorage for persistence
function initializeUsers() {
  if (!localStorage.getItem('systemUsers')) {
    localStorage.setItem('systemUsers', JSON.stringify(sampleUsers));
  }
  return JSON.parse(localStorage.getItem('systemUsers'));
}

// Variables for user filtering and sorting
let filteredUsers = [];
let currentSort = { field: 'username', direction: 'asc' };

// Initialize the system users table
function initializeSystemUsersTable() {
  const users = initializeUsers();
  filteredUsers = [...users];
  
  // No role filters needed since we only have one role (Reader)
  
  // Set up event listener for search
  const searchInput = document.getElementById('userSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      filterUsers();
    });
  }
  
  // Set up event listeners for Add User modal
  const addUserBtn = document.getElementById('addUserBtn');
  const closeAddUserModalBtn = document.getElementById('closeAddUserModal');
  const cancelAddUserBtn = document.getElementById('cancelAddUser');
  const addUserForm = document.getElementById('addUserForm');
  
  if (addUserBtn) {
    addUserBtn.addEventListener('click', showAddUserModal);
  }
  
  if (closeAddUserModalBtn) {
    closeAddUserModalBtn.addEventListener('click', closeAddUserModal);
  }
  
  if (cancelAddUserBtn) {
    cancelAddUserBtn.addEventListener('click', closeAddUserModal);
  }
  
  if (addUserForm) {
    addUserForm.addEventListener('submit', addUser);
  }
  
  // Set up event listeners for View User modal
  const closeViewUserModalBtn = document.getElementById('closeViewUserModal');
  const closeViewUserBtn = document.getElementById('closeViewUserBtn');
  
  if (closeViewUserModalBtn) {
    closeViewUserModalBtn.addEventListener('click', closeViewUserModal);
  }
  
  if (closeViewUserBtn) {
    closeViewUserBtn.addEventListener('click', closeViewUserModal);
  }
  
  // Set up event listeners for Edit User modal
  const closeEditUserModalBtn = document.getElementById('closeEditUserModal');
  const cancelEditUserBtn = document.getElementById('cancelEditUser');
  const editUserForm = document.getElementById('editUserForm');
  
  if (closeEditUserModalBtn) {
    closeEditUserModalBtn.addEventListener('click', closeEditUserModal);
  }
  
  if (cancelEditUserBtn) {
    cancelEditUserBtn.addEventListener('click', closeEditUserModal);
  }
  
  if (editUserForm) {
    editUserForm.addEventListener('submit', editUser);
  }
  
  // Set up event listeners for Delete User modal
  const closeDeleteUserModalBtn = document.getElementById('closeDeleteUserModal');
  const cancelDeleteUserBtn = document.getElementById('cancelDeleteUser');
  const confirmDeleteUserBtn = document.getElementById('confirmDeleteUser');
  
  if (closeDeleteUserModalBtn) {
    closeDeleteUserModalBtn.addEventListener('click', closeDeleteUserModal);
  }
  
  if (cancelDeleteUserBtn) {
    cancelDeleteUserBtn.addEventListener('click', closeDeleteUserModal);
  }
  
  if (confirmDeleteUserBtn) {
    confirmDeleteUserBtn.addEventListener('click', deleteUser);
  }
  
  // Set up event listeners for sorting
  document.querySelectorAll('#systemUsersTable th[data-sort]').forEach(th => {
    th.addEventListener('click', function() {
      const field = this.getAttribute('data-sort');
      
      // Toggle sort direction if clicking the same field
      if (currentSort.field === field) {
        currentSort.direction = currentSort.direction === 'asc' ? 'desc' : 'asc';
      } else {
        currentSort.field = field;
        currentSort.direction = 'asc';
      }
      
      sortUsers();
    });
  });
  
  // No pagination needed - we'll show all users with scrolling
  
  // Add User button is now handled in the event listeners section above
  
  // Initial render
  renderUsersTable();
}

// Filter users based on search input only (no role filter needed)
function filterUsers() {
  const users = initializeUsers();
  const searchTerm = document.getElementById('userSearchInput').value.toLowerCase();
  
  filteredUsers = users.filter(user => {
    // Apply search filter
    return user.username.toLowerCase().includes(searchTerm) ||
      user.fullName.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm);
  });
  
  // No pagination needed
  
  // Apply sorting
  sortUsers();
}

// Sort users based on current sort field and direction
function sortUsers() {
  filteredUsers.sort((a, b) => {
    let valueA = a[currentSort.field];
    let valueB = b[currentSort.field];
    
    // Handle string comparison
    if (typeof valueA === 'string') {
      valueA = valueA.toLowerCase();
      valueB = valueB.toLowerCase();
    }
    
    if (valueA < valueB) {
      return currentSort.direction === 'asc' ? -1 : 1;
    }
    if (valueA > valueB) {
      return currentSort.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });
  
  renderUsersTable();
}

// Render the users table with current filtered and sorted users
function renderUsersTable() {
  const tableBody = document.getElementById('systemUsersTableBody');
  if (!tableBody) return;
  
  // Clear the table
  tableBody.innerHTML = '';
  
  // Update total count
  document.getElementById('userTotalCount').textContent = filteredUsers.length;
  
  // If no users match the filter
  if (filteredUsers.length === 0) {
    const emptyRow = document.createElement('tr');
    emptyRow.className = 'text-gray-500 text-center';
    emptyRow.innerHTML = `<td colspan="7" class="px-6 py-12">No staff members found matching your criteria.</td>`;
    tableBody.appendChild(emptyRow);
    return;
  }
  
  // Add all users to the table - no pagination
  filteredUsers.forEach(user => {
    const row = document.createElement('tr');
    row.className = 'hover:bg-gray-50';
    
    // No status column needed
    
    // No role column needed since all users have the same role
    
    row.innerHTML = `
      <td class="px-6 py-4 whitespace-nowrap">
        <div class="flex items-center">
          <div class="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
            <i class="ri-user-line text-gray-500"></i>
          </div>
          <div class="ml-4">
            <div class="text-sm font-medium text-gray-900">${user.username}</div>
            <div class="text-sm text-gray-500">ID: ${user.id}</div>
          </div>
        </div>
      </td>
      <td class="px-6 py-4 whitespace-nowrap">
        <div class="text-sm text-gray-900">${user.fullName}</div>
      </td>
      <td class="px-6 py-4 whitespace-nowrap">
        <div class="text-sm text-gray-900">${user.email}</div>
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        ${user.lastLogin}
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button class="text-blue-600 hover:text-blue-800 mr-3" onclick="showViewUserModal(${user.id})" title="View User">
          <i class="ri-eye-line"></i>
        </button>
        <button class="text-green-600 hover:text-green-800 mr-3" onclick="showEditUserModal(${user.id})" title="Edit User">
          <i class="ri-edit-line"></i>
        </button>
        <button class="text-red-600 hover:text-red-800" onclick="showDeleteUserModal(${user.id})" title="Delete User">
          <i class="ri-delete-bin-line"></i>
        </button>
      </td>
    `;
    
    tableBody.appendChild(row);
  });
}

// Show modal to add a new user
function showAddUserModal() {
  const modal = document.getElementById('addUserModal');
  if (modal) {
    modal.classList.remove('hidden');
  }
}

// Close the Add User modal
function closeAddUserModal() {
  const modal = document.getElementById('addUserModal');
  if (modal) {
    modal.classList.add('hidden');
    // Reset the form
    document.getElementById('addUserForm').reset();
  }
}

// Add a new user
function addUser(event) {
  event.preventDefault();
  
  // Get form values
  const username = document.getElementById('newUsername').value;
  const fullName = document.getElementById('newFullName').value;
  const email = document.getElementById('newEmail').value;
  const password = document.getElementById('newPassword').value;
  
  // Get existing users
  const users = initializeUsers();
  
  // Generate a new ID (max ID + 1)
  const newId = users.reduce((maxId, user) => Math.max(maxId, user.id), 0) + 1;
  
  // Create new user object
  const newUser = {
    id: newId,
    username: username,
    fullName: fullName,
    email: email,
    role: "Reader", // All users are Readers
    status: "active", // Default to active
    lastLogin: "Never",
    permissions: ["view"] // Default permission
  };
  
  // Add to users array
  users.push(newUser);
  
  // Save to localStorage
  localStorage.setItem('systemUsers', JSON.stringify(users));
  
  // Close modal
  closeAddUserModal();
  
  // Refresh the table
  filterUsers();
  
  // Show success message
  showNotification('User added successfully', 'success');
}

// Show modal to view a user's details
function showViewUserModal(userId) {
  const users = initializeUsers();
  const user = users.find(u => u.id === userId);
  
  if (!user) {
    showNotification('User not found', 'error');
    return;
  }
  
  // Populate the view modal with user data
  document.getElementById('viewUsername').textContent = user.username;
  document.getElementById('viewFullName').textContent = user.fullName;
  document.getElementById('viewEmail').textContent = user.email;
  document.getElementById('viewStatus').textContent = user.status.charAt(0).toUpperCase() + user.status.slice(1);
  document.getElementById('viewLastLogin').textContent = user.lastLogin;
  
  // Show the modal
  const modal = document.getElementById('viewUserModal');
  if (modal) {
    modal.classList.remove('hidden');
  }
}

// Close the View User modal
function closeViewUserModal() {
  const modal = document.getElementById('viewUserModal');
  if (modal) {
    modal.classList.add('hidden');
  }
}

// Show modal to edit an existing user
function showEditUserModal(userId) {
  const users = initializeUsers();
  const user = users.find(u => u.id === userId);
  
  if (!user) {
    showNotification('User not found', 'error');
    return;
  }
  
  // Populate the edit form with user data
  document.getElementById('editUserId').value = user.id;
  document.getElementById('editUsername').value = user.username;
  document.getElementById('editFullName').value = user.fullName;
  document.getElementById('editEmail').value = user.email;
  document.getElementById('editStatus').value = user.status;
  
  // Show the modal
  const modal = document.getElementById('editUserModal');
  if (modal) {
    modal.classList.remove('hidden');
  }
}

// Close the Edit User modal
function closeEditUserModal() {
  const modal = document.getElementById('editUserModal');
  if (modal) {
    modal.classList.add('hidden');
    // Reset the form
    document.getElementById('editUserForm').reset();
  }
}

// Edit an existing user
function editUser(event) {
  event.preventDefault();
  
  // Get form values
  const userId = parseInt(document.getElementById('editUserId').value);
  const username = document.getElementById('editUsername').value;
  const fullName = document.getElementById('editFullName').value;
  const email = document.getElementById('editEmail').value;
  const status = document.getElementById('editStatus').value;
  
  // Get existing users
  const users = initializeUsers();
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) {
    showNotification('User not found', 'error');
    return;
  }
  
  // Update user data
  users[userIndex].username = username;
  users[userIndex].fullName = fullName;
  users[userIndex].email = email;
  users[userIndex].status = status;
  
  // Save to localStorage
  localStorage.setItem('systemUsers', JSON.stringify(users));
  
  // Close modal
  closeEditUserModal();
  
  // Refresh the table
  filterUsers();
  
  // Show success message
  showNotification('User updated successfully', 'success');
}

// Show modal to delete a user
function showDeleteUserModal(userId) {
  const users = initializeUsers();
  const user = users.find(u => u.id === userId);
  
  if (!user) {
    showNotification('User not found', 'error');
    return;
  }
  
  // Set user ID and name in the delete modal
  document.getElementById('deleteUserId').value = user.id;
  document.getElementById('deleteUserName').textContent = user.fullName;
  
  // Show the modal
  const modal = document.getElementById('deleteUserModal');
  if (modal) {
    modal.classList.remove('hidden');
  }
}

// Close the Delete User modal
function closeDeleteUserModal() {
  const modal = document.getElementById('deleteUserModal');
  if (modal) {
    modal.classList.add('hidden');
  }
}

// Delete a user
function deleteUser() {
  // Get user ID from hidden input
  const userId = parseInt(document.getElementById('deleteUserId').value);
  
  // Get existing users
  const users = initializeUsers();
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) {
    showNotification('User not found', 'error');
    return;
  }
  
  // Remove user from array
  users.splice(userIndex, 1);
  
  // Save to localStorage
  localStorage.setItem('systemUsers', JSON.stringify(users));
  
  // Close modal
  closeDeleteUserModal();
  
  // Refresh the table
  filterUsers();
  
  // Show success message
  showNotification('User deleted successfully', 'success');
}

// Initialize when the DOM is loaded
// Show notification message
function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `fixed bottom-4 right-4 px-6 py-3 rounded-md shadow-md z-50 ${type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500'} text-white`;
  notification.textContent = message;
  
  // Add to document
  document.body.appendChild(notification);
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.classList.add('opacity-0', 'transition-opacity', 'duration-500');
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 500);
  }, 3000);
}

document.addEventListener('DOMContentLoaded', function() {
  // The table will be initialized when the tab is clicked
  // This is handled in the main script.js file
});
