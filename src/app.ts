// import node modules
import express from 'express';

// import project modules
import * as local from './config/local.config'

const app = express();

app.listen(local.default.port, () => {
    // test app should be listening
    console.log(`App is listening at ${local.default.port}`);


    
});