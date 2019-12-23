const Product = require('../models/product');

exports.getProducts = (req, res, next) => {

  const sendProductsResponse = products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  };

  Product.find()
    .then(sendProductsResponse)
    .catch(err => {
      console.log('Error @ Shop controller : getProducts ==>', err);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;

  const sendProductResponse = product => {
    res.render('shop/product-detail', {
      product: product,
      pageTitle: product.title,
      path: '/products'
    });
  };

  Product.findById(prodId)
    .then(sendProductResponse)
    .catch(err => {
      console.log('Error @ Shop controller : getProduct ==>', err);
    });
};

exports.getIndex = (req, res, next) => {

  const sendProductsResponse = (products) => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  };

  Product.find()
    .then(sendProductsResponse)
    .catch(err => {
      console.log('Error @ Shop controller : getIndex ==>', err);
    });
};

exports.getCart = (req, res, next) => {

  const routePath = (data = []) => {
    res.render('shop/cart', {
      pageTitle: 'Your cart',
      path: '/cart',
      products: data
    });
  }

  req.user.getCart()
    .then(products => {
      console.log('prodicts getCart', products);
      routePath(products);
    }).catch(err => {
      console.log('Error @ Shop controller : getCart Inner ==>', err);
    });

};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId)
    .then(product => {
      return req.user.addToCart(product);
    }).then(result => {
      res.redirect('/cart');
    });

  // let fetchedCart;
  // let newQuantity = 1;

  // req.user.getCart()
  //   .then(cart => {
  //     fetchedCart = cart;
  //     return cart.getProducts({ where: { id: prodId } })
  //   })
  //   .then(products => {
  //     let product;
  //     if (products.length > 0)
  //       product = products[0];

  //     if (product) {
  //       const oldQuantity = product.cartItem.quantity;
  //       newQuantity = oldQuantity + 1;
  //       return product;
  //     }

  //     return Product.findByPk(prodId);
  //   })
  //   .then(product => {
  //     return fetchedCart.addProduct(product, { through: { quantity: newQuantity } });
  //   })
  //   .then(() => {
  //     res.redirect('/cart');
  //   })
  //   .catch(err => {
  //     console.log('Error @ Shop controller : postCart ==>', err);
  //   });

};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user.deleteItemFromCart(prodId)
    .then(() => {
      res.redirect('/cart');
    })
    .catch(err => {
      console.log('Error @ Shop controller : postCart ==>', err);
    });
};

exports.postOrder = (req, res, next) => {
  req.user
    .addToOrder()
    .then(result => {
      res.redirect('/orders');
    })
    .catch(err => console.log(err));

};

exports.getOrders = (req, res, next) => {

  req.user.getOrders()
    .then(orders => {
      res.render('shop/orders', {
        pageTitle: 'Your orders',
        path: '/orders',
        orders
      });
    })
    .catch(err => console.log(err));

};
