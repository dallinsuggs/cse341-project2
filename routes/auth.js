const routes = require('express').Router();
const express = require('express');
const passport = require('passport')

// @desc Auth with Google
// @route GET /auth/google
routes.get('/google', passport.authenticate('google', { scope: ['profile'] }))

// @desc Google auth callback
// @route GET /auth/google/callback
routes.get('/google/callback', passport.authenticate('google', { failureRedirect: '/'}), (req, res) => {
  res.redirect('/api-docs');
  res.send('Req.isAuthenticated: ' + req.isAuthenticated());
})

// @desc Logout user
// @route /auth/logout
routes.get('/logout', (req, res) => {
  req.logout(req.user, err => {
    if(err) return next(err);
    res.redirect("/");
  });
})

module.exports = routes;