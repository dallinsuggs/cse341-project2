const routes = require('express').Router();
const connect = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const bodyParser = require('body-parser');
const express = require('express');

routes.use(bodyParser.urlencoded({ extended: true }));
routes.use(express.json());

//GET ALL BUCKETLIST ITEMS
routes.get('/', (req, res) => {
  const results = connect.getCollection().find({});
  results.toArray().then((documents) => {
    res.status(200).json(documents);
    console.log('Returned ALL bucket listings')
  });
});

//GET 1 ITEM
routes.get('/:id', (req, res) => {
  const itemId = new ObjectId(req.params.id);
  const results = connect.getCollection.find({ _id: itemId });
  results.toArray().then((documents) => {
    res.status(200).json(documents[0]);
    console.log(`Returned bucketlist item ${req.params.id}`);
  });
});

//POST 1 NEW BUCKETLIST ITEM
//add code here


module.exports = routes;
