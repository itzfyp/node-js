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


  /*  Product.create({
     title,
     price,
     imageUrl,
     description
   }) */
  req.user.createProduct({
    title,
    price,
    imageUrl,
    description
  })
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

  const sendProductsResponse = products => {
    let product = products[0] // only for req.user.getProducts
    if (!product)
      return res.redirect('/');

    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product
    });
  };

  // Product.findByPk(prodId)
  req.user.getProducts({ where: { id: prodId } }) // it will return array of products
    .then(sendProductsResponse)
    .catch(err => {
      console.log('Error @ Admin controller : getEditProduct ==>', err);
    });
};

exports.postEditProduct = (req, res, next) => {
  const { productId, title, imageUrl, price, description } = req.body;

  const updateProductsResponse = product => {
    product.title = title;
    product.price = price;
    product.imageUrl = imageUrl;
    product.description = description;
    return product.save();
  };

  Product.findByPk(productId)
    .then(updateProductsResponse)
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
  req.user.getProducts()
    .then(sendProductsResponse)
    .catch(err => {
      console.log('Error @ Admin controller : getProducts ==>', err);
    });
};

exports.postDeleteProduct = (req, res, next) => {

  const prodId = req.body.productId;

  const deleteProduct = product => {
    return product.destroy();
  }

  // Product.destroy({where:{id:prodId}})
  Product.findByPk(prodId)
    .then(deleteProduct)
    .then(() => {
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log('Error @ Admin controller : postDeleteProduct ==>', err);
    });

};
