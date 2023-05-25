const express = require('express');
const handlebars = require('express-handlebars');
const routes = require('./routes');
const app = express();
const port = 5000;

app.use('/public', express.static('public'));

app.use(express.urlencoded({ extended: false }));

app.engine('hbs', handlebars.engine({
    extname: 'hbs'
}));
app.set('view engine', 'hbs');

app.use(routes);

app.listen(port, () => console.log(`Server is listening on port ${port}...`));