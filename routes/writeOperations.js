const express = require('express');
const controller = require('../controllers/writeOperations');

const router = express.Router();

router.post('/inventory', controller.createInventory);
router.put('/inventory/:id', controller.updateInventory);

router.post('/customers', controller.createCustomer);
router.put('/customers/:id', controller.updateCustomer);

// Process to delete inventory
router.post('/delete/:id', controller.deleteInventory)

// Process to get all inventory
router.get('/getInventory/', controller.getInventoryAll)

// Process to get inventiry by Id
router.get('/getInventory/:id', controller.getInventoryOne)

module.exports = router;