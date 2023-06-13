const express = require('express');
const cookieParser = require('cookie-parser');


const app = express();
app.use(cookieParser());

app.get('/', (req, res) => {
    res.cookie('test cookie', 'cookie value');

    res.send('Hello');
});

app.get('/cookies', (req, res) => {
    console.log(req.cookies);

    res.send(req.cookies['test cookie']);
});

app.listen(5001, () => console.log('App is listening on port 5001...'));
