// Logout functionality
document.getElementById("logoutBtn").addEventListener("click", () => {
  window.location.href = "login.html";
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

// Dummy admin user
const adminUser = {
  id: 1,
  firstName: "Admin",
  lastName: "User",
  phone: "1234567890",
  email: "admin@activitybooking.com",
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
    profilePic.textContent = user.firstName ? user.firstName[0] : "A";
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

// Initialize form with admin data
populate(adminUser);

// Cancel button - reset to original values
cancelBtn.addEventListener("click", () => {
  populate(adminUser);
  alert("Changes discarded");
});

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
  
  // Update admin user object
  adminUser.firstName = firstNameEl.value;
  adminUser.lastName = lastNameEl.value;
  adminUser.phone = phoneEl.value;
  adminUser.email = emailEl.value;
  
  // Only update profile picture initial if there's no image
  if (!adminUser.avatarUrl) {
    profilePic.textContent = adminUser.firstName ? adminUser.firstName[0] : "A";
  }
  
  // Save additional photos
  previewBoxes.forEach((box, index) => {
    const bgImage = box.style.backgroundImage;
    if (bgImage && bgImage !== 'none' && !bgImage.includes('data:image/svg+xml')) {
      adminUser.additionalPhotos[index] = bgImage.slice(4, -1).replace(/"/g, "");
    }
  });
  
  // In a real application, you would send this data to the server
  console.log("Admin Profile Updated:", adminUser);
  alert("✅ Admin profile updated successfully!");
});

// Avatar click functionality
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
        adminUser.avatarUrl = event.target.result;
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
      adminUser.additionalPhotos[index] = reader.result;
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