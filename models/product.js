const fs = require('fs');
const path = require('path');
const Cart = require('./cart');

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    cb(err ? [] : JSON.parse(fileContent));
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    console.log(this);

    const writeIntoFile = products => {
      if (this.id) {
        const existingProductIndex = products.findIndex(prd => prd.id == this.id);
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        products = updatedProducts;
      } else {
        this.id = new Date().getTime().toString();
        products.push(this);
      }

      fs.writeFile(p, JSON.stringify(products), err => {
        console.log('Error in Wrting Products');
      });
    };

    getProductsFromFile(writeIntoFile);

  }

  static deleteById(id) {
    getProductsFromFile(products => {
      const product = products.filter(p => p.id === id);
      const updatedProducts = products.filter(p => p.id !== id);
      fs.writeFile(p, JSON.stringify(updatedProducts), err => {
        if (err)
          console.log('Error in Wrting Products in deleteById');
        else {
          // id, product.id;
          Cart.deleteProduct(id, product.id);
        }
      });
    })
  }

  static fetchAll(cb) {
    getProductsFromFile(cb)

  }

  static findById(id, cb) {
    getProductsFromFile(products => {
      const prods = products.find(p => p.id == id);
      cb(prods);
    })

  }
};
