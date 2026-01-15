document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('searchInput');
  const container = document.getElementById('events');

  let timeout;

  if (!input || !container) return; // защита на случай, если элементов нет

  input.addEventListener('input', () => {
    clearTimeout(timeout);

    timeout = setTimeout(async () => {
      const q = input.value.trim();

      if (!q) {
        container.innerHTML = '';
        return;
      }

      try {
        const res = await fetch(`/search?q=${encodeURIComponent(q)}`);
        const events = await res.json();
        render(events);
      } catch (err) {
        console.error(err);
        container.innerHTML = '<p>Ошибка при загрузке данных</p>';
      }
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
});
