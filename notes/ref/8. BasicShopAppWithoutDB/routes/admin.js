const express = require('express');

const adminController = require('../controllers/admin');

const routes = express.Router();

routes.get('/add-product', adminController.getAddProduct);

routes.get('/products', adminController.getProducts);

routes.post('/add-product', adminController.postAddProduct);

routes.get('/edit-product/:productId', adminController.getEditProduct);

routes.post('/edit-product', adminController.postEditProduct);

routes.post('/delete-product', adminController.postDeleteProduct);

module.exports = routes;
