// Navbar functionality
const avatar = document.querySelector(".avatar");
const avatarMenu = document.querySelector(".avatar-menu");

if (avatar) {
    avatar.addEventListener("click", () => {
        avatarMenu.classList.toggle("show");
    });
}

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Home logo navigation
    const homeLogo = document.getElementById('homeLogo');
    if (homeLogo) {
        homeLogo.addEventListener('click', function() {
            window.location.href = "homepage.html";
        });
    }

    // Manage Profile navigation
    const manageProfileBtn = document.getElementById('manageProfileBtn');
    if (manageProfileBtn) {
        manageProfileBtn.addEventListener('click', function() {
            window.location.href = "manageprofile.html";
        });
    }

    // View Booking navigation (stays on current page)
    const viewBookingBtn = document.getElementById('viewBookingBtn');
    if (viewBookingBtn) {
        viewBookingBtn.addEventListener('click', function() {
            avatarMenu.classList.remove("show");
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

// KEEP ALL EXISTING TABLE DATA CODE BELOW - NO CHANGES
const activities = [
    { sn: 1, name: "Everest Helicopter Ride", date: "2025/10/10", time: "10:30 PM", slots: 5 },
    { sn: 2, name: "Go Karting", date: "2025/11/10", time: "12:00 PM", slots: 1 },
    { sn: 3, name: "Bungee Jumping", date: "2025/11/15", time: "03:00 PM", slots: 3 }
];

const tableBody = document.getElementById('table-body');
activities.forEach(item => {
    const row = document.createElement('div');
    row.classList.add('table-row');
    row.innerHTML = `
        <span class="td sn">${item.sn}</span>
        <span class="td name">${item.name}</span>
        <span class="td date">${item.date}</span>
        <span class="td time">${item.time}</span>
        <span class="td slots">${item.slots}</span>
    `;
    tableBody.appendChild(row);
});