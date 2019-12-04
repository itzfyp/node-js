const requestHandler = () => { };

//--------------------------------------------------
//1. single export :
module.exports = requestHandler;

//1. import
const routes = require('./routes');

//--------------------------------------------------
//2. multiple export
module.exports = {
  handler: requestHandler,
  someText: 'Some hard coded text'
};

//2. import
const routes = require('./routes');
routes.someText
routes.handler


//--------------------------------------------------
//3. explicit export
module.exports.handler = requestHandler;
module.exports.someText = 'Some hard coded text';

// Above {3. export} is same as 2.export, just we are expilitly exporting. Apart from that import is same as 2.import


//--------------------------------------------------
//4. export
exports.handler = requestHandler;
exports.someText = 'Some hard coded text';

// we can omit module syntax. Only explit exports will support like 3. export


//--------------------------------------------------
// Bad syntax
exports = requestHandler
exports = {
  handler: requestHandler,
  someText: 'Some hard coded text'
};

//--------------------------------------------------

// NOTE :

// Exporting text will cached. Adding props dynamically outside of module will not affect module code

// const routes = require('./routes');
// routes.newProp = 'adding new prop outside'

// This will not be added into module. bz its frozen.
