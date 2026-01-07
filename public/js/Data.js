const links = document.querySelectorAll('.nav-link');
const content = document.getElementById('content');

// Содержимое для каждой категории
const data = {
    all: 'Показан весь контент',
    music: 'Показана музыка',
    news: 'Показаны новости',
    tech: 'Показаны технологии',
    sports: 'Показан спорт',
    movies: 'Показаны фильмы',
    education: 'Показано образование'
};

links.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault(); // Отменяем переход по ссылке
        // Убираем класс active у всех ссылок
        links.forEach(l => l.classList.remove('active'));
        // Делаем текущую ссылку активной
        this.classList.add('active');
        // Меняем контент
        const category = this.dataset.category;
        content.innerHTML = data[category] || 'Контент не найден';
    });
});
const searchInput = document.getElementById("searchInput");
const autocomplete = document.getElementById("autocomplete");
const menuItems = document.querySelectorAll("#menuList .nav-item");

const categories = [...menuItems].map(item => {
    const link = item.querySelector(".nav-link");
    return {
        name: link.textContent,
        category: link.dataset.category,
        element: item
    };
});

// 🔍 Поиск по data-category и тексту
searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase();
    autocomplete.innerHTML = "";

    categories.forEach(c => {
        const match =
            c.name.toLowerCase().includes(value) ||
            c.category.includes(value);

        c.element.style.display = match ? "" : "none";
    });

    if (!value) return;

    // 🔽 Автодополнение
    categories
        .filter(c => c.name.toLowerCase().includes(value))
        .forEach(c => {
            const item = document.createElement("button");
            item.className = "list-group-item list-group-item-action";
            item.textContent = c.name;

            item.onclick = () => {
                searchInput.value = c.name;
                autocomplete.innerHTML = "";
            };

            autocomplete.appendChild(item);
        });
});

// ❌ Закрытие автодополнения при клике вне
document.addEventListener("click", e => {
    if (!searchInput.contains(e.target)) {
        autocomplete.innerHTML = "";
    }
});
