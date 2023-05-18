const express = require('express');
const fs = require('fs');
const handlebars = require('express-handlebars');
const { catsMiddleware } = require('./middlewares');
const path = require('path');

const users = [
    { name: 'John', age: 20 },
    { name: 'Alan', age: 21 },
    { name: 'Paul', age: 22 }
];

const app = express();

app.engine('hbs', handlebars.engine({
    extname: 'hbs'
}));
app.set('view engine', 'hbs');

const port = 5000;

// app.use(catsMiddleware);

app.use('/static', express.static('public'));

app.get('/:name?', (req, res) => {
    // res.send('Hello');

    res.render('home', {
        name: req.params.name || 'guest',
        users,
        isAuth: false
    });
});

app.get('/cats', catsMiddleware, (req, res) => {
    if (req.cats.length > 0) {
        res.send(req.cats.join(', '));
    } else {
        res.send('No cats here!');
    }
});

app.post('/cats/:catName', catsMiddleware, (req, res) => {
    req.cats.push(req.params.catName);
    res.status(201);
    res.send(`${req.params.catName} was added!`);
});

app.put('/cats', (req, res) => {
    res.send('Cat was edited!');
});

app.get('/download', (req, res) => {
    res.writeHead(200, {
        // 'content-disposition': 'attachment; fileName="sample.pdf"'
        'content-type': 'application/pdf',
        'content-disposition': 'inline'
    });

    const readStream = fs.createReadStream('./sample.pdf');

    // readStream.on('data', (data) => {
    //     res.write(data);
    // });
    // readStream.on('end', () => {
    //     res.end();
    // });

    readStream.pipe(res);
});

app.get('/express-download', (req, res) => {
    res.download('./sample.pdf');
});

app.get('/redirect', (req, res) => {
    res.writeHead(302, {
        'Location': '/cats'
    });
    res.end();
});

app.get('/express-redirect', (req, res) => {
    res.redirect('/cats');
});

app.get('/public/img/:imgName', (req, res) => {
    res.sendFile(path.resolve('./public/img', req.params.imgName))
});

app.listen(port, () => console.log(`Server is listening on port ${port}...`));