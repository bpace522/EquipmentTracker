const { ObjectId } = require('mongodb');
const { getDb } = require('../db/connect');

async function createDocument(collectionName, data) {
  return await getDb().collection(collectionName).insertOne(data);
}

async function updateDocument(collectionName, id, data) {
  return await getDb()
    .collection(collectionName)
    .updateOne(
      { _id: new ObjectId(id) },
      { $set: data }
    );
}

async function deleteDocument(collectionName, id) {
  return await getDb()
    .collection(collectionName)
    .deleteOne(
      { _id: new ObjectId(id) }
    );
}

async function getOneDocument(collectionName, id) {
  return await getDb()
    .collection(collectionName)
    .findOne({ _id: new ObjectId(id) });
}

async function getAllDocument(collectionName) {
  return await getDb()
    .collection(collectionName)
    .find({})
    .toArray();
}

module.exports = { 
  createDocument, 
  updateDocument, 
  deleteDocument, 
  getOneDocument, 
  getAllDocument 
};