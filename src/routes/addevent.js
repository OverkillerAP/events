const express = require('express');
const router = express.Router();

// GET /add-event
router.get('/add-event', (req, res) => {
    console.log('🟢 GET /add-event');
    res.render('addevent', { title: 'Добавить событие' });
});

// POST /add-event
router.post('/add-event', async (req, res) => {
  console.log('🟢 POST /add-event', req.body);
  try {
    const db = req.app.locals.db;
    const event = {
      title: req.body.title,
      tag: req.body.tag,
      image: req.body.image,
      date: req.body.date,
      location: req.body.location
    };
    console.log(event);
    await db.collection('events').insertOne(event);
    res.json({ success: true, message: 'Событие добавлено' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Ошибка при добавлении события' });
  }
});

module.exports = router;
