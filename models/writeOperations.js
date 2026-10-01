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

module.exports = { createDocument, updateDocument };