const imageInput = document.getElementById("imageInput");
const previewBoxes = [
  document.getElementById("imgPreviewMain"),
  document.getElementById("imgPreview1"),
  document.getElementById("imgPreview2"),
  document.getElementById("imgPreview3")
];

// Each box replaces its own image when clicked
previewBoxes.forEach((box, index) => {
  box.addEventListener('click', () => {
    imageInput.dataset.index = index; // store which box
    imageInput.value = "";            // reset to allow same file
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
    };
    reader.readAsDataURL(files[0]);
  }
});

// Form submit
document.getElementById("activityForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const newActivity = {
    name: document.getElementById("name").value,
    price: document.getElementById("price").value,
    description: document.getElementById("description").value,
    slots: document.getElementById("slots").value,
    duration: document.getElementById("duration").value,
    location: document.getElementById("location").value
  };
  console.log("Activity Submitted:", newActivity);
  alert("✅ Activity Created Successfully (Backend integration next)");
});

// Logout
document.getElementById("logoutBtn").addEventListener("click", () => {
  window.location.href = "login.html";
});
