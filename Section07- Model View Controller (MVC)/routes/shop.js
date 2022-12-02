// Importing express.js
const express = require("express");

const rootDir = require("../util/path"); // to work on all operating systems
const adminData = require("./admin.js");

// Importing the path core module
const path = require("path");

// Creating an express.js router
const router = express.Router();

router.get("/", (req, res, next) => {
  const products = adminData.products;
  res.render("shop", {
    prods: products,
    pageTitle: "Shop",
    path: "/",
    hasProducts: products.length > 0,
    activeShop: true,
    productCSS: true,
    // layout: false
  });
  // console.log(products);
});
// In the above code __dirname points to routes folder

module.exports = router;
