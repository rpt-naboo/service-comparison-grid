const helpers = require('./databaseHelpers.js');
const faker = require('faker');
const con = require('./index.js');
const db = con.connection;
db.query('SET GLOBAL connect_timeout=28800');
db.query('SET GLOBAL wait_timeout=28800');
db.query('SET GLOBAL interactive_timeout=28800');

//name generation is diffent.
//const mainProducts = ["IPhone", "PreSonus AudioBox", "Smart Watch", "Jawbone Speaker", "Turtle Beach", "Wood Frame Sunglasses", "Phone Case", "3D Printer", "Phone Power Bank", "Drone", "Fitness Tracker", "Solar Panel", "Rechargeable Lighter", "E-Cig", "Rice Cooker", "Smart Water Detector", "Pressure Cooker", "Wireless Charging Pad", "Hair Dryer", "Robot Vacuum", "Knife Sharpener", "Shower Curtain Liner", "Stream Stink", "DNA Test", "Alexa"];

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
    //console.log(4);
    helpers.formatArray(names);
      //console.log(result)
      // productCounter++;
      // console.log(`pros ${productCounter}`);
      //let productId = result.insertId;
      //let cats = helpers.generateRandomCategories();
      // helpers.insertProductCategories(productId, cats).then((result) => {
      //   catCounter++;
      //   console.log(`cats ${catCounter}`);
      // })
}

let promises = [];

//pushing a list of promises in an array to iterate over later

const bulkNames = () => {
    //console.log(2);
    let newNames = [];
    console.log('starting name generation')
    for (let i = 0; i < 100; i++) {
      newNames.push(generateProductName());
      console.log(`${i} names generated`);
    }
    console.log('name gen complete');
    //console.log(3);
    seedInsertProduct(newNames);
}

bulkNames();

//the helper functions are using callbacks while the top level function uses Promise
//Old innsertProduct
// const insertProduct = (product) => {
//   return new Promise((resolve, reject) => {
//     helpers.insertMainProduct(product, function(mainResult) {
//       console.log('main product inserted ', mainResult)
//       helpers.insertProductClone(product, function(cloneResult) {
//         console.log('product clones inserted ', cloneResult);
//         resolve();
//       });
//     });
//   });
// }



