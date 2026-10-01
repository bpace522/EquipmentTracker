const express = require('express');
const controller = require('../controllers/writeOperations');

const router = express.Router();

router.post('/inventory', controller.createInventory);
router.put('/inventory/:id', controller.updateInventory);

router.post('/customers', controller.createCustomer);
router.put('/customers/:id', controller.updateCustomer);

module.exports = router;