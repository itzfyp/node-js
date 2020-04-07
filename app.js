const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBstore = require("connect-mongodb-session")(session);

const errorController = require("./controllers/error");
const User = require("./models/user");

const MONGO_DB_URI =
  "mongodb+srv://node-complete:node-complete@cluster0-ubk2k.mongodb.net/shop";

const app = express();
const store = new MongoDBstore({
  uri: MONGO_DB_URI,
  collection: "sessions",
});

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store,
  })
);

app.use((req, res, next) => {
  if (!req.session.user) return next();

  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log("error in app user set"));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
  .connect(MONGO_DB_URI)
  .then((result) => {
    console.log("Mongo Connected...");
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "Jay",
          email: "test@test.com",
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
