const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

let _db;

const initDb = (callback) => {
    if (_db) {
        console.log('db is already on');
        return callback(null, _db);
    }
    MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
        _db = client.db(process.env.DB_NAME || 'CSE341_group_project');
        callback(null, _db);
    })
    .catch((err) => {
        callback(err);
    });
};

const getDb = () => {
    if (!_db) {
        throw Error('db not on');
    }
    return _db;
};

module.exports = { initDb, getDb};