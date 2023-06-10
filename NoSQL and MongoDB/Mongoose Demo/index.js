const express = require('express');
const handlebars = require('express-handlebars');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();
const url = 'mongodb://localhost:27017/myMovies';

mongoose.connect(url)
    .then(() => {
        console.log('DB is connected');
    })
    .catch((err) => {
        console.log('DB error', err);
    });

app.use(express.urlencoded({ extended: false }));
app.engine('hbs', handlebars.engine({
    extname: 'hbs'
}));

app.set('view engine', 'hbs');

app.use(routes);

app.listen(5000, () => console.log('Server is listening on port 5000...'));