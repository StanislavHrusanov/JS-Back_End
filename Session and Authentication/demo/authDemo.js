const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const saltRounds = 10;
const secret = 'mySecret';
const password = '$2b$10$FfVjmBD6zrd2M.ufBmI1Q.fviMMpaZ5rItc6dZBN9T4WUv9MSaity';

app.use(cookieParser());

app.get('/register/:password?', async (req, res) => {

    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(req.params.password, salt);

    console.log(salt);
    console.log(hashedPassword);

    res.send(hashedPassword);
});

app.get('/login/:password', async (req, res) => {
    const isRightPass = await bcrypt.compare(req.params.password, password);

    if (isRightPass) {
        const payload = {
            username: 'Stani',
            _id: 123
        };
        const options = { expiresIn: '2d' };
        const token = jwt.sign(payload, secret, options);

        res.send(token);
    } else {
        res.send('Invalid password');
    }
});

app.get('/verify/:token', async (req, res) => {
    jwt.verify(req.params.token, secret, (err, decodedToken) => {
        if (err) {
            return res.status(401).send('You don\'t have permission');
        }
        res.json(decodedToken);

    });
});

app.listen(5001, () => console.log('App is listening on port 5001...'));