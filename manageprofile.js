// Avatar dropdown
const avatar = document.querySelector(".avatar");
const avatarMenu = document.querySelector(".avatar-menu");
if (avatar) {
  avatar.addEventListener("click", () => {
    avatarMenu.classList.toggle("show");
  });
}

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
  // Home logo navigation (✈️ Activity Booking)
  const homeLogo = document.getElementById('homeLogo');
  if (homeLogo) {
    homeLogo.addEventListener('click', function() {
      window.location.href = "homepage.html";
    });
  }

  // Manage Profile navigation (stays on current page)
  const manageProfileBtn = document.getElementById('manageProfileBtn');
  if (manageProfileBtn) {
    manageProfileBtn.addEventListener('click', function() {
      // Already on manage profile page, just close dropdown
      avatarMenu.classList.remove("show");
    });
  }

  // View Booking navigation
  const viewBookingBtn = document.getElementById('viewBookingBtn');
  if (viewBookingBtn) {
    viewBookingBtn.addEventListener('click', function() {
      window.location.href = "recentbook.html";
    });
  }

  // Log Out functionality
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function() {
      window.location.href = "login.html";
    });
  }

  // Close dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (avatar && avatarMenu && !avatar.contains(e.target) && !avatarMenu.contains(e.target)) {
      avatarMenu.classList.remove("show");
    }
  });
});

// Form elements
const firstNameEl = document.getElementById("firstName");
const lastNameEl  = document.getElementById("lastName");
const phoneEl     = document.getElementById("phone");
const emailEl     = document.getElementById("email");
const passwordEl  = document.getElementById("password");
const profilePic  = document.getElementById("profilePicture");
const saveBtn     = document.getElementById("saveBtn");
const cancelBtn   = document.getElementById("cancelBtn");

// Image upload elements
const imageInput = document.getElementById("imageInput");
const previewBoxes = [
  document.getElementById("imgPreviewMain"),
  document.getElementById("imgPreview1"),
  document.getElementById("imgPreview2"),
  document.getElementById("imgPreview3")
];

// Dummy user
const user = {
  id: 123,
  firstName: "Lebron",
  lastName: "James",
  phone: "9861421989",
  email: "example@example.com",
  password: "",
  avatarUrl: "",
  additionalPhotos: ["", "", "", ""] // Store additional photos
};

// Populate form
function populate(user) {
  firstNameEl.value = user.firstName || "";
  lastNameEl.value  = user.lastName || "";
  phoneEl.value     = user.phone || "";
  emailEl.value     = user.email || "";
  passwordEl.value  = "";
  
  if (user.avatarUrl) {
    profilePic.style.backgroundImage = `url(${user.avatarUrl})`;
    profilePic.textContent = "";
    profilePic.style.backgroundSize = 'cover';
    profilePic.style.backgroundPosition = 'center';
  } else {
    profilePic.style.backgroundImage = "";
    profilePic.textContent = user.firstName ? user.firstName[0] : "";
    profilePic.style.fontSize = "80px";
    profilePic.style.color = "#fff";
    profilePic.style.background = "#EF233C";
    profilePic.style.display = "flex";
    profilePic.style.alignItems = "center";
    profilePic.style.justifyContent = "center";
  }
  
  // Set additional photos
  user.additionalPhotos.forEach((photoUrl, index) => {
    if (photoUrl) {
      previewBoxes[index].style.backgroundImage = `url(${photoUrl})`;
      previewBoxes[index].style.backgroundSize = 'cover';
      previewBoxes[index].style.backgroundPosition = 'center';
    } else {
      previewBoxes[index].style.backgroundImage = `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%232B2D42"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>')`;
      previewBoxes[index].style.backgroundSize = '30px 30px';
    }
  });
}

// Initialize form with user data
populate(user);

// Cancel button
cancelBtn.addEventListener("click", () => populate(user));

// Save button
saveBtn.addEventListener("click", () => {
  // Basic validation
  if (!firstNameEl.value || !lastNameEl.value || !emailEl.value) {
    alert("Please fill in all required fields");
    return;
  }
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailEl.value)) {
    alert("Please enter a valid email address");
    return;
  }
  
  user.firstName = firstNameEl.value;
  user.lastName = lastNameEl.value;
  user.phone = phoneEl.value;
  user.email = emailEl.value;
  
  // Save additional photos
  previewBoxes.forEach((box, index) => {
    const bgImage = box.style.backgroundImage;
    if (bgImage && bgImage !== 'none' && !bgImage.includes('data:image/svg+xml')) {
      user.additionalPhotos[index] = bgImage.slice(4, -1).replace(/"/g, "");
    }
  });
  
  passwordEl.value = "";
  
  // Don't call populate(user) here as it resets the profile picture
  // Instead, just show success message
  alert("Profile saved successfully!");
});

// Profile picture click - file upload
profilePic.addEventListener("click", () => {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/*';
  
  fileInput.onchange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        profilePic.style.backgroundImage = `url(${event.target.result})`;
        profilePic.textContent = "";
        profilePic.style.backgroundSize = 'cover';
        profilePic.style.backgroundPosition = 'center';
        user.avatarUrl = event.target.result;
        alert("Profile picture updated successfully!");
      };
      reader.readAsDataURL(file);
    }
  };
  
  fileInput.click();
});

// Image upload functionality for additional photos
previewBoxes.forEach((box, index) => {
  box.addEventListener('click', () => {
    imageInput.dataset.index = index;
    imageInput.value = "";
    imageInput.click();
  });
});

imageInput.addEventListener("change", () => {
  const files = Array.from(imageInput.files);
  const index = imageInput.dataset.index;

  if (files.length > 0) {
    const reader = new FileReader();
    reader.onload = () => {
      previewBoxes[index].style.backgroundImage = `url('${reader.result}')`;
      previewBoxes[index].style.backgroundSize = 'cover';
      previewBoxes[index].style.backgroundPosition = 'center';
      user.additionalPhotos[index] = reader.result;
    };
    reader.readAsDataURL(files[0]);
  }
});

// Add input validation for real-time feedback
const inputs = document.querySelectorAll('.field input, .pw-field input');
inputs.forEach(input => {
  input.addEventListener('blur', (e) => {
    if (e.target.value.trim() === '' && (e.target.id === 'firstName' || e.target.id === 'lastName' || e.target.id === 'email')) {
      e.target.style.boxShadow = '0 0 4px #EF233C';
    } else {
      e.target.style.boxShadow = '0 0 4px rgba(0,0,0,0.12)';
    }
  });
  
  input.addEventListener('focus', (e) => {
    e.target.style.boxShadow = '0 0 6px rgba(0,0,0,0.15)';
  });
});