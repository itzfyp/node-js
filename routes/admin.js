const path = require('path');
const express = require('express');

const rootDir = require('../util/rootDirPath');

const routes = express.Router();

routes.get('/add-product', (req, res, next) => {

  const filePath = path.join(rootDir, 'views', 'add-product.html');
  res.sendFile(filePath);
});

routes.post('/add-product', (req, res, next) => {
  console.log(req.body);
  res.redirect('/');
});

module.exports = routes;
