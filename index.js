const express = require('express');
//const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const error = require('./utilities/error');

const app = express();
const port = 3000;


mongoose.connect('mongodb+srv://ashley773877:Justdance25@mongopractice.caagq8n.mongodb.net/?retryWrites=true&w=majority,');

// Parsing Middleware
//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json({ extended: true }));



// 404 Middleware
app.use((req, res, next) => {
  next(error(404, 'Resource Not Found'));
});

// Error-handling middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: err.message });
});

app.listen(port, () => {
  console.log(`Server listening on port: ${port}.`);
});
