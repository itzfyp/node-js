// Import express : which return a function
const express = require('express');

// if we call express returned function, which will return express Object
const app = express();


// express listen method will create server internally using core HTTP module
// assigning our parms like port into createServer method
app.listen(3000)
