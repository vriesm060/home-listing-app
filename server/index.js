const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

require('dotenv').config();

app.use(express.json());

const homes = [
  {
    id: 1,
    roomType: 'Duplex'
  },
  {
    id: 2,
    roomType: 'Flat'
  }
];

app.get('/', (req, res) => {
  res.send('Hello world');
});

// Get all items
app.get('/api/listing', (req, res) => {
  res.send(homes);
});

// Create item
app.post('/api/listing', (req, res) => {
  if (!req.body.roomType) return res.status(400).send('Room type is required.');

  const home = {
    id: homes.length + 1,
    roomType: req.body.roomType,
  };

  homes.push(home);
  res.send(home);
});

// Get item
app.get('/api/listing/:id', (req, res) => {
  const home = homes.find(home => home.id === parseInt(req.params.id));
  if (!home) return res.status(404).send('The home can not be found.');
  
  res.send(home);
});

// Update item
app.put('/api/listing/:id', (req, res) => {
  const home = homes.find(home => home.id === parseInt(req.params.id));
  if (!home) return res.status(404).send('The home can not be found.');

  home.roomType = req.body.roomType;
  res.send(home);
});

// Delete item
app.delete('/api/listing/:id', (req, res) => {
  const home = homes.find(home => home.id === parseInt(req.params.id));
  if (!home) return res.status(404).send('The home can not be found.');

  const index = homes.indexOf(home);
  homes.splice(index, 1);
  res.send(home);
});

app.listen(port, () => console.log(`Server is running on port ${port}`));