const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "judysql",
    database: "assignment"
});

db.connect(function (err) {
    if (err) throw err;
    console.log("Connected database: assignment!");
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', express.static('static'));
app.set('view engine', 'pug');


app.get('/', (req, res) => {
    const errormsg = req.query.e;
    if (errormsg) {
        res.render('home', {errormsg});
    } else {
        res.render('home');
    }
});

app.get('/member', (req, res) => {
    res.render('welcome');
})

app.post('/signup', (req, res) => {
    const email =  req.body.email;
    const password = req.body.password;
    let select = `SELECT * FROM user WHERE email = '${email}';`;

    if (!email || !password) {
        const errormsg = 'Invalid email or password.'
        res.redirect('/?e=' + encodeURIComponent(errormsg));
        return;
    }

    let selectQuery = db.query(select, (err, results) => {
        if (err) throw err;
        console.log('\nResults From Query:');
        console.log(results);

        if (results.length === 0) {
            let insert = `INSERT INTO user (email, password) VALUES ('${email}', '${password}')`;
            let insertquery = db.query(insert, (err, results) => {
                if (err) throw err;
                console.log('\nResults From Query:');
                console.log(results);
            });
            res.redirect('/member');

        } else {
            const errormsg = 'This email address is already being used.'
            res.redirect('/?e=' + encodeURIComponent(errormsg));
        }
    });
});

app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
        const errormsg = 'Invalid email or password.'
        res.redirect('/?e=' + encodeURIComponent(errormsg));
        return;
    }

    let select = `SELECT * FROM user WHERE email = '${email}';`;
    let query = db.query(select, (err, results) => {
        if (err) throw err;
        console.log('\nResults From Query:');
        console.log(results);

        if (results.length > 0 && results[0].password === password) {
            res.redirect('/member');

        } else {
            const errormsg = 'Incorrect email or password.';
            res.redirect('/?e=' + encodeURIComponent(errormsg));
        }
    });
});

app.use((err, req, res, next) => {
    res.locals.error = err;
    console.log(`Error: ${err.message}`);
    res.send('error');
});

app.listen(3000, () => {
    console.log('The application is running on localhost:3000!');
});