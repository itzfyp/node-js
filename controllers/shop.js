const Product = require('../models/product');
const Cart = require('../models/cart');

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

  const routePath = data => {
    res.render('shop/cart', {
      pageTitle: 'Your cart',
      path: '/cart',
    });
  }

  Cart.fetchAll(carts => {
    if (!carts)
      routePath([]);

    const cartIds = carts.products.reduce((av, cv) => av.push(cv.id), []);

    Product.fetchAll(products => {
      const cartData = products.reduce((av, cv) => {
        const isCartedProduct = cartIds.includes(cv.id);
        if (isCartedProduct) {
          av.push({
            qty: carts.products[cv.id].qty,
            product: carts.products[cv.id]
          });
        }
        return av;
      }, []);
      routePath(cartData);
    });
  });


};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect('/');

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
