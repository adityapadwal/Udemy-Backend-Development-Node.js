// Importing express.js
const express = require("express");

// Importing the path core module
const path = require('path');
const { resourceLimits } = require("worker_threads");

// Importing products controller
const shopController = require('../controllers/shop');

// Creating an express.js router
const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getProduct);

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);

router.post('/cart-delete-item', shopController.postCartDeleteProduct);

router.post('/create-order', shopController.postOrder);

router.get('/orders', shopController.getOrders);

// router.get('/checkout', shopController.getCheckout);

module.exports = router;
