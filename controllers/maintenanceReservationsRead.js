const model = require('../models/writeOperations');
const { isValidId } = require('../validators/maintenanceReservations');

function createReadController(collectionName) {
  async function getAll(req, res) {
    try {
      const documents = await model.getAllDocument(collectionName);
      return res.status(200).json(documents);
    } catch (error) {
      console.error(`Failed to list ${collectionName}:`, error.message);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async function getById(req, res) {
    try {
      const { id } = req.params;

      if (!isValidId(id)) {
        return res.status(400).json({ error: 'Invalid document ID' });
      }

      const document = await model.getOneDocument(collectionName, id);

      if (!document) {
        return res.status(404).json({ error: 'Document not found' });
      }

      return res.status(200).json(document);
    } catch (error) {
      console.error(`Failed to get ${collectionName}:`, error.message);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  return { getAll, getById };
}

const maintenance = createReadController('maintenance');
const reservations = createReadController('reservations');

module.exports = {
  getMaintenanceAll: maintenance.getAll,
  getMaintenanceById: maintenance.getById,
  getReservationsAll: reservations.getAll,
  getReservationById: reservations.getById,
};