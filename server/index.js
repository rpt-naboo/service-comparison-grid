const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/databaseHelpers.js');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/../client/dist'))

app.get('/henlo', function(req, res) {
  db.assembleProductList(function(){});
  res.send(200)
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});