require('dotenv').config();

const port = process.env.PORT || 3000;
const mongoUsername = encodeURIComponent(process.env.MONGODB_USERNAME);
const mongoPassword = encodeURIComponent(process.env.MONGODB_PASSWORD);

const express = require('express');
const mongoose = require('mongoose');
const houses = require('./routes/houses');

const app = express();

app.use(express.json());
app.use('/api/houses', houses);

mongoose.connect(`mongodb+srv://${mongoUsername}:${mongoPassword}@reactnativecoursecluste.uxith.mongodb.net/house_listing_app?retryWrites=true&w=majority`)
  .then(result => {
    app.listen(port, () => console.log(`Server is running on port ${port}`));
  })
  .catch(err => console.log(err));
