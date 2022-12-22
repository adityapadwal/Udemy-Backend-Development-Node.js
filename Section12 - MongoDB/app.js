const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const mongoConnect = require('./util/database');

const adminRoutes = require("./routes/admin.js");
// const shopRoutes = require("./routes/shop.js");

// Importing errors controller
const errorController = require("./controllers/error.js");

const app = express();

// app.set() allows us to set global configuration values
// ********For ejs templating engines*******
app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));

// for static serving of pages
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  // User.findByPk(1)
  //   .then((user) => {
  //     req.user = user;
  //     next();
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
});

app.use("/admin", adminRoutes);
// app.use(shopRoutes);

// app.use(errorController.get404);

mongoConnect(() => {
  app.listen(3000);
});