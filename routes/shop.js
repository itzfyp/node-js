
const express = require('express');

const shopController = require('../controllers/shop');

const routes = express.Router();

routes.get('/', shopController.getIndex);

routes.get('/products', shopController.getProducts);

routes.get('/products/:productId', shopController.getProduct);

routes.get('/cart', shopController.getCart);

routes.post('/cart', shopController.postCart);

routes.post('/cart-delete-item', shopController.postCartDeleteProduct);

routes.post('/create-order', shopController.postOrder);

routes.get('/orders', shopController.getOrders);


module.exports = routes;
