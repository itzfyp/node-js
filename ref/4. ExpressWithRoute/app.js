const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// Allows to access static files from given folder
const publicFolderAccess = express.static(path.join(__dirname, 'public'));
app.use(publicFolderAccess);

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req, res) => {
  const filePath = path.join(__dirname, 'views', '404.html');
  res.status(404).sendFile(filePath);
});

// App Server starts here
app.listen(3000)
