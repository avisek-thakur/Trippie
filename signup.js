document.getElementById('signupForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const firstname = document.getElementById('firstname').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const confirmpassword = document.getElementById('confirmpassword').value.trim();
  const accountType = document.getElementById('accountType').value;

  if (!firstname || !phone || !email || !password || !confirmpassword || !accountType) {
    alert('Please fill in all fields.');
    return;
  }

  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!emailPattern.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  if (password !== confirmpassword) {
    alert('Passwords do not match.');
    return;
  }

  alert('Account created successfully!');
  window.location.href = "login.html"; // redirect to login page
});

// Go to Login Page
document.getElementById("goToLogin").addEventListener("click", function() {
  window.location.href = "login.html";
});
