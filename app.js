const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


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
  User.findById('5e00b4eea2cb286b95d105d3')
    .then(user => {
      req.user = user;
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

mongoose
  .connect('mongodb+srv://node-complete:node-complete@cluster0-ubk2k.mongodb.net/shop?retryWrites=true')
  .then(result => {
    User
      .findOne()
      .then(user => {
        if (!user) {
          const user = new User({
            name: 'Jay',
            email: 'test@test.com',
            cart: {
              items: []
            }
          });
          user.save();
        }
      });
    console.log('Mongo connected.');
    app.listen(3000)
  })
  .catch(err => {
    console.log('Error @ mongo db connect', err);
  })










