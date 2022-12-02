// Importing express.js
const express = require("express");

// Importing the path core module
const path = require("path");

// Importing products controller
const productsController = require('../controllers/products.js');

// Creating an express.js router
const router = express.Router();

router.get("/", productsController.getProducts);
// In the above code __dirname points to routes folder

module.exports = router;
