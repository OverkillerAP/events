router.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Us',
    year: new Date().getFullYear()
  });
});



