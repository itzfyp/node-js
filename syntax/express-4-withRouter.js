const express = require('express');

// This will act as mini express app
// We gonna do same setup for middlware that we done with express

const routes = express.Router();

routes.get('/add-product', (req, res, next) => {

  res.send(`<form action="/product" method="POST">
              <input type="text" name="title"/>
              <button type="submit">Add Product</button>
            </form>`
  );
});

routes.post('/product', (req, res, next) => {
  console.log(req.body);
  res.redirect('/');
});

module.exports = routes;

// app.js

// How to use this routes;
