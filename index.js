const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/event/:eventId', (req, res) => {
    res.send(`Event! ${req.params.eventId}`);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});


// Подключаем статические папки
app.use(express.static(path.join(__dirname, 'public')));

// Middleware для JSON и форм
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Простой маршрут на главную страницу
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });


app.listen(3000, () => console.log('Server running on port 3000'));



//пересмотреть код на повторы