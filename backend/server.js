const express = require('express');
const cors = require('cors');
const mysql = require ('mysql');
const swagger = require('./swagger');
const routes = require('./routes');
require('dotenv').config();

// Initialize Express and Swagger Docs
const app = express();
const port = process.env.PORT || 1337;
swagger.run(app);

// Use CORS middleware for running front and backend on different ports
app.use(cors());

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

// ROUTES 

app.use('/products', routes);

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
            return res.status(500).send("Internal Server Error: Cannot get connection from pool");
        }
        // Run SQL query
        connection.query(`
            SELECT 
            product_ID as ID, 
            product_name as name, 
            production_time as time, 
            sale_value as value, 
            level_unlocked as level, 
            store_ID as store 
            FROM product 
            WHERE product_ID = ` + productID, function (error, results, fields) {
            // Release DB connection after running query
            connection.release();
            // Return error if query fails
            if (error) {
                return res.status(500).send("Internal Server Error: Database query error");
            }

                // Return error is nothing is returned
            if (results.length == 0) {
                return res.status(404).send("Not found: Requested resource does not exist");
            }
            
            const processedResults = [];
            const queries = [];

            results.forEach(result => {
                const storeID = result.store;
                let query;
                let params;
                
                query = `
                SELECT
                store_ID as ID,
                store_name as name,
                description,
                level_unlocked as level
                FROM store
                WHERE store_ID = ?`;
                params = [storeID];

                 // Collect queries to run in parallel
                 queries.push(new Promise((resolve, reject) => {
                    connection.query(query, params, (err, rows) => {
                        if (err) {
                            return reject(err);
                        }
                        if (rows.length === 0) {
                            return reject(new Error("Store not found"));
                        }
                        // Add to processed results
                        processedResults.push({
                            // TODO: how do I make sure ID references product not store
                            ID: result.ID,
                            name: result.name,
                            time: result.time,
                            value: result.value,
                            level: result.level,
                            store: rows[0]
                        });
                        resolve();
                    });
                }));

            });
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
        connection.query(`
            SELECT count, 
            COALESCE(subassembly.product_id, material.material_ID) as ingredient 
            FROM recipe 
            LEFT JOIN material ON recipe.material_id = material.material_ID 
            LEFT JOIN subassembly ON recipe.subassembly_id = subassembly.subassembly_ID 
            WHERE recipe.product_id = `  + productID, function (error, results, fields) {
            // Release DB connection after running query
            connection.release();

            // Return error if query fails
            if (error) {
                return res.status(500).send("Database query error");
            }

            // Check if results is undefined or not an array
            if (!Array.isArray(results)) {
                console.error("Unexpected results format:", results);
                return res.status(500).send("Unexpected results format");
            }

            // Return error is nothing is returned
            if (results.length == 0) {
                return res.status(404).send("Product not found");
            }

            // Process the results:
            // A `count` and an `ingredient` ID is returned by the query
            // Determine ingredient type with value ranges of ID   
            // Run queries for either `product` or `materials` table
            // Collect queries in an array and execute them in parallel using `Promise.all`
            // Format the results according to schema and send in response
            const processedResults = [];
            const queries = [];

            results.forEach(result => {
                const ingredientID = result.ingredient;
                let query;
                let params;
                let type;

                // Determine ingredient type with value ranges of ID                
                if (ingredientID >= 2000 && ingredientID <= 2999) { // then it is a product
                    query = `
                    SELECT product_ID AS ID, product_name AS name
                    FROM product
                    WHERE product_ID =  ?`;
                    params = [ingredientID];
                    type = 'product';
                } else if (ingredientID >= 1000 && ingredientID <=1999) { // then it is a material
                    query = `
                    SELECT material_ID AS ID, material_name AS name
                    FROM material
                    WHERE material_ID =  ?`;
                    params = [ingredientID];
                    type = 'material';
                } else {
                    return res.status(400).send("Bad Data: Invalid ingredient ID");
                }
                
                 // Collect queries to run in parallel
                 queries.push(new Promise((resolve, reject) => {
                    connection.query(query, params, (err, rows) => {
                        if (err) {
                            return reject(err);
                        }
                        if (rows.length === 0) {
                            return reject(new Error("Ingredient not found"));
                        }
                        // Add to processed results
                        processedResults.push({
                            count: result.count,
                            ingredient: {
                                ...rows[0], // Spread the ingredient properties
                                type: type  // Add type to ingredient
                            }
                        });
                        resolve();
                    });
                }));
            });

            // Run all queries in parallel and return the results
            Promise.all(queries)
                .then(() => res.send(processedResults))
                .catch(err => {
                    console.error("Error processing queries:", err);
                    res.status(500).send("Database query error");
                });
        });
    });
});

app.get('/materials', (req, res) => {
    pool.getConnection(function(err, connection) {
        connection.query("SELECT * FROM material", function (error, results, fields) {
            
            const materialName = req.query.materialName;
            
            sql = `SELECT
            material_ID AS ID,
            material_name AS name,
            production_time AS time,
            sale_value AS value,
            level_unlocked AS level,
            store_ID as store
            FROM material`
            if (materialName) {
                sql += " WHERE material.material_name = ?"
            }

            connection.query(sql, materialName ? [materialName] : [], (error, results) => {
            console.log("getConnection");
                connection.release();
                console.log(`releaseConnection`);
                if (error) {
                    return res.status(500).send("Database query error");
                } else if (results.length == 0) {
                    return res.status(404).send("Product not found");
                } else {

                    return res.send(results)
                    console.log(`getResults`);
                }
            });
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
