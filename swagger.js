const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Equipment Tracker API',
    description:
      'API for managing inventory, customers, maintenance orders, and reservations.',
  },
  host: null,
  schemes: null,
  definitions: {
    Inventory: {
      name: 'Excavator',
      description: 'Tracked excavator for construction work.',
      category: 'Heavy Machinery',
      serialNumber: 'EXC-001',
      dailyRate: 1500,
      status: 'available',
      condition: 'Good',
    },
    Customer: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '555-123-4567',
    },
    Maintenance: {
      inventoryId: '507f1f77bcf86cd799439011',
      description: 'Leo Swagger maintenance test',
      scheduledDate: '2026-10-15',
      status: 'scheduled',
      cost: 30,
    },
    Reservation: {
      inventoryId: '507f1f77bcf86cd799439011',
      customerId: '507f1f77bcf86cd799439012',
      startDate: '2026-10-15',
      endDate: '2026-10-16',
      status: 'pending',
    },
  },
};

const outputFile = './swagger-output.json';

const endpointsFiles = [
  './routes/writeOperations.js',
  './routes/maintenanceReservationsWrite.js',
];

swaggerAutogen(outputFile, endpointsFiles, doc);