// Import express
const express = require("express");
// Importing the path core module
const path = require("path");
// Importing body-parser
const bodyParser = require("body-parser");
// Importing Handlebars
// const expressHbs = require("express-handlebars");

// Importing adminRoutes.js from routes folder
const adminRoutes = require("./routes/admin.js");
// Importing shop.js from the routes folder
const shopRoutes = require("./routes/shop.js");

// Importing errors controller
const errorController = require("./controllers/error.js");

const sequelize = require("./util/database");

const Product = require("./models/product");
const User = require("./models/user");
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-items');

const app = express();

// app.set() allows us to set global configuration values
// ********For ejs templating engines*******
app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));

// This is for static serving of pages
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findByPk(1)
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

// ***Associations/Relations***
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });          // This will add userId to the Product table
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);                                                         // This will add userId to the cart table
Cart.belongsToMany(Product, {through: CartItem});
Product.belongsToMany(Cart, {through: CartItem});
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, {through: OrderItem});

sequelize
  // .sync({force: true})
  .sync()
  .then((result) => {
    return User.findByPk(1);
    //   console.log(result);
  })
  .then((user) => {
    if (!user) {
      return User.create({
        name: "Aditya",
        email: "aditya.padwal3102@gmail.com",
      });
    }
    return user;
  })
  .then((user) => {
    // console.log(user);
    return user.createCart();
  })
  .then((cart) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
