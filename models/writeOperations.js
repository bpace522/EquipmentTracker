const { ObjectId } = require('mongodb');
const { getDb } = require('../db/connect');

function createDocument(collectionName, data) {
  return getDb().collection(collectionName).insertOne(data);
}

function updateDocument(collectionName, id, data) {
  return getDb()
    .collection(collectionName)
    .updateOne(
      { _id: new ObjectId(id) },
      { $set: data },
    );
}

function deleteDocument(collectionName, id) {
  return getDb()
    .collection(collectionName)
    .deleteOne(
      { _id: new ObjectId(id) }
    );
}

function getOneDocument(collectionName, id) {
  return getDb()
    .collection(collectionName)
    .find({ _id: new ObjectId(id) })
      .then((data) => {
         if (!data)
          res
            .status(404)
            .send({ message: 'Not found Inventory with id ' + id });
        else res.send(data[0]);
      })
      .catch((err) => {
        res.status(500).send({
          message: 'Error retrieving Inventory with inventory_id=' + id,
        });
      });
}

function getAllDocument(collectionName) {
  return getDb()
    .collection(collectionName)
    .find({})
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || 'Some error occurred while retrieving inventory.',
        });
      });
}

module.exports = { createDocument, updateDocument, deleteDocument, getOneDocument, getAllDocument };