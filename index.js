const express = require('express');
const path = require('path');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

// --------------------
// Middleware
// --------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --------------------
// View engine
// --------------------
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

// --------------------
// Static
// --------------------
app.use(express.static(path.join(process.cwd(), 'public')));

// --------------------
// MongoDB
// --------------------
const client = new MongoClient('mongodb://localhost:27017');

async function startServer() {
  try {
    await client.connect();
    const db = client.db('mydatabase');
    app.locals.db = db;

    console.log('✅ MongoDB connected');

    // --------------------
    // Глобальные данные для EJS
    // --------------------
    app.use(async (req, res, next) => {
      try {
        res.locals.menu = await db
          .collection('tags')
          .find({})
          .toArray();
      } catch {
        res.locals.menu = [];
      }

      res.locals.title = 'Events App';
      res.locals.year = new Date().getFullYear();
      next();
    });

    // --------------------
    // Routes
    // --------------------
    app.use('/', require('./src/routes/home'));
    app.use('/', require('./src/routes/about'));
    app.use('/', require('./src/routes/search'));
    app.use('/event', require('./src/routes/events'));

    // --------------------
    // Events by date
    // --------------------
    app.get('/events', async (req, res) => {
      const date = req.query.date;

      const events = await db
        .collection('events')
        .find({ date })
        .toArray();

      res.render('events', {
        title: `События на ${date}`,
        events,
        date
      });
    });

    // --------------------
    // API for calendar
    // --------------------
    app.get('/api/event-dates', async (req, res) => {
      const events = await db
        .collection('events')
        .find({})
        .project({ date: 1 })
        .toArray();

      res.json(events.map(e => e.date));
    });

    // --------------------
    // 404
    // --------------------
    app.use((req, res) => {
      res.status(404).send('404 | Page not found');
    });

    app.listen(port, () => {
      console.log(`🚀 http://localhost:${port}`);
    });

  } catch (err) {
    console.error('❌ MongoDB error:', err);
  }
}

startServer();
