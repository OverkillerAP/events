const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const events = await db.collection('events').find().toArray();

    res.render('index', {
      title: 'Prakse‑Projekts',
      logo: '/images/logo.png',
      menu: [
        { name: 'Все', tag: 'all' },
        { name: 'Музыка', tag: 'music' },
        { name: 'Театр', tag:'theater'},
        { name: 'Спорт', tag:'sports'},
        { name: 'Для семьи', tag:'family'},
        { name: 'Фестиваль', tag:'festival'},
        { name: 'Семинар', tag:'seminar'},
        { name: 'Кино', tag:'movie'}
        
      ],
      events,
      year: new Date().getFullYear()
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
