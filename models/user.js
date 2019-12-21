const mongoDB = require('mongodb');

const getDB = require('../util/database').getDB;

const ObjectId = mongoDB.ObjectID;

const createCollection = () => {
  const db = getDB();
  return db.collection('users');
}

class User {
  constructor(name, email, cart, id) {
    this.name = name;
    this.email = email;
    this.cart = cart;
    this._id = id;
  }

  save() {
    const dbColl = createCollection();

    return dbColl
      .insertOne(this)
      .then(res => {
        // console.log('product saved', res);
      })
      .catch(err => {
        console.log('Error @User Model : saving user');
      })
  }

  addToCart(product) {
    const cartProductIndex = this.cart.items.findIndex(i => String(i.productId) === String(product._id));
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];


    if (cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else
      updatedCartItems.push({ productId: ObjectId(product._id), quantity: newQuantity });

    const updatedCart = {
      items: updatedCartItems
    };

    const dbColl = createCollection();

    return dbColl.updateOne(
      { _id: ObjectId(this._id) },
      { $set: { cart: updatedCart } }
    );

  }

  getCart() {
    const db = getDB();
    const productIds = this.cart.items.map(i => i.productId);
    return db.collection('products')
      .find({ _id: { $in: productIds } })
      .toArray()
      .then(products => {
        return products.map(p => ({
          ...p,
          quantity: this.cart.items.find(i => "" + i.productId === "" + p._id).quantity
        }))
      });
  }

  deleteItemFromCart(prodId) {
    const updatedCartItem = this.cart.items.filter(i => i.productId != prodId);
    const dbColl = createCollection();

    return dbColl.updateOne(
      { _id: ObjectId(this._id) },
      { $set: { cart: { items: updatedCartItem } } }
    );

  }

  addToOrder() {
    const db = getDB();

    return this.getCart()
      .then(products => {
        const order = {
          items: products,
          user: {
            _id: ObjectId(this._id),
            name: this.name,
          }
        };
        return db.collection('orders').insertOne(order);
      })
      .then(() => {
        this.cart = { items: [] };
        const dbColl = createCollection();

        return dbColl.updateOne(
          { _id: ObjectId(this._id) },
          { $set: { cart: { items: [] } } }
        );

      })
  }

  getOrders() {
    const db = getDB();
    return db.collection('orders').find({ 'user._id': ObjectId(this._id) }).toArray();

  }

  static findById(userId) {
    const dbColl = createCollection();
    return dbColl.findOne({ _id: ObjectId(userId) })
      .then(user => {
        //console.log('User', user);
        return user;
      })
      .catch(err => {
        console.log('Error @User Model :  findById User');
      })
  }
}

module.exports = User;
