const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');

// GET /add-event
router.get('/add-event', async (req, res) => {
  const db = req.app.locals.db;
  const tags = await db.collection('tags').find().sort({ name: 1 }).toArray();

  res.render('addevent', {
    title: 'Добавить событие',
    success: req.query.success,
    error: req.query.error,
    tags // массив объектов { _id, name }
  });
});

// POST /add-event
router.post('/add-event', upload.single('image'), async (req, res) => {
    try {
        const db = req.app.locals.db;
        const { title, tag, date, location } = req.body;
        const image = req.file ? `/images/${req.file.filename}` : null;

        await db.collection('events').insertOne({
            title,
            tag,          
            date,
            location,
            image
        });

        const tags = await db.collection('tags').find().toArray();
        res.render('addevent', { tags, message: 'Событие добавлено ✅' });

    } catch (err) {
        console.error(err);
        res.send('Ошибка при добавлении события ❌');
    }
});

module.exports = router;
