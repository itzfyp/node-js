const express = require('express');

const productsController = require('../controllers/products');

const routes = express.Router();

routes.get('/add-product', productsController.getAddProduct);

routes.post('/add-product', productsController.postAddProduct);

module.exports = routes;
