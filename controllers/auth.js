const User = require('../models/user');

exports.getLogin = (req, res, next) => {

  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthendicated: req.session.isLoggedIn
  });
};

exports.postLogin = (req, res, next) => {
  User.findById('5e00b4eea2cb286b95d105d3')
    .then(user => {
      req.session.user = user;
      req.session.isLoggedIn = true;
      req.session.save(err => {
        res.redirect('/');
      })
    })
    .catch(err => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect('/');
  })
};

