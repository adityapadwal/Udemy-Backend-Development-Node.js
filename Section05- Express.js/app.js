// Import express
const express = require("express");
// Importing the path core module
const path = require("path"); // to work on all operating systems
// Importing body-parser
const bodyParser = require("body-parser");
// Importing Handlebars
const expressHbs = require("express-handlebars");

// Importing adminRoutes.js from routes folder
const adminData = require("./routes/admin.js");
// Importing shop.js from the routes folder
const shopRoutes = require("./routes/shop.js");

// Creating an express application and putting it in a const
// by running it as a function
// this app constant also happens to be a valid request handler
const app = express();

// app.set() allows us to set global configuration values

// *********For HandleBars templating engines*********
// app.engine(
//     'hbs',
//     expressHbs({
//       layoutsDir: 'views/layout/',
//       defaultLayout: 'main-layout',
//       extname: 'hbs'
//     })
//   );
// app.set('view engine', 'hbs');

// ********For pug templating engine********
// app.set('view engine', 'pug');

// For ejs templating engines
app.set("view engine", "ejs");

app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));

// This is for static serving of pages
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "Page Not Found!", path: "" });
});

app.listen(3000);
