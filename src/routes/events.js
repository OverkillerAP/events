const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();

router.get('/:eventId', async (req, res) => {
    try {
        const db = req.app.locals.db;

        const event = await db
            .collection('events')
            .findOne({ _id: new ObjectId(req.params.eventId) });

        if (!event) {
            return res.status(404).render('404', {
                title: 'Событие не найдено',
                menu: [],
                scripts: [] // ✅ ОБЯЗАТЕЛЬНО
            });
        }

        res.render('event', {
            title: event.title,
            event,
            menu: await db.collection('tags').find().toArray(),
            scripts: [] // ✅ ОБЯЗАТЕЛЬНО
        });

    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

module.exports = router;



