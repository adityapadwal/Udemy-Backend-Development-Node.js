// Importing the user model
const User = require("../models/user");
// /Importing the bcrypt module
const bcrypt = require('bcryptjs');

exports.getLogin = (req, res, next) => {
  // const isLoggedIn = req
  // .get("Cookie")
  // .split(":")[0]
  // .trim()
  // .split("=")[1] === 'true';
  console.log(req.session.isLoggedIn);
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: false,
  });
};

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    isAuthenticated: false
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({email: email})
  .then((user) => {
    if(!user) {
      // User with the entered email dos not exist
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
    })
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
