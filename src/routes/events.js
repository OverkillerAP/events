const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();

router.get('/event/:eventId', async (req, res) => {
  try {
    const db = req.app.locals.db;

    // защита от кривого id
    if (!ObjectId.isValid(req.params.eventId)) {
      return res.status(404).render('404', {
        title: 'Событие не найдено',
        menu: [],
        scripts: [],
      });
    }

    const event = await db
      .collection('events')
      .findOne({ _id: new ObjectId(req.params.eventId) });

    if (!event) {
      return res.status(404).render('404', {
        title: 'Событие не найдено',
        menu: [],
        scripts: [],
      });
    }

    // 👉 ПОДГРУЖАЕМ ТЕГИ
    if (Array.isArray(event.tags) && event.tags.length > 0) {
      event.tags = await db
        .collection('tags')
        .find({
          _id: { $in: event.tags.map((id) => new ObjectId(id)) },
        })
        .toArray();
    } else {
      event.tags = [];
    }

    res.render('event', {
      title: event.title,
      event,
      menu: await db.collection('tags').find().toArray(),
      scripts: [],
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
