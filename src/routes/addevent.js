const express = require('express');
const router = express.Router();

// GET — страница формы
router.get('/', (req, res) => {
    console.log('GET /add-event');
    res.render('addevent', { title: 'Добавить событие' });
});

// POST — добавление события
router.post('/', async (req, res) => {
    console.log('POST /add-event', req.body);
    try {
        const db = req.app.locals.db;
        const event = {
            title: req.body.title,
            tag: req.body.tag,
            image: req.body.image,
            date: req.body.date,
            location: req.body.location,
            createdAt: new Date()
        };
        await db.collection('events').insertOne(event);
        res.json({ success: true, message: 'Событие добавлено' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Ошибка при добавлении события' });
    }
});

module.exports = router;
