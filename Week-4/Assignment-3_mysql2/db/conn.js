require('dotenv').config();

const mysql = require('mysql2/promise');
var db = {};

const connection = function () {
    return mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: "assignment"
    });
};

db.selectFromDB = async function(email) {
    const db = await connection();
    const sql = `SELECT * FROM user WHERE email = ?;`;
    const [results, fileds] = await db.execute(sql, [email]);
    console.log('\nResults From Query:');
    console.log(results);
    return results;
}

db.insertToDB = async function(email, password) {
    const db = await connection();
    const sql = await `INSERT INTO user (email, password) VALUES (?, ?)`;
    const [results, fileds] = await db.execute(sql, [email, password]);
    console.log('\nResults From Query:');
    console.log(results);
    return results;
}

module.exports = db;