// Importing all the modules
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const session = require("express-session");
const mongoDBStore = require("connect-mongodb-session")(session);
const csrf = require("csurf");
const flash = require("connect-flash");
const multer = require("multer");

// The uuid, or universally unique identifier,
// npm package is a secure way to generate cryptographically strong unique identifiers
// with Node. js that doesn't require a large amount of code.
const { v4: uuidv4 } = require("uuid");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// Importing all the routes
const adminRoutes = require("./routes/admin.js");
const shopRoutes = require("./routes/shop.js");
const authRoutes = require("./routes/auth");
const errorController = require("./controllers/error.js");

// Importing all the models
const User = require("./models/user");
const Product = require("./models/product");
const { clearScreenDown } = require("readline");

// MongoDB connection string
const MONGODB_URI =
  "mongodb+srv://adityapadwal:aditya3102@cluster0.sq1hr4c.mongodb.net/shop?retryWrites=true&w=majority";
// const MONGODB_URL =
// "mongodb+srv://adityapadwal:aditya3102@cluster0.sq1hr4c.mongodb.net/shop?retryWrites=true&w=majority";

// Calling the express module or
// initializing our application
const app = express();
const store = new mongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

// Initializing the csrf protection
const csrfProtection = csrf();

// *******For ejs templating engines*******
app.set("view engine", "ejs");
app.set("views", "views");

// Initializing the body-parser.
// USed for extracting the contents of the incoming requests.
app.use(bodyParser.urlencoded({ extended: false }));

// middleware for handling incoming requests for files.
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);

// For static serving of pages
app.use(express.static(path.join(__dirname, "public"))); // To serve static files such as images, CSS files, and JavaScript files, use the express.static built-in middleware function in Express
app.use('/images',express.static(path.join(__dirname, "images"))); 

// middleware for session
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

// Implementing the csrf protection
app.use(csrfProtection);
app.use(flash());

// Setting the csrf token
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

// Assigning the user with the user-request
app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      if (!user) {
        return next();
      }
      req.user = user;
      next();
    })
    .catch((err) => {
      next(new Error(err));
    });
});

// Implementing the above imported routes
app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

// /For handling any errors
app.get("/500", errorController.get404);
app.use(errorController.get500);

// Special Middleware. USing express.js error handling middleware
app.use((err, req, res, next) => {
  // res.redirect('/500');
  res.status(500).render("500", {
    pageTitle: "Error!",
    path: "/500",
    isAuthenticated: req.session.isLoggedIn,
  });
});

// mongoDB connection
mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });