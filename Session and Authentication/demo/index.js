const express = require('express');
const hbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSession = {};

const app = express();
const saltRounds = 10;
const secret = 'mySecret';

app.use(cookieParser('', {}));
app.use('/static', express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.engine('hbs', hbs.engine({ extname: 'hbs' }));
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    const token = req.cookies['session'];

    if (token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            if (err) {
                return res.status(401).send('Invalid token!');
            }
            res.render('home', { email: decodedToken.email });
        });
    } else {
        res.render('home', { email: 'guest' })
    }
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', async (req, res) => {
    const { email, password } = req.body;

    if (userSession[email]) {
        res.status(400).send('This email is already exist!');
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    userSession[email] = {
        email,
        password: hashedPassword
    }

    res.redirect('/login');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const isAuthenticated = await bcrypt.compare(password, userSession[email].password);

    if (isAuthenticated) {
        const token = jwt.sign({ email }, secret, { expiresIn: '2d' });

        res.cookie('session', token, { httpOnly: true });
        res.redirect('/');

    } else {
        res.status(401).send('Wrong username or password!');
    }
});

app.listen(5001, () => console.log('App is listening on port 5001...'));