const express = require('express');
const session = require('express-session');
require('dotenv').config();

const db = require('./db/conn.js');
const securePassword = require("./utils/securePassword");
const comparePassword = require("./utils/comparePassword");
const userValidation = require("./validation/validator");


const app = express();
app.set('view engine', 'pug');
app.use(express.urlencoded({ extended: false }));
app.use('/', express.static('static'));
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized:false,
    name:'user',
    resave: false
}));


app.get('/', (req, res) => {
    const errormsg = req.query.e;
    if (req.session.user) {
        res.redirect('/member');
    } else if(errormsg) {
        res.render('home', { errormsg });
    } else {
        res.render('home');
    }
});

app.get('/member', (req, res) => {
    if (req.session.user) {
        res.render('welcome');
        console.log(req.session);
    } else {
        res.redirect('/');
    }
})

app.post('/signup', userValidation, async (req, res, next) => {
    if (!res.locals.validate) {
        const errormsg = res.locals.validationMessage;
        return res.redirect('/?e=' + encodeURIComponent(errormsg));
    }

    try {
        const email = req.body.email;
        const hashedPassword = await securePassword(req.body.password);
        const results = await db.selectFromDB(email);

        if (results.length === 0) {
            const result = await db.insertToDB(email, hashedPassword);
            req.session.user = result.id;
            res.redirect('/member');
        } else {
            const errormsg = 'This email address is already being used.'
            res.redirect('/?e=' + encodeURIComponent(errormsg));
        }
    } catch (err) {
        next(err)
    }
});

app.post('/login', userValidation, async (req, res, next) => {
    console.log(res.locals);
    if (!res.locals.validate) {
        const errormsg = res.locals.validationMessage;
        return res.redirect('/?e=' + encodeURIComponent(errormsg));
    }

    try {
        const email = req.body.email;
        const password = req.body.password;
        const results = await db.selectFromDB(email);
        if (results.length > 0 && await comparePassword(password, results[0].password)) {
            req.session.user = results[0].id;
            res.redirect('/member');
        } else {
            const errormsg = 'Incorrect email or password.';
            res.redirect('/?e=' + encodeURIComponent(errormsg));
        }
    } catch (err) {
        next(err);
    }
});

app.get('/logout' , (req, res) => {
    req.session.destroy(() => {
        console.log('session destroyed');
      });
    res.redirect('/');
});


app.use((err, req, res, next) => {
    res.locals.error = err;
    console.log(`Error: ${err.message}`);
    res.send('Error!');
});

app.listen(3000, () => {
    console.log('The application is running on localhost:3000!');
});