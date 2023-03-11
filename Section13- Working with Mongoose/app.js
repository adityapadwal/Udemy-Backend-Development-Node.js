// Importing all the modules
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");  // body-parser is an NPM package that parses incoming request bodies in a middleware before your handlers
const mongoose = require("mongoose");

// Inporting all the routes
const adminRoutes = require("./routes/admin.js");
const shopRoutes = require("./routes/shop.js");
const errorController = require("./controllers/error.js");

// Importing all the models
const User = require("./models/user");
const Product = require("./models/product");
const { clearScreenDown } = require("readline"); // to clear the screen based on the position of the cursor

// Calling the express module or 
// initializing our application
const app = express();

// *******For ejs templating engines*******
app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));

// For static serving of pages
app.use(express.static(path.join(__dirname, "public")));  // To serve static files such as images, CSS files, and JavaScript files, use the express.static built-in middleware function in Express

app.use((req, res, next) => {
  User.findById("6408746d3449932804477d0c")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

// Implementing the above imported routes 
app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

// mongoDB connection
mongoose
  .connect(
    "mongodb+srv://adityapadwal:aditya3102@cluster0.sq1hr4c.mongodb.net/shop?retryWrites=true&w=majority"   //mongoDB Connection String 
  )
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "Aditya Padwal",
          email: "aditya.padwal3102@gmail.com",
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
