// Importing all the modules
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser"); // body-parser is an NPM package that parses incoming request bodies in a middleware before your handlers
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const session = require("express-session");
const mongoDBStore = require("connect-mongodb-session")(session);
const csrf = require('csurf');
const flash = require('connect-flash');

// Importing all the routes
const adminRoutes = require("./routes/admin.js");
const shopRoutes = require("./routes/shop.js");
const authRoutes = require("./routes/auth");
const errorController = require("./controllers/error.js");

// Importing all the models
const User = require("./models/user");
const Product = require("./models/product");
const { clearScreenDown } = require("readline"); // to clear the screen based on the position of the cursor

// MongoDB connection string
const MONGODB_URI =
  "mongodb+srv://adityapadwal:aditya3102@cluster0.sq1hr4c.mongodb.net/shop?retryWrites=true&w=majority";
const MONGODB_URL =
  "mongodb+srv://adityapadwal:aditya3102@cluster0.sq1hr4c.mongodb.net/shop?retryWrites=true&w=majority";

// Calling the express module or
// initializing our application
const app = express();
const store = new mongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

const csrfProtection = csrf();

// *******For ejs templating engines*******
app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));

// For static serving of pages
app.use(express.static(path.join(__dirname, "public"))); // To serve static files such as images, CSS files, and JavaScript files, use the express.static built-in middleware function in Express

// middleware for session
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
  if(!req.session.user)
  {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

// Implementing the above imported routes
app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);
app.use(errorController.get404);

// mongoDB connection
mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
