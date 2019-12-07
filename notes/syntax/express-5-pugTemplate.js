
// Intialize Template with express

const app = express();

// set allows to set more options, It will be key : value pair

// Here we are telling to express use pug as default view engine
app.set('view engine', 'pug');

// Here we are setting template folder to find template 
app.set('views', 'views');


// At module where we are going to send template with binded data, we have to use below way to render it

// use render function rather than sendFile
// it will render template with passed object data
res.render('shop', {
  prods: adminData.products,
  pageTitle: 'Shop',
  path: '/'
});
