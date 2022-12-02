// Importing express
const express = require("express");

const rootDir = require("../util/path"); // to work on all operating systems

// Importing the path core module
const path = require("path");

// creating a router
const router = express.Router();

const products = [];

// This will match to /admin/add-product => GET
router.get("/add-product", (req, res, next) => {
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
}); // __dirname points to the routes folder

// This will match to /admin/add-product => POST
router.post("/add-product", (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect("/");
});

// module.exports = router;
exports.routes = router;
exports.products = products;
