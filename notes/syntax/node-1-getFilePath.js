const path = require('path');

// If shop.html => rootFolder -> views : folder -> shop.html
const filePath = path.join(__dirname, '../', 'views', 'shop.html');

// Here we accessing file by going up from current folder {routes} to rootfolder.

// __dirname : points to current folder

// ../ : moving up to one level

// views :  folder name where files reside


//// Another way to get path

// Below code will return rootDir path

const rootDirPath = path.dirname(process.mainModule.filename);

// process : provies the path of node application in OS

// mainModule : is starting point of Node Application folder

// filename : points to starting file of node application

// After getting app.js , node finds current dir which will be the root of node app



const filePath = path.join(rootDirPath, 'views', 'shop.html');

// Here we are accessing file from root folder
