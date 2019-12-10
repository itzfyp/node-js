const Product = require('../models/product');

exports.getProducts = (req, res, next) => {

  const sendProductsResponse = products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  };

  Product.fetchAll(sendProductsResponse);
};

exports.getIndex = (req, res, next) => {

  const sendProductsResponse = products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  };

  Product.fetchAll(sendProductsResponse);
};

exports.getCart = (req, res, next) => {

  res.render('shop/cart', {
    pageTitle: 'Your cart',
    path: '/cart'
  });
};

exports.getCheckout = (req, res, next) => {

  res.render('shop/checkout', {
    pageTitle: 'Checkout',
    path: '/checkout'
  });
};
