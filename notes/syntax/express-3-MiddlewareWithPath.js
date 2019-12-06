// if we call express returned function, which will return express Object
const app = express();

// we can set path for middleware like below

// this middleware will be called for all request
// whether / or /add-product or /message

app.use('/', (req, res, next) => {
  next();
});

// this middleware will be called only if path starts with /add-product
app.use('/add-product', (req, res, next) => {
  res.send('<script>alert("welcome")</script>');
});

//Above method will be accessed by path keyword regardless of methods, it doesnt consider about get /post / other methods

// if we want to set methods for middlewares, apply get / post/ other methods than use() like below

// For Get
app.get('/add-product', (req, res, next) => {

  res.send(`<form action="/product" method="POST">
              <input type="text" name="title"/>
              <button type="submit">Add Product</button>
            </form>`
  );
});

//For Post
app.post('/product', (req, res, next) => {
  console.log(req.body);
  res.redirect('/');
});

// if we have path as / and get or post or others method, below middleware will be called only if match is exact, otherwise it will not call 

// /add-product or /someting will trigger this middleware
app.get('/', (req, res, next) => {
  next();
});


