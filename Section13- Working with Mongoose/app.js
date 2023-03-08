const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");

const adminRoutes = require("./routes/admin.js");
const shopRoutes = require("./routes/shop.js");

const errorController = require("./controllers/error.js");

const User = require("./models/user");
const Product = require("./models/product");
const { clearScreenDown } = require("readline");

const app = express();

// ********For ejs templating engines*******
app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));

// For static serving of pages
app.use(express.static(path.join(__dirname, "public")));

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

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    "mongodb+srv://adityapadwal:aditya3102@cluster0.sq1hr4c.mongodb.net/shop?retryWrites=true&w=majority"
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
