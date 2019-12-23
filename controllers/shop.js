const Product = require('../models/product');
const Order = require('../models/order');

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

  req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
      const products = user.cart.items;
      routePath(products);
    }).catch(err => {
      console.log('Error @ Shop controller : getCart Inner ==>', err);
    });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then(product => {
      return req.user.addToCart(product);
    }).then(result => {
      res.redirect('/cart');
    });

};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user.removeFromCart(prodId)
    .then(() => {
      res.redirect('/cart');
    })
    .catch(err => {
      console.log('Error @ Shop controller : postCart ==>', err);
    });
};

exports.postOrder = (req, res, next) => {

  req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {

      const products = user.cart.items.map(i => {
        return { quantity: i.quantity, product: { ...i.productId._doc } };
      });

      const order = new Order({
        user: {
          name: req.user.name,
          userId: req.user._id
        },
        products
      });

      return order.save();
    })
    .then(result => {
      return req.user.clearCart();
    })
    .then(result => {
      res.redirect('/orders');
    })
    .catch(err => console.log(err));

};

exports.getOrders = (req, res, next) => {

  Order
    .find({ 'user.userId': req.user._id })
    .then(orders => {
      res.render('shop/orders', {
        pageTitle: 'Your orders',
        path: '/orders',
        orders
      });
    })
    .catch(err => console.log(err));

};
