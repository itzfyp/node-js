const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {

  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  })

};

exports.postAddProduct = (req, res, next) => {
  const { title, imageUrl, price, description } = req.body;
  const product = new Product(null, title, imageUrl, description, price);
  product.save();

  res.redirect('/');

};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode)
    return res.redirect('/');

  const prodId = req.params.productId;

  Product.findById(prodId, product => {
    if (!product)
      return res.redirect('/');

    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product
    })

  });
};

exports.postEditProduct = (req, res, next) => {
  const { productId, title, imageUrl, price, description } = req.body;
  const product = new Product(productId, title, imageUrl, description, price);
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

exports.postDeleteProduct = (req, res, next) => {

  const prodId = req.body.productId;
  Product.deleteById(prodId);
  res.redirect('/admin/products');

};
