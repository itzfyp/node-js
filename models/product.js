const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Product', productSchema);

// const getDB = require('../util/database').getDB;
// class Product {

//   constructor(title, price, description, imageUrl, id, userId) {
//     this.title = title;
//     this.price = price;
//     this.description = description;
//     this.imageUrl = imageUrl;
//     this._id = id && new mongoDB.ObjectID(id);
//     this.userId = userId && new mongoDB.ObjectID(userId);
//   }

//   save() {
//     const db = getDB();
//     const dbColl = db.collection('products');
//     let response$;

//     if (this._id)
//       response$ = dbColl.updateOne(
//         { _id: this._id },
//         { $set: this }
//       )
//     else
//       response$ = dbColl.insertOne(this)

//     return response$
//       .then(res => {
//         // console.log('product saved', res);
//       })
//       .catch(err => {
//         console.log('Error @Product Model : saving product');
//       })
//   }

//   static fetchAll() {
//     const db = getDB();
//     return db.collection('products')
//       .find()
//       .toArray()
//       .then(products => {
//         // console.log('products fetchAll', products);
//         return products;
//       })
//       .catch(err => {
//         console.log('Error @Product Model : fetchAll products');
//       })
//   }
//   static findByPk(prodId) {
//     const db = getDB();
//     return db.collection('products')
//       .find({ _id: new mongoDB.ObjectID(prodId) })
//       .next()
//       .then(product => {
//         // console.log('product findByPk', product);
//         return product;
//       })
//       .catch(err => {
//         console.log('Error @Product Model : findByPk product');
//       })
//   }

//   static deleteById(prodId) {
//     const db = getDB();
//     return db.collection('products')
//       .deleteOne({ _id: new mongoDB.ObjectID(prodId) })
//       .then(product => {
//         console.log('product deleted', product);
//       })
//       .catch(err => {
//         console.log('Error @Product Model :  deleteById product');
//       })
//   }

// }


