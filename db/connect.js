const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

// const MongoClient = require('mongodb').MongoClient;

let _client;
let _collection;

const initDatabase = () => {
  mongoose.connect(process.env.DB_URI, (err, client) => {
    if (err) throw err;
    _client= client;
    _collection = client.db.collection('bucketlist');
    console.log(`DB Connected Successfully`);
  });
};

const getCollection = () => {
  console.log('getcollection called');
  return _collection;
};

module.exports = { initDatabase, getCollection };