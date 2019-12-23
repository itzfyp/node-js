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

  const productRef = new Product({
    title,
    price,
    description,
    imageUrl,
    userId: req.user // req.user._id
  });

  productRef
    .save()
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

  Product.findById(prodId)
    .then(sendProductsResponse)
    .catch(err => {
      console.log('Error @ Admin controller : getEditProduct ==>', err);
    });
};

exports.postEditProduct = (req, res, next) => {

  const { title, price, imageUrl, description, productId } = req.body;

  Product
    .findById(productId)
    .then(product => {

      product.title = title;
      product.price = price;
      product.imageUrl = imageUrl;
      product.description = description;

      return product.save()
    })
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

  Product
    .find()
    // this will select or populate given filed ony, -{filedName} - will be omitted from response
    // .select('title price -_id')
    // .populate('userId', 'name')
    .then(sendProductsResponse)
    .catch(err => {
      console.log('Error @ Admin controller : getProducts ==>', err);
    });
};

exports.postDeleteProduct = (req, res, next) => {

  const prodId = req.body.productId;

  Product.findByIdAndRemove(prodId)
    .then(() => {
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log('Error @ Admin controller : postDeleteProduct ==>', err);
    });

};
