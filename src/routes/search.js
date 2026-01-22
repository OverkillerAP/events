const express = require('express');
const router = express.Router();


router.get('/api/search', async (req, res) => {
    try {
        const q = (req.query.q || '').trim();
        if (!q) return res.json([]);

        const db = req.app.locals.db;

        const events = await db.collection('events')
            .find({ $text: { $search: q } })
            .project({ title: 1, date: 1, location: 1, image: 1 })
            .limit(20)
            .toArray();

        res.json(events);
    } catch (err) {
        console.error('Search API error:', err);
        res.status(500).json([]);
    }
});

/**
 * Обычный поиск (HTML, Enter / кнопка)
 */
router.get('/search', async (req, res) => {
    try {
        const q = (req.query.q || '').trim();
        const db = req.app.locals.db;

        const events = await db.collection('events')
            .find(q ? { $text: { $search: q } } : {})
            .toArray();

        res.render('events', {
            title: 'Результаты поиска',
            events
        });
    } catch (err) {
        console.error('Search page error:', err);
        res.status(500).send('Server error');
    }
});

module.exports = router;
