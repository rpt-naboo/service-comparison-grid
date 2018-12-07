const mysql = require('mysql');

const connection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password: 'password',
  database: 'comparison_grid_cat'
});

connection.connect(function(err) {
  if (err) {
    throw err;
  } else {
    console.log("database connected");
  }
});

module.exports.connection = connection