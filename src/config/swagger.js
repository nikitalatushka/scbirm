const YAML = require('yamljs');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = YAML.load('./swagger.yaml');

exports.run = function(app) {

    console.log(`start ./config/swagger`)

    // Setup the Swagger UI middleware
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

} 
