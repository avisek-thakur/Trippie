

// Function to render activities
const container = document.getElementById('activitiesContainer');

activities.forEach(activity => {
  const card = document.createElement('div');
  card.classList.add('activity-card');
  card.innerHTML = `
    <img src="${activity.image}" alt="${activity.title}">
    <div class="content">
      <h2>${activity.title}</h2>
      <p>${activity.description}</p>
    </div>
  `;
  container.appendChild(card);
});
