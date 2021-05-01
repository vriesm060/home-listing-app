const mongoose = require('mongoose');

const HouseSchema = new mongoose.Schema({
  title:        { type: String, required: true },
  address:      { type: String, required: true },
  homeType:     { type: String },
  description:  { type: String },
  price:        { type: Number, required: true },
  image:        { type: String },
  yearBuilt:    { type: Number },
});

module.exports = mongoose.model('House', HouseSchema);