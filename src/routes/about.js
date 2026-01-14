const express = require('express');
const router = express.Router();

router.get('/about', async (req, res) => {
  const menu = await req.app.locals.db
    .collection('tags')
    .find()
    .toArray();
  res.render('about', {
    title: 'О нас',
    menu,
    year: new Date().getFullYear()
  });
});
module.exports = router;


