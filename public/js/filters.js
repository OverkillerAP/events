document.getElementById('apply-filters').addEventListener('click', () => {
        const tags = [];
        document.querySelectorAll('.filter-checkbox:checked').forEach(cb => {
            tags.push(cb.value);
        });

        const date = document.getElementById('filter-date').value;

        const params = new URLSearchParams();

        tags.forEach(tag => params.append('tags', tag));
        if (date) params.append('date', date);

        window.location.href = '/?' + params.toString();
    });