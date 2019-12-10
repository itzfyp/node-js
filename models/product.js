const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    cb(err ? [] : JSON.parse(fileContent));
  });
};

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
    this.id = new Date().getTime().toString();
  }

  save() {

    const writeIntoFile = products => {
      products.push(this);

      fs.writeFile(p, JSON.stringify(products), err => {
        console.log('Error in Wrting Products');
      });
    };

    getProductsFromFile(writeIntoFile);

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
