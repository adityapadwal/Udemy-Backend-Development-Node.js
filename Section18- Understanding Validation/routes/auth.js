const express = require("express");

const { check, body, validationResult } = require("express-validator");

const authController = require("../controllers/auth");

const User = require("../models/user");

const router = express.Router();

router.get("/login", authController.getLogin);

router.get("/signup", authController.getSignup);

router.post(
  '/login',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email address.')
      .normalizeEmail(),
    body('password', 'Password has to be valid.')
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim()
  ],
  authController.postLogin
);

router.post(
  "/signup",
  [
    check("email")
    .isEmail()
    .withMessage("Please Enter a valid Email.")
    // adding custom validation
    .custom((value, {req}) => {
      // if(value === "20510192.dypit@dypvp.edu.in") {
      //   throw new Error("This email address is forbidden.");
      // }
      // return true;
      return User.findOne({ email: value })
      .then((userDoc) => {
        if (userDoc) {
          // User already exists.
          return Promise.reject('Email exits already! Please pick a different one.');
        };
      });
    })
    .normalizeEmail(),
    // validator to check the length of the password
    body("password", "Password length less than 8 characters")
    .isLength({ min: 8, max: 30 })
    .isAlphanumeric()
    .trim(),

    // validator for equality of password and confirm password
    body("confirmPassword")
    .trim()
    .custom((value, {req}) => {
      if(value !== req.body.password)
      {
        throw new Error("Passwords did not match!");
      }
      return true;
    }),
  ],
  authController.postSignup
);

router.post("/logout", authController.postLogout);

router.get("/reset", authController.getReset);

router.post("/reset", authController.postReset);

router.get("/reset/:token", authController.getNewPassword);

router.post("/new-password", authController.postNewPassword);

module.exports = router;
