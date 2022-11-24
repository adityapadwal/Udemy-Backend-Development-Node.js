// Importing express
const express = require("express");

const rootDir = require('../util/path'); // to work on all operating systems

// Importing the path core module
const path = require('path'); 

// creating a router
const router = express.Router();

// This will match to /admin/add-product => GET
router.get("/add-product", (req, res, next) => {
  res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
}); // __dirname points to the routes folder

// This will match to /admin/add-product => POST
router.post("/add-product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

module.exports = router;
