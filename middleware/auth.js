module.exports = {
  ensureAuth: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.send('Please log in');
      exit;
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