// import modules
import dotenv from 'dotenv';

// declare constants for MariaDB with dotenv
dotenv.config()

export const 
    host = String(process.env.DB_HOST),
    port = Number(process.env.DB_PORT),
    user = String(process.env.DB_USER),
    pwd = String(process.env.DB_PWD),
    name = String(process.env.DB_NAME);

// [TYPECASTING](https://blog.logrocket.com/how-to-perform-type-casting-typescript/)
// is this ok to do?

