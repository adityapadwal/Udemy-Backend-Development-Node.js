const express = require('express');

const path = require('path');

const adminController = require('../controllers/admin');

const router = express.Router();

// get route-> /admin/add-product
router.get('/add-product', adminController.getAddProduct); 

// get route-> /admin/products
router.get('/products', adminController.getProducts); 

// post route-> /admin/add-product
router.post('/add-product', adminController.postAddProduct);

// get route -> /admin/edit-product
router.get('/edit-product/:productId', adminController.getEditProduct);

// post route -> /admin/edit-product
router.post('/edit-product', adminController.postEditProducts);

// post route -> /admin/delete-product
router.post('/delete-product', adminController.postDeleteProduct);

module.exports = router;

