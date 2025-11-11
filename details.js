// ---------------- MOCK DATA (Temporary Until Backend Connected) ----------------
const activityData = {
  id: 1,
  title: "Everest Helicopter Ride",
  location: "Kathmandu, Nepal",
  rating: 4.5,
  totalReviews: 128,
  description:
    "A helicopter ride offers a thrilling way to see landscapes from a whole new perspective. Soaring above the ground, you get sweeping views of mountains, valleys, rivers, and cityscapes that you simply can't experience from the road. The flight is smooth yet exciting, with the feeling of hovering and gliding giving it a unique charm.",
  price: "Rs. 5000 per person",
  duration: "3 Hours",
  features: ["Professional Guidance"],
  images: ["image1.png", "image2.png", "image3.png", "image5.jpg"],
  timeSlots: [
    { time: "7:00 AM", available: false, slotsRemaining: 0 },
    { time: "9:00 AM", available: true, slotsRemaining: 3 },
    { time: "11:30 AM", available: true, slotsRemaining: 7 },
    { time: "2:00 PM", available: true, slotsRemaining: 2 },
  ],
  reviews: [
    {
      id: 1,
      userName: "Julia Jules",
      userAvatar: "image4.png",
      rating: 5.0,
      comment:
        "Amazing views and a smooth flight. Pilot was professional, safety briefing clear, and the city looked unreal from above. Would absolutely recommend for a special occasion.",
      date: "2024-01-15",
    },
    {
      id: 2,
      userName: "Michael Chen",
      userAvatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      rating: 4.0,
      comment:
        "Great experience overall! The views were breathtaking. Only wish the flight was a bit longer. Staff was very friendly and professional.",
      date: "2024-01-10",
    },
    {
      id: 3,
      userName: "Sarah Johnson",
      userAvatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      rating: 4.5,
      comment:
        "Unforgettable experience! The helicopter was comfortable and the pilot was very knowledgeable. Perfect way to see the mountains from above.",
      date: "2024-01-08",
    },
  ],
};

// ---------------- UPDATED SINGLE STAR RATING RENDER - No reviews count ----------------
function generateStarRating(rating) {
  return `<i class="fas fa-star" style="color: #FFD700; font-size: 13px;"></i> ${rating} out of 5`;
}

// ---------------- POPULATE UI ----------------
function populateActivityDetails() {
  document.getElementById("activityTitle").textContent = activityData.title;
  document.getElementById(
    "activityLocation"
  ).innerHTML = `<span class="location-text">${activityData.location}</span><span class="view-location">View Full Location</span>`;
  document.getElementById("activityRating").innerHTML = generateStarRating(
    activityData.rating
  );
  document.getElementById("activityDescription").textContent =
    activityData.description;

  document.getElementById("activityTags").innerHTML = `
    <span>${activityData.price}</span>
    <span>Duration: ${activityData.duration}</span>
    ${activityData.features.map((f) => `<span>${f}</span>`).join("")}
  `;

  const mainImage = document.getElementById("mainImage");
  const thumbnailContainer = document.getElementById("thumbnailContainer");

  if (activityData.images.length > 0) {
    mainImage.src = activityData.images[0];

    // Show only first 4 images in grid layout
    const displayImages = activityData.images.slice(0, 4);
    thumbnailContainer.innerHTML = displayImages
      .map(
        (img, i) =>
          `<img src="${img}" data-full="${img}" class="${
            i === 0 ? "active" : ""
          }">`
      )
      .join("");
  }

  document.getElementById("slotsContainer").innerHTML = activityData.timeSlots
    .map(
      (slot) => `
      <div class="slot">
        <div class="slot-info">
          <p class="time">Time: ${slot.time}</p>
          <p class="slot-count">* ${
            slot.available ? `${slot.slotsRemaining} Slots Remaining` : "No Slots Remaining"
          }</p>
        </div>
        <button class="btn ${slot.available ? "active" : "disabled"}" ${
        !slot.available ? "disabled" : ""
      }>
          ${slot.available ? "Book" : "Full"}
        </button>
      </div>
    `
    )
    .join("");

  document.getElementById("reviewsContainer").innerHTML = activityData.reviews
    .map(
      (review) => `
      <div class="review">
        <img src="${review.userAvatar}" alt="${review.userName}">
        <div class="review-content">
          <p class="reviewer-name">${review.userName}</p>
          <p class="review-rating">${generateStarRating(review.rating)}</p>
          <p class="review-text">${review.comment}</p>
          <p class="review-date">${new Date(review.date).toLocaleDateString()}</p>
        </div>
      </div>
    `
    )
    .join("");
}

