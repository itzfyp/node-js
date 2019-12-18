// const mongodb = require('mongodb');

// const MongoClient = mongodb.MongoClient;

// const dbSrc = 'mongodb+srv://node-complete:node-complete@cluster0-ubk2k.mongodb.net/test?retryWrites=true';

// const mongoConnect = cb => {
//   MongoClient.connect(dbSrc, { useUnifiedTopology: true })
//     .then(client => {
//       console.log('Mongo connected.');
//       cb(client);
//     })
//     .catch(err => {
//       console.log('Error @ mongo db connect', err);
//     });
// };




const MongoClient = require('mongodb').MongoClient;



const mongoConnect = cb => {
  console.log('calling mongoConnect...');
  const uri = "mongodb+srv://node-complete:node-complete@cluster0-ubk2k.mongodb.net/test?retryWrites=true&w=majority";
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  client.connect()
    .then(response => {
      console.log('Mongo connected.');
      cb(response);
    })
    .catch(err => {
      const collection = client.db("test").collection("devices");
      // perform actions on the collection object
      client.close();
    });

};


module.exports = mongoConnect;
