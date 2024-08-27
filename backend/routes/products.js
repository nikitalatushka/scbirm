// import modules
const express = require('express');
const router = express.Router();

router.get('/products', (req, res) => {
    pool.getConnection(function(err, connection) {

        // Optional Query Parameters
        const productName = req.query.productName;

        // SQL query string
        sql = `SELECT 
        product_ID as ID, 
        product_name as name, 
        production_time as time, 
        sale_value as value, 
        level_unlocked as level, 
        store_ID as store 
        FROM product`
        // If product_name query parameter is provided, modify the SQL query
        if (productName) {
            sql += " WHERE product.product_name = ?"
        }
        // Run SQL query
        connection.query(sql, productName ? [productName] : [], (error, results) => {
            console.log(`getConnection`)
            connection.release();
            console.log(`releaseConnection`)
            // Return error if query fails
            if (error) {
                return res.status(500).send("Database query error");
            // Return error is nothing is returned
            } else if (results.length == 0) {
                return res.status(404).send("Product not found");
            // Return results if there are no errors
            } else {
                return res.send(results);
                console.log(`sendResults`);
            }
        });
    });
});

module.exports = router;