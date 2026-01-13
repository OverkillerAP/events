const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();

router.get('/:eventId', async (req, res) => {
  try {
    const db = req.app.locals.db;

    // Находим событие
    const event = await db.collection('events').findOne({ _id: new ObjectId(req.params.eventId) });

    if (!event) {
      return res.status(404).send('Событие не найдено');
    }

    // Получаем все теги для меню
    const tags = await db.collection('tags').find().sort({ name: 1 }).toArray();
    tags.unshift({ _id: 'all', name: 'Все' });

    // Рендерим страницу
    res.render('event', {
      title: event.title,
      logo: '/images/logo.png',
      menu: tags,       // передаём menu в header
      event,            // правильно передаём событие
      selectedTags: [],
      selectedDate: '',
      year: new Date().getFullYear()
    });

  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
