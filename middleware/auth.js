module.exports = {
  ensureAuth: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.render('login', {
        layout: 'login',
      })
      exit;
    }
  },
  ensureGuest: function (req, res, next) {
    if (req.isAuthenticated()) {
      res.redirect('/api-docs');d
    } else {
      return next();
    }
  }
}