// import modules
import dotenv from 'dotenv';

// declare constants for MariaDB with dotenv
dotenv.config()

export const 
    host = process.env.DB_HOST,
    port = process.env.DB_PORT,
    user = process.env.DB_USER,
    pwd = process.env.DB_PWD,
    name = process.env.DB_NAME;



