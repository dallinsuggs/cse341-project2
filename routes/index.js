const routes = require('express').Router();
const express = require('express');

routes.use('/', require('./swagger'));

routes.use('/', require('./home'));

routes.use('/bucketlist', require('./bucketlist'));

routes.use(express.json());

module.exports = routes;
