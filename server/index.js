require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/databaseHelpers.js');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../client/dist'))

app.get('/random', function(req, res) {
  db.assembleProductList(function(result){
    console.log(result);
   	//remember this data is already formatted correctly
    res.json(result);
  });
});

app.listen(process.env.PORT, function() {
  console.log('listening on port 3000!');
});