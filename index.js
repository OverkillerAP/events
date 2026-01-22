const express = require('express');
const path = require('path');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

console.log('1️⃣ Запуск приложения...');

// --------------------
// Middleware
// --------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.locals.scripts = []; 
    console.log(`2️⃣ Middleware: res.locals.scripts инициализирован`);
    next();
});

// --------------------
// View engine
// --------------------
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));
console.log('3️⃣ View engine настроен на EJS');

// --------------------
// Static
// --------------------
app.use(express.static(path.join(process.cwd(), 'public')));
console.log('4️⃣ Статические файлы из public/ подключены');

// --------------------
// MongoDB (локальная)
// --------------------
const client = new MongoClient('mongodb://localhost:27017');

// --------------------
// Start server
// --------------------
async function startServer() {
    try {
        console.log('5️⃣ Подключение к MongoDB...');
        await client.connect();
        const db = client.db('mydatabase');
        app.locals.db = db;
        console.log('✅ MongoDB connected (local)');

        // --------------------
        // Глобальные данные для EJS
        // --------------------
        app.use(async (req, res, next) => {
            try {
                console.log('6️⃣ Загрузка меню из базы...');
                res.locals.menu = await db
                    .collection('tags')
                    .find({})
                    .sort({ name: 1 })
                    .toArray();
                console.log(`✅ Меню загружено: ${res.locals.menu.length} элементов`);
            } catch (err) {
                console.error('❌ Menu load error:', err);
                res.locals.menu = [];
            }

            res.locals.title = 'Events App';
            res.locals.year = new Date().getFullYear();

            // 🔹 глобально подключаем Search.js
            res.locals.scripts.push('Search.js');
            console.log('7️⃣ Search.js добавлен в scripts');

            next();
        });

        // --------------------
        // Routes
        // --------------------
        console.log('8️⃣ Подключение маршрутов...');

        app.use('/', require('./src/routes/home'));
        console.log('→ Home route подключен');

        app.use('/', require('./src/routes/about'));
        console.log('→ About route подключен');

        app.use('/', require('./src/routes/search'));
        console.log('→ Search route подключен');

        app.use('/', require('./src/routes/events'));
        console.log('→ Events route подключен');

        app.use('/', require('./src/routes/addevent'));
        console.log('→ Add-event route подключен');

        // --------------------
        // Events by date (GET /events?date=YYYY-MM-DD)
        // --------------------
        app.get('/events', async (req, res) => {
            const date = req.query.date;
            console.log(`9️⃣ GET /events с date=${date}`);
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
            console.log('🔟 GET /api/event-dates');
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
            console.log(`⚠️ 404 Not Found: ${req.originalUrl}`);
            res.status(404).send('404 | Page not found');
        });

        // --------------------
        // Listen
        // --------------------
        app.listen(port, () => {
            console.log(`🚀 Server running at http://localhost:${port}`);
        });

    } catch (err) {
        console.error('❌ MongoDB error:', err);
        process.exit(1);
    }
}

startServer();
