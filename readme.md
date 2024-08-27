# SimCity BuildIt - Resource Manager

SimCity BuildIt is a mobile game that requires a player to manufacture products to progress. Keeping track of required products, the intermediate products, and the raw materials can be difficult.

## Problem Statements
- HMW save user time by with keeping track of required products for easy reference?
- HMW eliminate supply chain issues by providing the player with a count of required raw materials?

## Steps
- [ ] create Express app
- [ ] connect to MariaDB
- [ ] define routes
  - `/products` <<-- implement first
  - `/materials`
  - `/stores`
- [ ] define controller functions - calls service functions and executes
  - `getAllProducts` 
  - `getProductById`
  - `getProductRecipe`
- [ ] define service classes - holds the function for using MySQL query like get

https://medium.com/@rachealkuranchie/how-to-build-a-crud-api-with-express-js-and-typescript-21c7c66e5296

## Routes Testing
    console.log(`http://localhost:${port}/products`)
    console.log(`http://localhost:${port}/products/2020`)
    console.log(`http://localhost:${port}/products/2020/recipe`)
    console.log(`http://localhost:${port}/materials`)
    console.log(`http://localhost:${port}/materials/1004`)    
    console.log(`http://localhost:${port}/materials/1004/recipe`)
    console.log(`http://localhost:${port}/stores`)
    console.log(`http://localhost:${port}/stores/4004`)
        console.log(`Swagger API Documentation at http://localhost:${port}/api-docs`)