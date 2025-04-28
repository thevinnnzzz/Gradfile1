// Toggle between LPU and Non-LPU fields
const lpuRadio = document.getElementById('lpuRadio');
const nonLpuRadio = document.getElementById('nonLpuRadio');
const lpuFields = document.getElementById('lpuFields');
const programField = document.getElementById('programField');
const schoolField = document.getElementById('schoolField');
const studentNumber = document.getElementById('studentNumber');
const program = document.getElementById('program');
const schoolName = document.getElementById('schoolName');

lpuRadio.addEventListener('change', function() {
  if (this.checked) {
    lpuFields.classList.remove('hidden');
    programField.classList.remove('hidden');
    schoolField.classList.add('hidden');
    studentNumber.required = true;
    program.required = true;
    schoolName.required = false;
  }
});

nonLpuRadio.addEventListener('change', function() {
  if (this.checked) {
    lpuFields.classList.add('hidden');
    programField.classList.add('hidden');
    schoolField.classList.remove('hidden');
    studentNumber.required = false;
    program.required = false;
    schoolName.required = true;
  }
});