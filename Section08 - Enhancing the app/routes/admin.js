// Importing express
const express = require('express');

// Importing the path core module
const path = require('path');

// Importing products controller
const adminController = require('../controllers/admin');

// creating a router
const router = express.Router();

// This will match to /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct); 

// This will match to /admin/products => GET
router.get('/products', adminController.getProducts); 


// This will match to /admin/add-product => POST
router.post('/add-product', adminController.postAddProduct);

module.exports = router;

