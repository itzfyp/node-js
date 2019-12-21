const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

const dbSrc = 'mongodb+srv://node-complete:node-complete@cluster0-ubk2k.mongodb.net/test?retryWrites=true';

let _db;

const mongoConnect = cb => {
  MongoClient.connect(dbSrc, { useUnifiedTopology: true })
    .then(client => {
      console.log('Mongo connected.');
      _db = client.db();
      cb();
    })
    .catch(err => {
      console.log('Error @ mongo db connect', err);
      throw err;
    });
};

const getDB = () => {
  if (_db)
    return _db;
  throw 'No Database found'
}




exports.mongoConnect = mongoConnect;
exports.getDB = getDB;
