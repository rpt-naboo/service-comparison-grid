require('dotenv').config();
const mysql = require('mysql');

const connection = mysql.createConnection({
  host : process.env.DB_HOST,
  user : process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

connection.connect(function(err) {
  if (err) {
    throw err;
  } else {
    console.log("database connected");
  }
});

module.exports.connection = connection