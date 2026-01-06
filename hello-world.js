const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/event/:eventId', (req, res) => {
    res.send(`Event! ${req.params.eventId}`);
});



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
