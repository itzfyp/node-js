const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('views', 'views');

// Allows to access static files from given folder
const publicFolderAccess = express.static(path.join(__dirname, 'public'));
app.use(publicFolderAccess);

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res) => {
  /* const filePath = path.join(__dirname, 'views', '404.html');
  res.status(404).sendFile(filePath); */
  res.statusCode = 404;
  res.render('404', {
    pageTitle: 'Page not found',
    path: ''
  });
});

// App Server starts here
app.listen(3000)
