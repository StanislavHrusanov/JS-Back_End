const express = require('express');

const { PORT } = require('./config/env');
const { initializeDb } = require('./config/database');
const routes = require('./routes');
const cookieParser = require('cookie-parser');
const { auth } = require('./middlewares/authMiddleware');



const app = express();
require('./config/handlebars')(app);

app.use('/static', express.static('static'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(auth);
app.use(routes);

initializeDb()
    .then(() => {
        app.listen(PORT, () => console.log(`App is listening on port ${PORT}...`));
    })
    .catch((err) => {
        console.log('App cannot connect to Db', err);
    });