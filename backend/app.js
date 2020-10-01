const express = require('express');

const app = express();
// big chain of middleware/funnel

app.use((req, res, next) => {
  console.log('first middleware');
  next(); // to allow it to continue
  // without next this loops again
});

app.use((req, res, next) => {
  res.send('Hello from Express');
});

module.exports = app;
//export the entire app module, incl the methods
