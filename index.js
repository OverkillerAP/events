const express = require('express');
const path = require('path');
const { MongoClient } = require('mongodb');
const app = express();
const port = 3000;



const aboutRoutes = require('./src/routes/about');
const searchRoutes = require('./src/routes/search');
app.use((req, res, next) => {
    res.locals.year = new Date().getFullYear();
    next();
});

app.use('/', aboutRoutes);
app.use('/', searchRoutes);

app.get('/events', async (req, res) => {
  const date = req.query.date;

  const events = await req.app.locals.db
    .collection('events')
    .find({ date })
    .toArray();

  res.render('events', { events, date });
});

app.get('/api/event-dates', async (req, res) => {
  const events = await req.app.locals.db
    .collection('events')
    .find({})
    .project({ date: 1 })
    .toArray();

  res.json(events.map(e => e.date));
});


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

// Static
app.use(express.static(path.join(process.cwd(), 'public')));

// MongoDB
const client = new MongoClient('mongodb://localhost:27017');



async function startServer() {
    try {
        await client.connect();

        // DB
        const db = client.db('mydatabase');

        // DB tags
        const tags = await db.collection('tags').find({}).toArray();

        console.log('✅ MongoDB connected');

        // save db for routes
        app.locals.db = db;

        // Routes
        app.use('/', require('./src/routes/home'));
        app.use('/event', require('./src/routes/events'));

        // 404
        app.use((req, res) => {
            res.status(404).send('404 | Page not found');
        });

        app.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`);
        });

    } catch (err) {
        console.error('❌ MongoDB connection error:', err);
    }
}




startServer();
