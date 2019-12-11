const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
);


module.exports = class Cart {

  static addProduct(id, productPrice) {

    fs.readFile(p, (err, fileContent) => {

      let cart = {
        products: [],
        totalPrice: 0
      };

      if (!err)
        cart = JSON.parse(fileContent);

      const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
      const existingProduct = cart.products[existingProductIndex];


      if (existingProduct) {
        existingProduct.qty += 1
      }
      else {
        const newProduct = {
          id,
          qty: 1
        };
        cart.products.push(newProduct);
      }

      cart.totalPrice += +productPrice;

      fs.writeFile(p, JSON.stringify(cart), err => {
        console.log('cart writing error');
      })

    });

  }

}
