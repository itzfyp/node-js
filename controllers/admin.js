const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {

  res.render('admin/add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product'
  })

};

exports.postAddProduct = (req, res, next) => {
  const { title, imageUrl, price, description } = req.body;
  const product = new Product(title, imageUrl, description, price);
  product.save();

  res.redirect('/');

};

exports.getProducts = (req, res, next) => {

  const sendProductsResponse = products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  };

  Product.fetchAll(sendProductsResponse);
};