 const express = require('express');
const swagger = require('./config/swagger');
const mariadb = require('./config/mariadb');

const app = express();
const port = 3000;

swagger.run(app);




// Define a route to list all stores
app.get('/stores', async (req, res) => {
    let conn;
    try {
        // Get a connection from the pool
        conn = await mariadb.pool.getConnection();
        // Execute the query
        const rows = await conn.query("SELECT * FROM store");
        // Send the rows as JSON response
        res.json(rows);
    } catch (err) {
        console.error('Error fetching stores:', err);
        res.status(500).json({ error: 'An error occurred while fetching stores' });
    } finally {
        // Release the connection back to the pool
        if (conn) conn.release();
    }
});


app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    console.log(`http://localhost:${port}/stores`)
    console.log(`Swagger API Documentation at http://localhost:${port}/api-docs`)
});
