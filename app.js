const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');


const mongoConnect = require('./util/database');

/* const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop'); */
const errorController = require('./controllers/errors');


const app = express();


app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('views', 'views');

// Allows to access static files from given folder
const publicFolderAccess = express.static(path.join(__dirname, 'public'));

/* app.use((req, res, next) => {
  User.findByPk(1)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => {
      console.log('Error @App : User Registering');
    })
}); */
app.use(publicFolderAccess);

/* app.use('/admin', adminRoutes);
app.use(shopRoutes); */
app.use(errorController.get404);


mongoConnect(client => {
  console.log('client', client);

  // App Server starts here
  app.listen(3000)
});








