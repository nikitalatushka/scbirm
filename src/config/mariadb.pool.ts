// import node modules
import mysql from 'mysql';

// import project modules
import * as db from '../config/db.config';

// declare object with db_configs
const db_config = {
    host: db.host,
    port: db.port,
    user: db.user,
    password: db.pwd,
    connectionLimit: 5,
    database: db.name,
}

// create pool
const pool = mysql.createPool(
    db_config
)

// Attempt to catch disconnects 
pool.on('connection', function (connection) {
    console.log('DB Connection established');
});
pool.on('error', function (err) {
    console.error(new Date(), 'MySQL error', err.code);
});
pool.on('close', function (err) {
    console.error(new Date(), 'MySQL close', err);
});


module.exports = pool;
//https://www.sitepoint.com/understanding-module-exports-exports-node-js