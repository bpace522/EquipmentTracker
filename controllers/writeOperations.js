const model = require('../models/writeOperations');
const { isValidId, validateBody } = require('../validators/writeOperations');

function createController(collectionName) {
  async function create(req, res) {
    try {
      const { errors, data } = validateBody(collectionName, req.body);

      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      const result = await model.createDocument(collectionName, data);

      return res
        .location(`/${collectionName}/${result.insertedId}`)
        .status(201)
        .json({ id: result.insertedId });
    } catch (error) {
      console.error(`Failed to create ${collectionName}:`, error.message);

      return res.status(500).json({
        error: 'Internal server error',
      });
    }
  }

  async function update(req, res) {
    try {
      const { id } = req.params;

      if (!isValidId(id)) {
        return res.status(400).json({
          error: 'Invalid document ID',
        });
      }

      const { errors, data } = validateBody(collectionName, req.body);

      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      const result = await model.updateDocument(collectionName, id, data);

      if (result.matchedCount === 0) {
        return res.status(404).json({
          error: 'Document not found',
        });
      }

      return res.status(204).send();
    } catch (error) {
      console.error(`Failed to update ${collectionName}:`, error.message);

      return res.status(500).json({
        error: 'Internal server error',
      });
    }
  }

  async function remove(req, res) {
    try {
      const { id } = req.params;

      if (!isValidId(id)) {
        return res.status(400).json({
          error: 'Invalid document ID',
        });
      }

      const result = await model.deleteDocument(collectionName, id);

      if (result.deletedCount === 0) {
        return res.status(404).json({
          error: 'Document not found',
        });
      }

      return res.status(204).send();
    } catch (error) {
      console.error(`Failed to delete ${collectionName}:`, error.message);

      return res.status(500).json({
        error: 'Internal server error',
      });
    }
  }

  async function getOne(req, res) {
    try {
      const { id } = req.params;

      if (!isValidId(id)) {
        return res.status(400).json({
          error: 'Invalid document ID',
        });
      }

      const result = await model.getOneDocument(collectionName, id);

      if (!result) {
        return res.status(404).json({
          error: 'Document not found',
        });
      }

      return res.status(200).json(result);

    } catch (error) {
      console.error(`Failed to get from ${collectionName}:`, error.message);

      return res.status(500).json({
        error: 'Internal server error',
      });
    }
  }

  async function getAll(req, res) {
    try {
      const result = await model.getAllDocument(collectionName);

      return res.status(200).json(result);

    } catch (error) {
      console.error(`Failed to get from ${collectionName}:`, error.message);

      return res.status(500).json({
        error: 'Internal server error',
      });
    }
  }

  return { create, update, remove, getOne, getAll };
}

const inventory = createController('inventory');
const customers = createController('customers');

module.exports = {
  createInventory: inventory.create,
  updateInventory: inventory.update,
  createCustomer: customers.create,
  updateCustomer: customers.update,
  deleteInventory: inventory.remove,
  getInventoryOne: inventory.getOne,
  getInventoryAll: inventory.getAll,
  deleteCustomer: customers.remove,
  getCustomerOne: customers.getOne,
  getCustomerAll: customers.getAll,
};