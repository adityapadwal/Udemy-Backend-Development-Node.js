const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const adminRoutes = require("./routes/admin.js");
const shopRoutes = require("./routes/shop.js");

const errorController = require("./controllers/error.js");

const mongoConnect = require('./util/database').mongoConnect;

const User = require('./models/user');
const Product = require('./models/product');
const { clearScreenDown } = require("readline");


const app = express();

// ********For ejs templating engines*******
app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));

// For static serving of pages
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById('6401a498742f7a53e87460bc')
    .then((user) => {
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoConnect(() => {
  app.listen(3000);
  console.log('Backend server is running!');
})
