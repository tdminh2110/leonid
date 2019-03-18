const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'deepspa',
    password: 'Minhhanoi213@!#'
});

module.exports = pool.promise();