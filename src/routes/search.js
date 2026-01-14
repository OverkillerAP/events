const express = require('express');
const router = express.Router();
const db = require('../db'); // подключение к Mongo

router.get('/search', async (req, res) => {
  const q = req.query.q?.trim();

  if (!q) {
    return res.json([]);
  }

  try {
    const events = await db
      .collection('events')
      .find({
        title: { $regex: q, $options: 'i' } // 🔍 поиск по title
      })
      .toArray();

    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json([]);
  }
});

module.exports = router;
