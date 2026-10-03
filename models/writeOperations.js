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
    .findOne({ _id: new ObjectId(id) });
}

function getAllDocument(collectionName) {
  return getDb()
    .collection(collectionName)
    .find({})
    .toArray();
}

module.exports = { createDocument, updateDocument, deleteDocument, getOneDocument, getAllDocument };