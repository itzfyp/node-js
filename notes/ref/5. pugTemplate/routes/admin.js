const path = require('path');
const express = require('express');

const rootDir = require('../util/rootDirPath');

const routes = express.Router();

const products = [];

routes.get('/add-product', (req, res, next) => {

  /*  const filePath = path.join(rootDir, 'views', 'add-product.html');
   res.sendFile(filePath); */

  res.render('add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product'
  })
});

routes.post('/add-product', (req, res, next) => {
  products.push({
    title: req.body.title
  });
  res.redirect('/');
});

exports.routes = routes;
exports.products = products;
