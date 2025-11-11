// homepage.js
import { faker } from "https://esm.sh/@faker-js/faker";

// ✅ Navbar dropdown toggle - Same as manageprofile.html
const avatar = document.querySelector(".avatar");
const avatarMenu = document.querySelector(".avatar-menu");

if (avatar) {
  avatar.addEventListener("click", () => {
    avatarMenu.classList.toggle("show");
  });
}

// ✅ Navigation functionality for dropdown menu
document.addEventListener('DOMContentLoaded', function() {
  // Manage Profile navigation
  const manageProfileBtn = document.getElementById('manageProfileBtn');
  if (manageProfileBtn) {
    manageProfileBtn.addEventListener('click', function() {
      window.location.href = "manageprofile.html";
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
});

// ✅ Static activities data
const activities = [
  {
    id: 1,
    name: "Mountain Trekking Adventure",
    location: "Pokhara, Nepal",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
  },
  {
    id: 2,
    name: "Cultural Heritage Tour", 
    location: "Lalitpur, Nepal",
    rating: 4.5,
    image: "https://insidehimalayas.com/wp-content/uploads/2018/05/8607410916_3764f3530f_b-1024x683.jpg"
  },
  {
    id: 3,
    name: "Wildlife Safari Experience",
    location: "Chitwan, Nepal",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
  }
  
];

// ✅ Function to display activities
function displayActivities() {
  const content = document.getElementById("content");
  
  if (!content) {
    console.error('Content container not found');
    return;
  }

  content.innerHTML = activities.map(activity => `
    <div class="cursor-pointer activity-card" data-activity-id="${activity.id}">
      <div class="max-h-[90%] w-full relative">
        <img
          class="z-0 w-full h-60 rounded-3xl object-cover"
          src="${activity.image}"
          alt="${activity.name}"
        />
        <div class="absolute font-semibold bg-white text-black rounded-2xl p-2 bottom-2 right-2 z-10 text-sm">
          ⭐ ${activity.rating} / 5
        </div>
      </div>
      <div class="py-2">
        <h3 class="font-bold text-xl text-gray-800">${activity.name}</h3>
        <p class="font-semibold text-lg text-gray-600">${activity.location}</p>
      </div>
    </div>
  `).join('');

  // Add click event listeners to activity cards
  document.querySelectorAll('.activity-card').forEach(card => {
    card.addEventListener('click', function() {
      const activityId = this.getAttribute('data-activity-id');
      window.location.href = `activity-details.html?id=${activityId}`;
    });
  });
}

// ✅ Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  displayActivities();
});

// ✅ Search functionality placeholder
document.addEventListener('DOMContentLoaded', function() {
  const searchCircle = document.querySelector('.search-circle');
  if (searchCircle) {
    searchCircle.addEventListener('click', function() {
      alert('Search functionality will be implemented with backend integration');
    });
  }
});