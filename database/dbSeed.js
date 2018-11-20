const helpers = require('./databaseHelpers.js');

const mainProducts = ["IPhone", "PreSonus AudioBox", "Smart Watch", "Jawbone Speaker", "Turtle Beach", "Wood Frame Sunglasses", "Phone Case", "3D Printer", "Phone Power Bank", "Drone", "Fitness Tracker", "Solar Panel", "Rechargeable Lighter", "E-Cig", "Rice Cooker", "Smart Water Detector", "Pressure Cooker", "Wireless Charging Pad", "Hair Dryer", "Robot Vacuum", "Knife Sharpener", "Shower Curtain Liner", "Stream Stink", "DNA Test", "Alexa"];


//the helper functions are using callbacks while the top level function uses Promise
const insertProduct = (product) => {
  return new Promise((resolve, reject) => {
    helpers.insertMainProduct(product, function(mainResult) {
      console.log('main product inserted ', mainResult)
      helpers.insertProductClone(product, function(cloneResult) {
        console.log('product clones inserted ', cloneResult);
        resolve();
      });
    });
  });
}


let promises = [];


// pushing a list of promises in an array to iterate over later
for (let i = 0; i < mainProducts.length; i++) {
  let product = mainProducts[i];
  promises.push(insertProduct(product));
}

Promise.all(promises);