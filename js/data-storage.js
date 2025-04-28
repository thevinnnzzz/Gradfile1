// Store submissions
let submissions = JSON.parse(localStorage.getItem('submissions')) || [
  {
    date: '2025-04-10',
    userType: 'LPU',
    name: 'Michael Johnson',
    studentNumber: '2023-0142',
    program: 'Computer Science',
    school: '-',
    thesisTitle: 'Machine Learning Applications in Healthcare'
  },
  {
    date: '2025-04-09',
    userType: 'Non-LPU',
    name: 'Emily Rodriguez',
    studentNumber: '-',
    program: '-',
    school: 'Stanford University',
    thesisTitle: 'Sustainable Urban Development Models'
  },
  {
    date: '2025-04-08',
    userType: 'LPU',
    name: 'David Thompson',
    studentNumber: '2022-1875',
    program: 'Business Administration',
    school: '-',
    thesisTitle: 'Impact of Digital Transformation on SMEs'
  },
  {
    date: '2025-04-07',
    userType: 'LPU',
    name: 'Sarah Williams',
    studentNumber: '2023-0563',
    program: 'Psychology',
    school: '-',
    thesisTitle: 'Cognitive Behavioral Therapy in Adolescents'
  },
  {
    date: '2025-04-06',
    userType: 'Non-LPU',
    name: 'Robert Chen',
    studentNumber: '-',
    program: '-',
    school: 'MIT',
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
  if (isAdminLoggedIn) {
    adminDashboard.classList.remove('hidden');
    document.getElementById('submissionForm').classList.add('hidden');
    adminLoginBtn.classList.add('hidden');
    adminLogoutBtn.classList.remove('hidden');
    updateAdminTable();
  }
});