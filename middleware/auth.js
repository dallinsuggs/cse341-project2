module.exports = {
  ensureAuth: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect('/');
      exit;
    }
  },
  ensureAuth2: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.send('<p>You need to be logged in<p>')
      exit;
    }
  },
  ensureGuest: function (req, res, next) {
    if (req.isAuthenticated()) {
      res.redirect('/api-docs');
    } else {
      return next();
    }
  }
}