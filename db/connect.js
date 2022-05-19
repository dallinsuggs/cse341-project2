const dotenv = require('dotenv');

dotenv.config();

const MongoClient = require('mongodb').MongoClient;

let _client;
let _collection;

const initDatabase = () => {
  MongoClient.connect(process.env.DB_URI, (err, client) => {
    if (err) throw err;
    _client= client;
    _collection = client.db('bucketlist_db').collection('bucketlist');
    console.log('DB Connected Successfully');
  });
};

const getCollection = () => {
  console.log('getcollection called');
  return _collection;
};

module.exports = { initDatabase, getCollection };