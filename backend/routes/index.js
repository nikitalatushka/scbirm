// import node modules
const express = require('express');
const router = express.Router();

// import individual route files
const productRoutes = require('./products');

// use the imported routes
router.use('/products', productRoutes);

// export the router
module.exports = router;