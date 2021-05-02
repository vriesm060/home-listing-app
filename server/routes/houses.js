const express = require('express');
const House = require('../models/House');
const { check, validationResult } = require('express-validator');

const router = express.Router();
const validate = [
  check('title')
    .isLength({ min: 3, max: 50 })
    .withMessage('Title should be between 3 and 50 characters.'),
  check('description')
    .isLength({ min: 10, max: 200 })
    .withMessage('Description should be between 10 and 200 characters.'),
  check('address')
    .isLength({ min: 10, max: 100 })
    .withMessage('Address should be between 10 and 100 characters.'),
  check('price')
    .isNumeric()
    .withMessage('Price should be a number.'),
  check('yearBuilt')
    .isNumeric()
    .isLength(4)
    .withMessage('Built year should be written in the format YYYY.'),
];

// Create new house data
router.post('/', validate, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).send({ errors: errors.array() });

  const house = new House({
    title: req.body.title,
    address: req.body.address,
    homeType: req.body.homeType,
    description: req.body.description,
    price: req.body.price,
    image: req.body.image,
    yearBuilt: req.body.yearBuilt,
  });

  house.save()
    .then(result => {
      res.send({
        message: 'House data created successfully',
        data: result
      });
    })
    .catch(err => console.log(err));
});

// Get all houses data
router.get('/', (req, res) => {
  House.find()
    .then(result => {
      res.send(result);
    })
    .catch(err => console.log(err));
});

// Get data from a single house
router.get('/:id', (req, res) => {
  House.findById(req.params.id)
    .then(result => {
      res.send(result);
    })
    .catch(err => console.log(err));
});

// Update house data
router.put('/:id', validate, (req, res) => {
  House.findById(req.params.id)
    .then(result => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(422).send({ errors: errors.array() });

      result.title = req.body.title;
      result.address = req.body.address;
      result.homeType = req.body.homeType;
      result.description = req.body.description;
      result.priceimage = req.body.price;
      result.image = req.body.image;
      result.yearBuilt = req.body.yearBuilt;

      return result.save();
    })
    .then(result => {
      res.send(result);
    })
    .catch(err => console.log(err));
});

// Delete house data
router.delete('/:id', (req, res) => {
  House.findByIdAndRemove(req.params.id)
    .then(result => {
      res.send(result);
    })
    .catch(err => console.log(err));
});

module.exports = router;