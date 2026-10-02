const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Equipment Tracker API',
    description: 'API for managing inventory and customer write operations.',
  },
  host: 'localhost:8080',
  schemes: ['http', 'https'],
  definitions: {
    Inventory: {
      item_name: 'Excavator',
      category: 'Heavy Machinery',
      status: 'Available',
      price: 1500
    },
    Customer: {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '555-123-4567'
    }
  }
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/writeOperations.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);