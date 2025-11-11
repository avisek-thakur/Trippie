// Login form validation
document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!email || !password) {
    alert('Please fill in all fields.');
    return;
  }

  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!emailPattern.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  if (password.length < 6) {
    alert('Password must be at least 6 characters.');
    return;
  }

  alert('Login successful! Redirecting...');
  window.location.href = "homepage.html"; // go to homepage after login
});

// Navigate to signup page
document.getElementById('goToSignup').addEventListener('click', function() {
  window.location.href = "signup.html";
});
