// Express
const express = require('express');
const app = express();
const port = 3000;

// Swagger
const swagger = require('./config/swagger');
swagger.run(app);



// -------- //
// Requests //
// -------- //
app.get('/', (req, res) => {
    res.send('Hello World');
});


// ------ //
// Listen //
// ------ //
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    console.log(`http://localhost:${port}/stores`)
    console.log(`Swagger API Documentation at http://localhost:${port}/api-docs`)
});
