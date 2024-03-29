// Importing express.js
const express = require("express");

// Importing the path core module
const path = require('path');
const { resourceLimits } = require("worker_threads");

// Importing shop controller
const shopController = require('../controllers/shop');

// Importing the middleware for route protection
const isAuth = require('../middleware/is-auth');

// Creating an express.js router
const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getProduct);

router.get('/cart', isAuth, shopController.getCart);

router.post('/cart', isAuth, shopController.postCart);

router.post('/cart-delete-item', isAuth, shopController.postCartDeleteProduct);

router.post('/create-order', isAuth, shopController.postOrder);

router.get('/orders', isAuth, shopController.getOrders);

router.get('/orders/:orderId', isAuth, shopController.getInvoice);

module.exports = router;
