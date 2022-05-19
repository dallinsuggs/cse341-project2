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
  const results = connect.getCollection().find({ _id: itemId });
  results.toArray().then((documents) => {
    res.status(200).json(documents[0]);
    console.log(`Returned bucketlist item ${req.params.id}`);
  });
});

//POST 1 NEW BUCKETLIST ITEM
routes.post('/', (req, res) => {
  console.log(req.body);

  const newDoc = new Object({
    name: req.body.name,
    deadline: req.body.deadline,
    priority: req.body.priority
  });
  const result = connect.getCollection().insertOne(newDoc)
    .then(result => {
      res.json(`New listing created with the following id: ${result.insertedId}`);
    })
    .catch(error => console.error(error));
  console.log(`New listing created with the following id: ${result.insertedId}`);
});


module.exports = routes;
