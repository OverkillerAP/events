const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const db = req.app.locals.db;

        // ===== ТЕГИ =====
        let tags = await db.collection('tags').find().sort({ name: 1 }).toArray();

        // ===== ВЫБРАННЫЕ ТЕГИ И ДАТА =====
        let selectedTags = req.query.tags || [];
        if (!Array.isArray(selectedTags)) selectedTags = [selectedTags];

        let selectedDate = req.query.date || '';

        let filter = {};

        // ===== Фильтр по тегам =====
        if (selectedTags.length && !selectedTags.includes('all')) {
            // В событии поле называется tag и это строка
            filter['tag'] = { $in: selectedTags.map(t => t.toLowerCase()) };
        }

        // ===== Фильтр по дате =====
        if (selectedDate) {
            filter['date'] = selectedDate; // т.к. дата в базе хранится строкой в формате "YYYY-MM-DD"
        }

        const events = await db.collection('events').find(filter).toArray();
        res.render('event', { events, title: 'Все события' });

        // ===== RENDER =====
        res.render('index', {
            title: 'Prakse-Projekts',
            logo: '/images/logo.png',
            scripts: [
                'filters.js'
            ],
            menu: tags,
            events,
            selectedTags,
            selectedDate,
            year: new Date().getFullYear()
        });

    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }

    const menu = await db.collection('tags').find().toArray();
    res.render('index', { events, menu, title: 'События' });
});

module.exports = router;