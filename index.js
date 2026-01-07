const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Главная страница
//app.get('/', (req, res) => {
   // res.sendFile(path.join(__dirname, 'public', 'index.html'));
//});

// Event lpp
app.get('/event/:eventId', (req, res) => {
    res.send(`Event! ${req.params.eventId}`);
});

// Server Run
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

// Date
const menu = [
  {name: 'Все', category: 'all'},
  {name: 'Музыка', category: 'music'},
  {name: 'Новости', category: 'news'},
  {name: 'Технологии', category: 'tech'},
  {name: 'Спорт', category: 'sports'},
  {name: 'Фильмы', category: 'movies'},
  {name: 'Образование', category: 'education'}
];
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Prakse-Projekts',
    logo: '/images/logo.png',
    menu,
    mainTitle: 'Основной контент',
    mainContent: 'Это динамически сгенерированный контент с сервера.',
    year: new Date().getFullYear()
  });
});