const express = require('express');
const router = express.Router();

const menu = [
    { name: 'Все', category: 'all' },
    { name: 'Музыка', category: 'music' }
];

router.get('/', (req, res) => {
    res.render('index', {
        title: 'Prakse-Projekts',
        logo: '/images/logo.png',
        scripts: [

        ],
        styles: [
            
        ],
        menu,
        mainTitle: 'Основной контент',
        mainContent: 'Это динамически сгенерированный контент',
        year: new Date().getFullYear()
    });
});

module.exports = router;
