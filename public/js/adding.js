document.getElementById('addEventForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = e.target;
  const data = {
    title: form.title.value,
    date: form.date.value,
    city: form.city.value
  };

  try {
    const res = await fetch('/add-event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await res.json();

    const status = document.getElementById('status');
    if (result.success) {
      status.textContent = result.message;
      status.className = 'text-success mt-3';
      form.reset();
    } else {
      status.textContent = result.message;
      status.className = 'text-danger mt-3';
    }
  } catch (err) {
    console.error(err);
  }
});
