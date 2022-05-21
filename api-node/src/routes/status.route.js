const express = require('express');
const statusRoute = express.Router();

statusRoute.get('/status', function(req, res) {
  res.status(200).send({ foo: 'Sucesso' });
});

module.exports = statusRoute;