// ---------------- FETCH (Backend Ready) ----------------
async function fetchActivityData(activityId) {
  try {
    const response = await fetch(`/api/activities/${activityId}`);
    if (!response.ok) throw new Error("Failed");
    return await response.json();
  } catch {
    return activityData; // fallback
  }
}

async function updateSlotAvailability(slotId, booked = false) {
  try {
    await fetch(`/api/slots/${slotId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ booked }),
    });
    await loadActivityData();
  } catch (err) {
    console.error(err);
  }
}

// ---------------- EVENT LISTENERS (UPDATED BOOKING POPUP) ----------------
function initializeEventListeners() {
  // Avatar menu
  document.getElementById("avatarBtn").onclick = () =>
    document.getElementById("avatarMenu").classList.toggle("show");

  // Slot selection popup toggle
  document.getElementById("openSlots").onclick = () =>
    document.getElementById("slotOverlay").classList.add("show");
  document.getElementById("closeOverlay").onclick = () =>
    document.getElementById("slotOverlay").classList.remove("show");

  // Thumbnail clicks - Image rotation functionality
  const mainImage = document.getElementById("mainImage");
  document.querySelectorAll(".thumbnails-grid img").forEach((thumb) => {
    thumb.onclick = () => {
      // Get clicked image source
      const clickedSrc = thumb.dataset.full;
      
      // Get current main image source
      const currentMainSrc = mainImage.src;
      
      // Swap the images
      mainImage.src = clickedSrc;
      thumb.src = currentMainSrc;
      thumb.dataset.full = currentMainSrc;
      
      // Update active states
      document.querySelectorAll(".thumbnails-grid img").forEach((t) => t.classList.remove("active"));
      thumb.classList.add("active");
    };
  });

  // BOOK BUTTON => OPENS SECOND POPUP
  document.querySelectorAll(".btn.active").forEach((btn) => {
    btn.onclick = (e) => {
      const slotElement = e.target.closest(".slot");
      const time = slotElement.querySelector(".time").textContent.replace("Time: ", "");
      const slot = activityData.timeSlots.find((s) => s.time === time);

      // Switch popups
      document.getElementById("slotOverlay").classList.remove("show");
      document.getElementById("bookSlotOverlay").classList.add("show");

      document.getElementById("selectedTime").textContent = `Time : ${time}`;
      document.getElementById(
        "slotsRemainingText"
      ).textContent = `* ${slot.slotsRemaining} Slots Remaining`;

      document.getElementById("confirmBook").onclick = () => {
        const count = parseInt(document.getElementById("slotInput").value);
        const extra = document.getElementById("extraInfo").value;

        if (count <= 0 || count > slot.slotsRemaining) return alert("Invalid number of slots!");

        alert(`✅ Booking Confirmed!\nTime: ${time}\nSlots: ${count}\nExtra: ${extra}`);
        document.getElementById("bookSlotOverlay").classList.remove("show");
      };

      document.getElementById("cancelBook").onclick = () =>
        document.getElementById("bookSlotOverlay").classList.remove("show");
    };
  });

  // Close second popup (X)
  document.getElementById("closeBookPopup").onclick = () =>
    document.getElementById("bookSlotOverlay").classList.remove("show");
}

// ---------------- MAIN ----------------
async function loadActivityData() {
  const id = new URLSearchParams(window.location.search).get("id") || 1;
  Object.assign(activityData, await fetchActivityData(id));
  populateActivityDetails();
  initializeEventListeners();
}

document.addEventListener("DOMContentLoaded", loadActivityData);