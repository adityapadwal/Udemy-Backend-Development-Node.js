// Importing express.js
const express = require("express");

// Importing the path core module
const path = require('path');

// Importing products controller
const shopController = require('../controllers/shop');

// Creating an express.js router
const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/cart', shopController.getCart);

router.get('/orders', shopController.getOrders);

router.get('/checkout', shopController.getCheckout);

module.exports = router;
