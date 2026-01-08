const express = require('express');
const path = require('path');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', require('./src/routes/home'));
app.use('/event', require('./src/routes/events'));

// 404
app.use((req, res) => {
    res.status(404).send('404 | Page not found');
});

// MongoDB connection
const client = new MongoClient('mongodb://localhost:27017/mydatabase');

async function startServer() {
  try {
    await client.connect();
    console.log('✅ MongoDB connected');

    // Server
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });

  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
  }
}

startServer();

