const path = require('path');
const express = require('express');


const adminData = require('./admin');

const routes = express.Router();

routes.get('/', (req, res, next) => {
  console.log(adminData.products);
  /* const filePath = path.join(__dirname, '../', 'views', 'shop.html');
  res.sendFile(filePath); */

  res.render('shop', {
    prods: adminData.products,
    pageTitle: 'Shop',
    path: '/'
  });
});

module.exports = routes;
