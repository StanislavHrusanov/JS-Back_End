const express = require('express');
const expressSession = require('express-session');

const app = express();

app.use(expressSession({
    secret: 'mySecret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.get('/', (req, res) => {
    req.session.username = 'Pesho ' + Math.random();

    res.send('Home page');
});

app.get('/session', (req, res) => {
    res.send(req.session);
});

app.listen(5001, () => console.log('App is listening on port 5001...'));