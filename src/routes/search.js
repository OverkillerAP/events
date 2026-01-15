const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');

const uri = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(uri);

router.get('/search', async (req, res) => {
    try {
        const q = req.query.q || '';
        const db = req.app.locals.db;

        const events = await db.collection('events')
            .find({ title: { $regex: q, $options: 'i' } })
            .toArray();

        const menu = await db.collection('tags').find().sort({ name: 1 }).toArray();
        menu.unshift({ _id: 'all', name: 'Все' });

        res.render('events', {
            title: 'Результаты поиска',
            events,
            menu
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

module.exports = router;