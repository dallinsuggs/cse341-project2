const routes = require('express').Router();
const connect = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const bodyParser = require('body-parser');
const express = require('express');

routes.use(bodyParser.urlencoded({ extended: true }));
routes.use(express.json());
const {ensureAuth, ensureAuth2, ensureGuest } = require('../middleware/auth');

//GET ALL BUCKETLIST ITEMS
routes.get('/', ensureAuth2, (req, res) => {
  res.send('Req.isAuthenticated: ' + req.isAuthenticated());
  try {
    const results = connect.getCollection().find({});
    results.toArray()
      .then((documents) => {
        res.status(200).json(documents);
        console.log('Returned ALL bucket listings')
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred with accessing the database.'
        });
      });
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET 1 ITEM
routes.get('/:id', (req, res) => {
  try {
    const itemId = new ObjectId(req.params.id);
    const results = connect.getCollection().find({ _id: itemId });
    results.toArray()
      .then((documents) => {
        res.status(200).json(documents[0]);
        console.log(`Returned bucketlist item ${req.params.id}`);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred with accessing the database.'
        });
      });
  } catch (err) {
    res.status(500).json(err);
  }
});

//POST 1 NEW BUCKETLIST ITEM
routes.post('/', (req, res) => {
  try {
    if (!req.body.name || !req.body.deadline || !req.body.priority || !req.body.description || !req.body.plan || !req.body.links || !req.body.notes) {
      res.status(400).send({ message: 'Content cannot be empty!' });
      return;
    }
    if (typeof req.body.name != 'string' || req.body.name.length < 3) {
      res.status(400).send({ message: 'Bucketlist item name must be a string at least 3 characters long!' });
      return;
    }
    if (isNaN(req.body.deadline) || req.body.deadline.length != 4) {
      res.status(400).send({ message: 'Item deadline must be a valid 4-digit number (year).' });
      return;
    }
    if (isNaN(req.body.priority) || req.body.priority < 0) {
      res.status(400).send({ message: 'Item priority has to be a number greater than or equal to 0.' });
      return;
    }
    if (typeof req.body.description != 'string' || req.body.description.length < 5) {
      res.status(400).send({ message: 'Bucketlist item description must be a string at least 5 characters long!' });
      return;
    }
    if (typeof req.body.plan != 'string' || req.body.name.plan < 5) {
      res.status(400).send({ message: 'Bucketlist item description must be a string at least 5 characters long!' });
      return;
    }
    const newDoc = new Object({
      name: req.body.name,
      deadline: req.body.deadline,
      priority: req.body.priority,
      description: req.body.description,
      plan: req.body.plan,
      links: req.body.links,
      notes: req.body.notes
    });
    const result = connect.getCollection().insertOne(newDoc)
      .then(result => {
        res.json(`New listing created with the following id: ${result.insertedId}`);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while creating a new listing.'
        });
      });
  } catch (err) {
    res.status(500).json(err);
  }
});

//PUT UPDATE TO CONTACT
routes.put('/:id', (req, res) => {
  try {
    if (!req.body.name || !req.body.deadline || !req.body.priority || !req.body.description || !req.body.plan || !req.body.links || !req.body.notes) {
      res.status(400).send({ message: 'Content cannot be empty!' });
      return;
    }
    if (typeof req.body.name != 'string' || req.body.name.length < 3) {
      res.status(400).send({ message: 'Bucketlist item name must be a string at least 3 characters long!' });
      return;
    }
    if (isNaN(req.body.deadline) || req.body.deadline.length != 4) {
      res.status(400).send({ message: 'Item deadline must be a valid 4-digit number (year).' });
      return;
    }
    if (isNaN(req.body.priority) || req.body.priority < 0) {
      res.status(400).send({ message: 'Item priority has to be a number greater than or equal to 0.' });
      return;
    }
    if (typeof req.body.description != 'string' || req.body.description.length < 5) {
      res.status(400).send({ message: 'Bucketlist item description must be a string at least 5 characters long!' });
      return;
    }
    if (typeof req.body.plan != 'string' || req.body.name.plan < 5) {
      res.status(400).send({ message: 'Bucketlist item description must be a string at least 5 characters long!' });
      return;
    }
    const itemId = new ObjectId(req.params.id);
    const newDoc = new Object(req.body);
    connect.getCollection().replaceOne({ _id: itemId }, newDoc)
      .then(result => {
        res.json(`Updated listing for id ${req.params.id}`);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while updating the listing.'
        });
      });
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE CONTACT
routes.delete('/:id', (req, res) => {
  try {
    const itemId = new ObjectId(req.params.id);
    connect.getCollection().deleteOne({ _id: itemId })
      .then(result => {
        res.json(`Deleted listing id ${req.params.id}`);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while deleting the listing.'
        });
      });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = routes;
