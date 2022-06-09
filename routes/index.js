const routes = require('express').Router();
const express = require('express');
const {ensureAuth, ensureGuest } = require('../middleware/auth');

// @desc Login/Landing page
// @route GET /
routes.get('/', ensureGuest, (req, res) => {
  res.render('login', {
    layout: 'login',
  });
});

// @desc Api-docs
// @route GET /api-docs
routes.get('/api-docs', ensureAuth, async (req, res) => {
  if (!req.isAuthenticated) {
    console.log("You can't view this page");
    res.render('login', {
      layout: 'login',
    });
  } else {
    res.render('api-docs');
  }
});

routes.use('/auth', require('./auth'));

routes.use('/', require('./swagger'));

routes.use('/', require('./home'));

routes.use('/bucketlist', require('./bucketlist'));

routes.use(express.json());

module.exports = routes;
