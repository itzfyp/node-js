const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');


const mongoConnect = require('./util/database').mongoConnect;

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/errors');

const User = require('./models/user');


const app = express();


app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('views', 'views');

// Allows to access static files from given folder
const publicFolderAccess = express.static(path.join(__dirname, 'public'));

app.use((req, res, next) => {
  User.findById('5dfdf1b31c9d440000faef95')
    .then(user => {
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch(err => {
      console.log('Error @App : User Registering');
    })
});
app.use(publicFolderAccess);

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);


mongoConnect(() => {
  // App Server starts here
  app.listen(3000)
});








