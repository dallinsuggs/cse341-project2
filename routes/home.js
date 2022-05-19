const routes = require('express').Router();

routes.get('/', (req, res) => {
  res.send('Hello!!! You\'re home!!!');
});

module.exports = routes;
