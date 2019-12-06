const express = require('express');


// this will act as mini express
// later it will collabarated with manin express file and act together
const routes = express.Router();

routes.use('/add-product', (req, res, next) => {

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

// How it will be used in app.js


const adminRoutes = require('./routes/admin');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(adminRoutes);
