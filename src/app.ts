// import node modules
import express from 'express';

// import module.exports
import * as local from './config/local.config'
import { ProductController } from './controllers/product.controller'
ProductController.
const app = express();

app.listen(local.default.port, () => {
    // test app should be listening
    console.log(`App is listening at ${local.default.port}`);
});