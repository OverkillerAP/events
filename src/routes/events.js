const express = require('express');
const router = express.Router();

router.get('/:eventId', (req, res) => {
  res.render('event', {
    title: `Event ${req.params.eventId}`,
    eventId: req.params.eventId,
    year: new Date().getFullYear()
  });
});

module.exports = router;