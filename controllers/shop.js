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

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;

  const sendProductResponse = product => {
    res.render('shop/product-detail', {
      product: product,
      pageTitle: product.title,
      path: '/products'
    });
  };

  Product.findById(prodId, sendProductResponse);
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

exports.getOrders = (req, res, next) => {

  res.render('shop/orders', {
    pageTitle: 'Your orders',
    path: '/orders'
  });
};

exports.getCheckout = (req, res, next) => {

  res.render('shop/checkout', {
    pageTitle: 'Checkout',
    path: '/checkout'
  });
};
