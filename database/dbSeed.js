const helpers = require('./databaseHelpers.js');
const faker = require('faker');
const con = require('./index.js');
const db = con.connection;

//this will keep track of all the names used and how many times it was used.
//names used is forgotten after seed is finished running.
let names = {}

const generateProductName = () => {
  let tempName = faker.fake("{{commerce.productName}}");
  let name = names[tempName];
  if (name !== undefined) {
    name++;
  } else {
    name = 1;
  }
  return `${tempName} Num. ${name}`
}

let productCounter = 0;
let catCounter = 0;

const seedInsertProduct = (names) => {
  helpers.formatArray(names);
}

const bulkNames = () => {
    let newNames = [];
    for (let i = 0; i < 101; i++) {
      newNames.push(generateProductName());
    }
    seedInsertProduct(newNames);
}

bulkNames();