// Importing express
const express = require("express");

// Importing the path core module
const path = require("path");

// Importing products controller
const productsController = require('../controllers/products.js');

// creating a router
const router = express.Router();

// This will match to /admin/add-product => GET
router.get("/add-product", productsController.getAddProducts); // __dirname points to the routes folder

// This will match to /admin/add-product => POST
router.post("/add-product", productsController.postAddProducts);

module.exports = router;

