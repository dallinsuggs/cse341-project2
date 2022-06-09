module.exports = {
  ensureAuth: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect('/');
    }
  },
  ensureAuth2: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.status(401);
      res.send('Please log in at https://cse341-project2-suggs.herokuapp.com/');
    }
  },
  ensureGuest: function (req, res, next) {
    if (req.isAuthenticated()) {
      res.redirect('/dashboard');
    } else {
      return next();
    }
  }
}