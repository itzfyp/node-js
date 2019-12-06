
const path = require('path');
const express = require('express');

const app = express();

// Allows to access static files from given folder
const publicFolderAccess = express.static(path.join(__dirname, 'public'));
app.use(publicFolderAccess);

// we can add more static path into app like below
const staticJSFolderAccess = express.static(path.join(__dirname, 'lib'));
app.use(staticJSFolderAccess);

const imageFolderAccess = express.static(path.join(__dirname, 'images'));
app.use(imageFolderAccess);

const fontsFolderAccess = express.static(path.join(__dirname, 'fonts'));
app.use(fontsFolderAccess);
