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


const root = path.join(__dirname, 'public');
app.use(express.static(root));

app.listen(3000, () => console.log('Server running on port 3000'));
