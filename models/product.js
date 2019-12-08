const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    cb(err ? [] : JSON.parse(fileContent));
  });
};

module.exports = class Product {
  constructor(t) {
    this.title = t;
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
};
