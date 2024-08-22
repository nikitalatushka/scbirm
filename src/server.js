const express = require('express');
const mysql = require ('mysql');
const swagger = require('./config/swagger');
require('dotenv').config();

// Initialize Express and Swagger Docs
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

//-----------
// ROUTES 
//===========
app.get('/products', (req, res) => {
    pool.getConnection(function(err, connection) {
        connection.query("SELECT * FROM product JOIN store ON product.store_id=store.store_ID", function (error, results, fields) {
            res.send(results)
            connection.release();
        });
    });
});

app.get('/products/:productID', (req, res) => {
    const productID = req.params.productID
    // Check to make sure parameter is a positive integer
    if (isNaN(productID) || Number(productID) <= 0) {
        return res.status(400).send("Bad Request: productID must be a number");
    }
    // Establish connection to database
    pool.getConnection(function(err, connection) {
        // Return error if connection cannot be established
        if (err) {
            return res.status(500).send("Server Error: Cannot get connection from pool");
        }
        // Run SQL query
        connection.query("SELECT * FROM product JOIN store ON product.store_id=store.store_ID WHERE product_ID = " + productID, function (error, results, fields) {
            // Release DB connection after running query
            connection.release();
            // Return error if query fails
            if (error) {
                return res.status(500).send("Database query error");
            // Return error is nothing is returned
            } else if (results.length == 0) {
                return res.status(404).send("Product not found");
            // Return results if there are no errors
            } else {
                return res.send(results)
            }
        });
    });
});

app.get('/products/:productID/recipe', (req, res) => {
    const productID = req.params.productID
    // Check to make sure parameter is a positive integer
    if (isNaN(productID) || Number(productID) <= 0) {
        return res.status(400).send("Bad Request: productID must be a positive integer");
    }
    // Establish connection to database
    pool.getConnection(function(err, connection) {
        // Return error if connection cannot be established
        if (err) {
            return res.status(500).send("Server Error: Cannot get connection from pool");
        }
        // Run SQL query
        connection.query("SELECT count, subassembly_name, material_name FROM recipe LEFT JOIN material ON recipe.material_id = material.material_ID LEFT JOIN subassembly ON recipe.subassembly_id = subassembly.subassembly_ID WHERE recipe.product_id = " + productID, function (error, results, fields) {
            // Release DB connection after running query
            connection.release();
            // Return error if query fails
            if (error) {
                return res.status(500).send("Database query error");
            // Return error is nothing is returned
            } else if (results.length == 0) {
                return res.status(404).send("Product not found");
            // Return results if there are no errors
            } else {
                return res.send(results)
            }
        });
    });
});

app.get('/materials', (req, res) => {
    pool.getConnection(function(err, connection) {
        connection.query("SELECT * FROM material", function (error, results, fields) {
            res.send(results);
            connection.release();
        });
    });
});

app.get('/materials/:materialID', (req, res) => {
    const materialID = req.params.materialID
    // Check to make sure parameter is a positive integer
    if (isNaN(materialID) || Number(materialID) <= 0) {
        return res.status(400).send("Bad Request: materialID must be a positive intger");
    }
    // Establish connection to database
    pool.getConnection(function(err, connection) {
        // Return error if connection cannot be established
        if (err) {
            return res.status(500).send("Server Error: Cannot get connection from pool");
        }
        // Run SQL query
        connection.query("SELECT * FROM material WHERE material_ID = " + materialID, function (error, results, fields) {
            // Release DB connection after running query
            connection.release();
            // Return error if query fails
            if (error) {
                return res.status(500).send("Database query error");
            // Return error is nothing is returned
            } else if (results.length == 0) {
                return res.status(404).send("Material not found");
            // Return results if there are no errors
            } else {
                return res.send(results)
            }
        });
    });
});

app.get('/materials/:materialID/recipe', (req, res) => {
    const materialID = req.params.materialID
    // Check to make sure parameter is a positive integer
    if (isNaN(materialID) || Number(materialID) <= 0) {
        return res.status(400).send("Bad Request: materialID must be a positive integer");
    }
    // Establish connection to database
    pool.getConnection(function(err, connection) {
        // Return error if connection cannot be established
        if (err) {
            return res.status(500).send("Server Error: Cannot get connection from pool");
        }
        // Run SQL query
        connection.query("SELECT product_name, count FROM recipe LEFT JOIN product ON recipe.product_id = product.product_ID WHERE recipe.material_id = " + materialID, function (error, results, fields) {
            // Release DB connection after running query
            connection.release();
            // Return error if query fails
            if (error) {
                return res.status(500).send("Database query error");
            // Return error is nothing is returned
            } else if (results.length == 0) {
                return res.status(404).send("Material not found");
            // Return results if there are no errors
            } else {
                return res.send(results)
            }
        });
    });
});

app.get('/stores', (req, res) => {
    pool.getConnection(function(err, connection) {
        connection.query("SELECT * FROM store", function (error, results, fields) {
            res.send(results)
            connection.release();
        });
    });
});

app.get('/stores/:storeID', (req, res) => {
    const storeID = req.params.storeID
    // Check to make sure parameter is a positive integer
    if (isNaN(storeID) || Number(storeID) <= 0) {
        return res.status(400).send("Bad Request: storeID must be a positive intger");
    }
    // Establish connection to database
    pool.getConnection(function(err, connection) {
        // Return error if connection cannot be established
        if (err) {
            return res.status(500).send("Server Error: Cannot get connection from pool");
        }
        // Run SQL query
        connection.query("SELECT product_name, product_ID FROM product LEFT JOIN store ON product.store_id = store.store_ID WHERE store.store_ID =" + storeID, function (error, results, fields) {
            // Release DB connection after running query
            connection.release();
            // Return error if query fails
            if (error) {
                return res.status(500).send("Database query error");
            // Return error is nothing is returned
            } else if (results.length == 0) {
                return res.status(404).send("Store not found");
            // Return results if there are no errors
            } else {
                return res.send(results)
            }
        });
    });
});





app.listen(port, () => {
    console.log(`Swagger API Documentation at http://localhost:${port}/api-docs`)
    console.log(`http://localhost:${port}/products`)
    console.log(`http://localhost:${port}/products/2020`)
    console.log(`http://localhost:${port}/products/2020/recipe`)
    console.log(`http://localhost:${port}/materials`)
    console.log(`http://localhost:${port}/materials/1004`)    
    console.log(`http://localhost:${port}/materials/1004/recipe`)
    console.log(`http://localhost:${port}/stores`)
    console.log(`http://localhost:${port}/stores/4004`)
});
