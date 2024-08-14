require('dotenv').config();
const mariadb = require ('mariadb');


// Configuration of environmental variables for MariaDB connection
const dbConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
};

// Create a connection pool to the MariaDB 
exports.pool = function() {
    const pool = mariadb.createConnection({
        host: dbConfig.host,
        port: dbConfig.port,
        user: dbConfig.user,
        password: dbConfig.password,
        database: dbConfig.database,
        connectionLimit: 5,
    })
};

