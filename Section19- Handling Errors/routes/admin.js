const express = require("express");

const path = require("path");

const { body } = require("express-validator");

const adminController = require("../controllers/admin");

// Importing the middleware for route protection
const isAuth = require("../middleware/is-auth");

const router = express.Router();

// get route-> /admin/add-product
router.get("/add-product", isAuth, adminController.getAddProduct);

// get route-> /admin/products
router.get("/products", isAuth, adminController.getProducts);

// post route-> /admin/add-product
router.post(
  "/add-product",
  [
        // Validating the user input
        body('title')
            .isString()
            .isLength({ min: 3 })
            .trim(),
        body('imageUrl')
            .isURL(),
        body('price')
            .isFloat(),
        body('description')
        .isLength({min: 5, max:400})
        .trim()
    ],
  isAuth,
  adminController.postAddProduct
);

// get route -> /admin/edit-product
router.get("/edit-product/:productId", isAuth, adminController.getEditProduct);

// post route -> /admin/edit-product
router.post("/edit-product", 
    [
        // Validating the user input
        body('title')
            .isString()
            .isLength({ min: 3 })
            .trim(),
        body('imageUrl')
            .isURL(),
        body('price')
            .isFloat(),
        body('description')
        .isLength({min: 5, max:400})
        .trim()
    ],
    isAuth, 
    adminController.postEditProducts);

// post route -> /admin/delete-product
router.post("/delete-product", isAuth, adminController.postDeleteProduct);

module.exports = router;
