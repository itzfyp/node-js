const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/errors');
const sequelize = require('./util/database');

const Product = require('./models/product');
const User = require('./models/user');

const app = express();


app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('views', 'views');

// Allows to access static files from given folder
const publicFolderAccess = express.static(path.join(__dirname, 'public'));
app.use(publicFolderAccess);

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);

sequelize
  // .sync({ force: true })
  .sync()
  .then(() => User.findByPk(1))
  .then(user => {
    if (!user)
      return User.create({ name: 'Jay', email: 'test@test.com' });
    return Promise.resolve(user);
  })
  .then(() => {
    // App Server starts here
    app.listen(3000)
  })
  .catch(err => {
    console.log('sequelize Error', err);
  });





