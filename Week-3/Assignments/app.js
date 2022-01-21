const express = require('express');

const app = express();
app.use('/', express.static('static'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.send('<h1>Hello, My Server!</h1>');
})

app.get('/data', (req, res) => {
    let { number } = req.query;
    if ( !number ) {
        throw new Error("Lack of Parameter");
    }

    number = parseInt(number);
    if (isNaN(number) || number <= 0) {
        throw new Error("Wrong Parameter");
    }

    const ans = number * (number + 1) / 2;
    res.render('data', { number, ans } );
});

app.use((err, req, res, next) => {
    res.locals.error = err;
    console.log(`Error: ${err.message}`);
    res.render('error');
});

app.listen(3000, () => {
    console.log('The application is running on localhost:3000!');
});