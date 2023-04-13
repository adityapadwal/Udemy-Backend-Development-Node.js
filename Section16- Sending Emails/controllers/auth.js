// Importing the user model
const User = require("../models/user");
// /Importing the bcrypt module
const bcrypt = require('bcryptjs');
// Importing the nodemailer module
const nodemailer = require('nodemailer');
// Importing the sendgrid-transport module
const sendgridTransport = require('nodemailer-sendgrid-transport');

const transporter = nodemailer.createTransport(sendgridTransport({
  auth: {
    api_key: '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',
  }
}));

exports.getLogin = (req, res, next) => {
  let message = req.flash('error');
  if(message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  console.log(req.session.isLoggedIn);
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    errorMessage: message,
  });
};

exports.getSignup = (req, res, next) => {
  let message = req.flash('error');
  if(message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    errorMessage: message
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({email: email})
  .then((user) => {
    if(!user) {
      // User with the entered email dos not exist
      req.flash('error', 'Invalid EMAIL or password.');
      return res.redirect('/login');
    }

    // This means that the user with entered email exists in the database
    // Hence we validate the password

    bcrypt.compare(password, user.password)
    .then((doMatch) => {
      // We enter this then block both, in the matching and the non-matching state
      if(doMatch) {
        // password has matched
        req.session.isLoggedIn = true;
        req.session.user = user;
        return req.session.save((err) => {
          console.log(err);
          res.redirect('/');
        });
      }
      // password did not match. User entered an invalid password 
      req.flash('error', 'Invalid email or PASSWORD.');
      res.redirect('/login');
    })
    .catch((err) => {
      console.log(err);
      res.redirect('/login');
    });
  })
  .catch((err) => {
    console.log(err);
  })
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  // Finding out if a user already exists
  User.findOne({email: email})
  .then((userDoc) => {
    if(userDoc) {
      // User already exists. 
      req.flash('error', 'Email exits already! Please pick a different one.');
      return res.redirect('/signup');
    }
    if(password !== confirmPassword) {
      req.flash('error', 'Passwords did not match! Please try again');
      return res.redirect('/signup');
    }
    // User does not exist. Hence creating a new user
    return bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
      const user = new User({
        email: email,
        password: hashedPassword,
        cart: {items: []},
      });
      return user.save();
    })
    .then((result) => {
      res.redirect('/login');
      return transporter.sendMail({
        to: email,
        from: 'aditya.padwal3102@gmail.com',
        subject: 'SignUp Successfull!',
        html: '<h1> You have successfully signed Up. Enjoy the experience! </h1>'
      });
    })
    .catch((err) => {
      console.log(err);
    });
  })
  .catch((err) => {
    console.log(err);
  });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect('/');
  });
};
