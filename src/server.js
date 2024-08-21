const express = require('express');
const mysql = require ('mysql');
const swagger = require('./config/swagger');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 1337;
swagger.run(app);


// Create a connection pool to the MariaDB 
// Use dotenv to hide keys from github
const pool = mysql.createPool({
    connectionLimit: 5,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});


app.get('/stores', (req, res) => {
    pool.getConnection(function(err, connection) {
        connection.query("SELECT * FROM store", function (error, results, fields) {
            res.send(results)
            connection.release();
        });
    });
});


app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    console.log(`http://localhost:${port}/stores`)
    console.log(`Swagger API Documentation at http://localhost:${port}/api-docs`)
});
