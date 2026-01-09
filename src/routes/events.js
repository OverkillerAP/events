const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();

router.get('/:eventId', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const event = await db.collection('events').findOne({ _id: new ObjectId(req.params.eventId) });

    if (!event) {
      return res.status(404).send('Событие не найдено');
    }

    res.render('event', {
      title: event.title,
      event,
      year: new Date().getFullYear()
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
