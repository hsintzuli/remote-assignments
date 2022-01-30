const express = require('express');
const mysql = require('mysql2/promise');
const env = require('./key.json');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use('/', express.static('static'));
app.set('view engine', 'pug');

const connection = function () {
    return mysql.createConnection({
        host: env.MYSQL_HOST,
        user: env.MYSQL_USER,
        password: env.MYSQL_PASSWORD,
        database: "assignment"
    });
};

async function selectFromDB(email) {
    const db = await connection();
    const sql = `SELECT * FROM user WHERE email = '${email}';`;
    const [results, fileds] = await db.query(sql);
    console.log('\nResults From Query:');
    console.log(results);
    return results;
}

async function insertToDB(email, password) {
    const db = await connection();
    const sql = await `INSERT INTO user (email, password) VALUES ('${email}', '${password}')`;
    const [results, fileds] = await db.query(sql);
    console.log('\nResults From Query:');
    console.log(results);
    return results;
}

app.get('/', (req, res) => {
    const errormsg = req.query.e;
    if (errormsg) {
        res.render('home', { errormsg });
    } else {
        res.render('home');
    }
});

app.get('/member', (req, res) => {
    res.render('welcome');
})


app.post('/signup', async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        const errormsg = 'Invalid email or password.'
        res.redirect('/?e=' + encodeURIComponent(errormsg));
        return;
    }
    try {
        const results = await selectFromDB(email);
        if (results.length === 0) {
            const insertResult = await insertToDB(email, password);
            res.redirect('/member');
        } else {
            const errormsg = 'This email address is already being used.'
            res.redirect('/?e=' + encodeURIComponent(errormsg));
        }
    } catch (err) {
        next(err)
    }
});

app.post('/login', async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
        const errormsg = 'Invalid email or password.'
        res.redirect('/?e=' + encodeURIComponent(errormsg));
        return;
    }
    try {
        const results = await selectFromDB(email);
        if (results.length > 0 && results[0].password === password) {
            res.redirect('/member');

        } else {
            const errormsg = 'Incorrect email or password.';
            res.redirect('/?e=' + encodeURIComponent(errormsg));
        }
    } catch (err) {
        next(err);
    }
});

app.use((err, req, res, next) => {
    res.locals.error = err;
    console.log(`Error: ${err.message}`);
    res.send('Error!');
});

app.listen(3000, () => {
    console.log('The application is running on localhost:3000!');
});