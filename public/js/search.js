const input = document.getElementById('searchInput');
const container = document.getElementById('events');

let timeout;

input.addEventListener('input', () => {
  clearTimeout(timeout);

  timeout = setTimeout(async () => {
    const q = input.value.trim();

    if (!q) {
      container.innerHTML = '';
      return;
    }

    const res = await fetch(`/search?q=${encodeURIComponent(q)}`);
    const events = await res.json();

    render(events);
  }, 300);
});

function render(events) {
  container.innerHTML = '';

  if (!events.length) {
    container.innerHTML = '<p>Ничего не найдено</p>';
    return;
  }

  events.forEach(e => {
    container.innerHTML += `
      <div class="col-md-4">
        <div class="card mb-3">
          <img src="${e.image}" class="card-img-top">
          <div class="card-body">
            <h5>${e.title}</h5>
            <p>${e.location}</p>
            <small>${e.date}</small>
          </div>
        </div>
      </div>
    `;
  });
}