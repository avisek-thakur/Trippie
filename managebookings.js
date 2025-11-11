/* managebookings.js
   - dynamic table rows from backend (with fallback)
   - simple client-side pagination
   - use FETCH_URL to point to your API
*/

/* CONFIG */
const FETCH_URL = '/api/bookings'; // change if your endpoint differs
const ROWS_PER_PAGE = 10;

/* fallback mock data (used if fetch fails) */
const fallbackBookings = [
  { id: 1, activity: "Everest Helicopter Ride", date: "2025/10/10", time: "10:30 PM", user: "Rihana", slots: 5 },
  { id: 2, activity: "Everest Helicopter Ride", date: "2025/10/10", time: "10:30 PM", user: "Eminem", slots: 1 },
  { id: 3, activity: "Go Karting", date: "2025/11/10", time: "12:00 PM", user: "John", slots: 1 },
  // more sample rows for demonstration
];

/* state for pagination */
let bookings = [];
let currentPage = 1;

/* helper: fetch bookings from backend with fallback */
async function loadBookingsFromServer() {
  try {
    const res = await fetch(FETCH_URL, { cache: "no-store" });
    if (!res.ok) throw new Error('Network response not OK');
    const data = await res.json();
    if (!Array.isArray(data)) throw new Error('Invalid data format from server');
    return data;
  } catch (err) {
    console.warn('Fetch failed, using fallback data:', err);
    return fallbackBookings;
  }
}

/* render bookings for current page */
function renderTable() {
  const tbody = document.getElementById('bookingTableBody');
  tbody.innerHTML = '';

  const start = (currentPage - 1) * ROWS_PER_PAGE;
  const pageData = bookings.slice(start, start + ROWS_PER_PAGE);

  if (pageData.length === 0) {
    const tr = document.createElement('tr');
    tr.innerHTML = '<td colspan="6" style="text-align:center; padding:20px; font-weight:600; color:#6d6d6d;">No bookings found</td>';
    tbody.appendChild(tr);
    return;
  }

  pageData.forEach((b, idx) => {
    const tr = document.createElement('tr');

    // S.N. - show sequence number in table (global index)
    const globalIndex = start + idx + 1;
    tr.innerHTML = `
      <td>${globalIndex}</td>
      <td>${escapeHtml(b.activity || '')}</td>
      <td>${escapeHtml(b.date || '')}</td>
      <td>${escapeHtml(b.time || '')}</td>
      <td>${escapeHtml(b.user || '')}</td>
      <td>${escapeHtml(String(b.slots || ''))}</td>
    `;
    tbody.appendChild(tr);
  });

  // update pagination display
  document.getElementById('currentPage').textContent = currentPage;
  // enable/disable buttons:
  document.getElementById('prevPage').disabled = (currentPage === 1);
  document.getElementById('nextPage').disabled = (currentPage * ROWS_PER_PAGE >= bookings.length);
}

/* simple HTML-escape to avoid injection */
function escapeHtml(str){
  return String(str)
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;')
    .replace(/'/g,'&#39;');
}

/* pagination handlers */
document.addEventListener('click', (e) => {
  if (e.target && e.target.id === 'prevPage') {
    if (currentPage > 1) { currentPage--; renderTable(); }
  }
  if (e.target && e.target.id === 'nextPage') {
    if (currentPage * ROWS_PER_PAGE < bookings.length) { currentPage++; renderTable(); }
  }
});

/* Logout functionality */
document.getElementById("logoutBtn").addEventListener("click", () => {
  window.location.href = "login.html";
});

/* initial load */
async function init() {
  bookings = await loadBookingsFromServer();
  currentPage = 1;
  renderTable();
}

/* Initialize when DOM is loaded */
document.addEventListener('DOMContentLoaded', () => {
  // init table
  init();

  // Pagination buttons initial state
  document.getElementById('prevPage').disabled = true;
});