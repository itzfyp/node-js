const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {

  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  })

};

exports.postAddProduct = (req, res, next) => {
  const { title, price, imageUrl, description } = req.body;

  const productRef = new Product(title, price, description, imageUrl, null, req.user._id);
  productRef.save()
    .then(() => {
      res.redirect('/admin/products');
    }).catch(err => {
      console.log('Erro @ Admin controller : postAddProduct ==>', err);
    });

};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode)
    return res.redirect('/');

  const prodId = req.params.productId;

  const sendProductsResponse = product => {
    if (!product)
      return res.redirect('/');

    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product
    });
  };

  Product.findByPk(prodId)
    .then(sendProductsResponse)
    .catch(err => {
      console.log('Error @ Admin controller : getEditProduct ==>', err);
    });
};

exports.postEditProduct = (req, res, next) => {

  const { title, price, imageUrl, description, productId } = req.body;

  const productRef = new Product(title, price, description, imageUrl, productId);

  productRef.save()
    .then(() => {
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log('Error @ Admin controller : postEditProduct ==>', err);
    });
};

exports.getProducts = (req, res, next) => {

  const sendProductsResponse = products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  };

  // Product.findAll()
  Product.fetchAll()
    .then(sendProductsResponse)
    .catch(err => {
      console.log('Error @ Admin controller : getProducts ==>', err);
    });
};

exports.postDeleteProduct = (req, res, next) => {

  const prodId = req.body.productId;

  Product.deleteById(prodId)
    .then(() => {
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log('Error @ Admin controller : postDeleteProduct ==>', err);
    });

};
