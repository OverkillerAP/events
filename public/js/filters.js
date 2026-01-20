const root = document.createElement("div");
root.className = "filters";

// Header
const header = document.createElement("div");
header.className = "header";
header.innerHTML = "☰ &lt; Скрыть фильтры";
root.appendChild(header);

// Map button
const mapBtn = document.createElement("button");
mapBtn.className = "map-btn";
mapBtn.innerHTML = "📍 Поиск на карте";
root.appendChild(mapBtn);

root.appendChild(document.createElement("hr"));

/* ===== CALENDAR ===== */
const calendar = document.createElement("div");
calendar.className = "calendar";

// Month header
const month = document.createElement("div");
month.className = "month";
month.innerHTML = "‹ январь 2026 ›";
calendar.appendChild(month);

// Weekdays
const weekdays = document.createElement("div");
weekdays.className = "weekdays";
["пн","вт","ср","чт","пт","сб","вс"].forEach(d => {
  const div = document.createElement("div");
  div.textContent = d;
  weekdays.appendChild(div);
});
calendar.appendChild(weekdays);

// Days
const days = document.createElement("div");
days.className = "days";

// January 2026 starts on Thursday
const emptyDays = 3;
for (let i = 0; i < emptyDays; i++) {
  days.appendChild(document.createElement("div"));
}

for (let i = 1; i <= 31; i++) {
  const day = document.createElement("div");
  day.textContent = i;

  if (i === 8) {
    day.className = "today";
    day.innerHTML = `<small>Сегодня</small><br>${i}`;
  }

  days.appendChild(day);
}

calendar.appendChild(days);
root.appendChild(calendar);

root.appendChild(document.createElement("hr"));

/* ===== CATEGORIES ===== */
const title = document.createElement("h3");
title.textContent = "Категория";
root.appendChild(title);

["Ужасы","Драма","Боевик","Криминал","Комедии"].forEach(cat => {
  const label = document.createElement("label");
  label.className = "category";
  label.innerHTML = `<input type="checkbox"> ${cat}`;
  root.appendChild(label);
});

// Render
document.body.appendChild(root);
