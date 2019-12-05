const path = require('path');
const express = require('express');

const routes = express.Router();

routes.get('/', (req, res, next) => {
  const filePath = path.join(__dirname, '../', 'views', 'shop.html');
  res.sendFile(filePath);
});

module.exports = routes;
