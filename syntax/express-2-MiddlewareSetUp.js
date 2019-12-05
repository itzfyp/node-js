// if we call express returned function, which will return express Object
const app = express();

// express Object has lots of utilities and functions

//Below express function used to register MiddlerWare
// Middleware is a function where we can do our logic on for our request
// express will call this middleware on each req.

app.use((req, res, next) => {

  // next is a function provided by express, which allows to continue to run next middleware for a request
  // if we didnt declare next method, upcoming middlewares would not be called. Browser will spin without any response
  next();

});
app.use((req, res, next) => {

  // send methods provided by express to send response back. We can pass anything we want
  // if we didnt set headers, express will set default headers based on response type
  res.send('<script>alert("welcome")</script>');
});
