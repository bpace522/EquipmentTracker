const express = require('express');
const controller = require('../controllers/writeOperations');
const router = express.Router();
const { isAuthenticated } = require('../middleware/authenticate');

router.get(
	'/inventory',
	/* #swagger.summary = 'List all inventory items' */
	/* #swagger.description = 'Returns every inventory item in the collection.' */
	/* #swagger.responses[200] = { description: 'Inventory items returned' } */
	/* #swagger.responses[500] = { description: 'Internal server error' } */
	controller.getInventoryAll,
);
router.get(
	'/inventory/:id',
	/* #swagger.summary = 'Get an inventory item by ID' */
	/* #swagger.description = 'Returns the inventory item matching the supplied MongoDB ObjectId.' */
	/* #swagger.parameters['id'] = { in: 'path', required: true, type: 'string' } */
	/* #swagger.responses[200] = { description: 'Inventory item returned' } */
	/* #swagger.responses[400] = { description: 'Invalid document ID' } */
	/* #swagger.responses[404] = { description: 'Inventory item not found' } */
	/* #swagger.responses[500] = { description: 'Internal server error' } */
	controller.getInventoryById,
);
router.post(
	'/inventory',
	isAuthenticated,
	/* #swagger.parameters['body'] = { in: 'body', schema: { $ref: '#/definitions/Inventory' } } */
	/* #swagger.responses[201] = { description: 'Inventory item created' } */
	/* #swagger.responses[400] = { description: 'Invalid inventory data' } */
	/* #swagger.responses[500] = { description: 'Internal server error' } */
	controller.createInventory,
);
router.put(
	'/inventory/:id',
	isAuthenticated,
	/* #swagger.parameters['id'] = { in: 'path', required: true, type: 'string' } */
	/* #swagger.parameters['body'] = { in: 'body', schema: { $ref: '#/definitions/Inventory' } } */
	/* #swagger.responses[204] = { description: 'Inventory item updated' } */
	/* #swagger.responses[400] = { description: 'Invalid ID or inventory data' } */
	/* #swagger.responses[404] = { description: 'Inventory item not found' } */
	/* #swagger.responses[500] = { description: 'Internal server error' } */
	controller.updateInventory,
);
router.delete(
	'/inventory/:id',
	isAuthenticated,
	/* #swagger.parameters['id'] = { in: 'path', required: true, type: 'string' } */
	/* #swagger.responses[204] = { description: 'Inventory item deleted' } */
	/* #swagger.responses[400] = { description: 'Invalid document ID' } */
	/* #swagger.responses[404] = { description: 'Inventory item not found' } */
	/* #swagger.responses[500] = { description: 'Internal server error' } */
	controller.deleteInventory,
);

router.get(
	'/customers',
	/* #swagger.summary = 'List all customers' */
	/* #swagger.description = 'Returns every customer in the collection.' */
	/* #swagger.responses[200] = { description: 'Customers returned' } */
	/* #swagger.responses[500] = { description: 'Internal server error' } */
	controller.getCustomerAll,
);
router.get(
	'/customers/:id',
	/* #swagger.summary = 'Get a customer by ID' */
	/* #swagger.description = 'Returns the customer matching the supplied MongoDB ObjectId.' */
	/* #swagger.parameters['id'] = { in: 'path', required: true, type: 'string' } */
	/* #swagger.responses[200] = { description: 'Customer returned' } */
	/* #swagger.responses[400] = { description: 'Invalid document ID' } */
	/* #swagger.responses[404] = { description: 'Customer not found' } */
	/* #swagger.responses[500] = { description: 'Internal server error' } */
	controller.getCustomerById,
);
router.post(
	'/customers',
	isAuthenticated,
	/* #swagger.parameters['body'] = { in: 'body', schema: { $ref: '#/definitions/Customer' } } */
	/* #swagger.responses[201] = { description: 'Customer created' } */
	/* #swagger.responses[400] = { description: 'Invalid customer data' } */
	/* #swagger.responses[500] = { description: 'Internal server error' } */
	controller.createCustomer,
);
router.put(
	'/customers/:id',
	isAuthenticated,
	/* #swagger.parameters['id'] = { in: 'path', required: true, type: 'string' } */
	/* #swagger.parameters['body'] = { in: 'body', schema: { $ref: '#/definitions/Customer' } } */
	/* #swagger.responses[204] = { description: 'Customer updated' } */
	/* #swagger.responses[400] = { description: 'Invalid ID or customer data' } */
	/* #swagger.responses[404] = { description: 'Customer not found' } */
	/* #swagger.responses[500] = { description: 'Internal server error' } */
	controller.updateCustomer,
);
router.delete(
	'/customers/:id',
	isAuthenticated,
	/* #swagger.parameters['id'] = { in: 'path', required: true, type: 'string' } */
	/* #swagger.responses[204] = { description: 'Customer deleted' } */
	/* #swagger.responses[400] = { description: 'Invalid document ID' } */
	/* #swagger.responses[404] = { description: 'Customer not found' } */
	/* #swagger.responses[500] = { description: 'Internal server error' } */
	controller.deleteCustomer,
);

module.exports = router;