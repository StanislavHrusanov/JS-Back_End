const express = require('express');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const { initializeDatabase } = require('./config/database');
const { auth } = require('./middlewares/authMiddlewares');

const app = express();
require('./config/handlebars')(app);

app.use('/static', express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(auth);
app.use(routes);

initializeDatabase()
    .then(() => {
        app.listen(5002, () => console.log('App is listening on port 5002...'));
    })
    .catch((err) => {
        console.log('App cannot connect to DB', err);
    });