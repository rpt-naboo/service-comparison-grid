const helpers = require('./databaseHelpers.js');

const mainProducts = ["IPhone", "PreSonus AudioBox", "Smart Watch", "Jawbone Speaker", "Turtle Beach", "Wood Frame Sunglasses", "Phone Case", "3D Printer", "Phone Power Bank", "Drone", "Fitness Tracker", "Solar Panel", "Rechargeable Lighter", "E-Cig", "Rice Cooker", "Smart Water Detector", "Pressure Cooker", "Wireless Charging Pad", "Hair Dryer", "Robot Vacuum", "Knife Sharpener", "Shower Curtain Liner", "Stream Stink", "DNA Test", "Alexa"];

const insertMainProducts = (products) => {
  for (let i = 0; i < products.length; i++) {
    let product = products[i];
    helpers.insertMainProduct(product, function(result) {
      console.log(result);
    })
  }
}

const insertProductClone = (products) => {
  for (let i = 0; i < products.length; i++) {
    let product = products[i];
    helpers.insertProductClone(product, function(result) {
      console.log(result);
    })
  }
}

//insertMainProducts(mainProducts);
insertProductClone(mainProducts);