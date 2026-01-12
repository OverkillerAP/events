const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const db = req.app.locals.db;

    // Получаем события
    const events = await db.collection('events').find().toArray();

    // Получаем теги из базы
    let tags = await db.collection('tags').find({}).sort({ name: 1 }).toArray();


    tags.unshift({ id: 'all', name: 'Все' });

 
    res.render('index', {
      title: 'Prakse‑Projekts',
      logo: '/images/logo.png',
      menu: tags,
      events,
      year: new Date().getFullYear()
    });

  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});router.get('/', async (req, res) => {
  try {
    const db = req.app.locals.db;

    // Получаем теги из базы
    let tags = await db.collection('tags').find({}).sort({ name: 1 }).toArray();

    // Добавляем "Все" для интерфейса
    tags.unshift({ id: 'all', name: 'Все' });

    // Получаем события (можно фильтровать по тегу)
    const tagFilter = req.query.tag && req.query.tag !== 'all'
      ? { tags: req.query.tag } // если событие хранит массив тегов
      : {};
    const events = await db.collection('events').find(tagFilter).toArray();

    res.render('index', {
      title: 'Project',
      logo: '/images/logo.png',
      menu: tags,  // <--- передаём массив тегов
      events,
      year: new Date().getFullYear()
    });

  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;

