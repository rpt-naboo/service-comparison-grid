const con = require('./index.js');
const db = con.connection;

const generateRandomName = (name) => {
  let text = ['MK', 'X', 'VS']
  let numbers = ['I', 'II', 'III', 'IV', '500', '600', '700', '800', '900', '1000']
  let randomText = text[Math.floor(Math.random() * text.length)];
  let randomNumber = numbers[Math.floor(Math.random() * numbers.length )];
  return `${name} ${randomText} ${randomNumber}`;
}

//use this for price AND shipping cost
const generateRandomPrice = (maxPrice) => {
  return '$' + (Math.random() * maxPrice).toFixed(2);
}

const generateRandomRating = () => {
  return (Math.random() * 5).toFixed(2);
}

const generateRandomSoldBy = () => {
  let venders = ['Walmart', 'Amazon', 'Adam', 'Jonathan', 'Josh', 'Hao-Han']
  return venders[Math.floor(Math.random() * venders.length)];
}

const hasDupName = (name ,arr) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].includes(name)) {
      return true
    }
  }
  return false;
}

const insertMainProduct = (product, callback) => {
  let price = generateRandomPrice("400");
  let shippingCost = generateRandomPrice("50");
  let rating = generateRandomRating();
  let soldBy = generateRandomSoldBy();
  let quaryArr = [product, price, shippingCost, rating, soldBy];
  let quaryStr = "INSERT INTO main_product (name, price, shipping_cost, customer_rating, sold_by)\
  VALUE (?)"
  db.query(quaryStr, [quaryArr], function(err, result) {
    if (err) {
      console.log(err);
    } else {
      callback(result);
    }
  })
}

const insertProductClone = (product, callback) => {
  findMainProductId(product, function(result) {
    let mainId = result;
    let quaryArr = [];
    for (let i = 0; i < 3; i++) {
      let name = generateRandomName(product);
      while (hasDupName(name, quaryArr) === true) {
        name = generateRandomName(product);
      }
      let price = generateRandomPrice("400");
      let shippingCost = generateRandomPrice("50");
      let rating = generateRandomRating();
      let soldBy = generateRandomSoldBy();
      let tempArr =  [mainId, name, price, shippingCost, rating, soldBy]
      quaryArr.push(tempArr);
      console.log(quaryArr);
    }
    let quaryStr = "INSERT INTO product_clone (clone_of, name, price, shipping_cost, customer_rating, sold_by)\
    VALUES ?"
    db.query(quaryStr, [quaryArr], function(err, result) {
      if (err) {
        console.log(err);
      } else {
        callback(result);
      }
    })
  })
}

const findMainProductId = (product, callback) => {
  let quaryArr = [product]
  let quaryStr = "SELECT product_id FROM main_product\
  WHERE name = (?)"
  db.query(quaryStr, [quaryArr], function(err, result) {
    if (err) {
      console.log(err);
    } else {
      callback(result[0].product_id);
    }
  })
}

const findRandomMainProduct = (callback) => {
  let quaryStr = 'SELECT * FROM main_product\
  ORDER BY RAND() LIMIT 1'
  db.query(quaryStr, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      callback(result);
    }
  });
}

const findClones = (productId, callback) => {
  let quaryStr = 'SELECT * FROM product_clone\
  WHERE clone_of = ?'
  let quaryArr = [productId];
  db.query(quaryStr, [quaryArr], function(err, result) {
    if (err) {
      console.log(err);
    } else {
      callback(result);
    }
  });
}

const assembleProductList = (callback) => {
  findRandomMainProduct(function(result) {
    let output = [];
    output.push(result[0]);
    findClones(output[0].product_id, function(result) {
      for (let i = 0; i < result.length; i++) {
        output.push(result[0]);
      }
      callback(output);
    })
  })
}

module.exports.assembleProductList = assembleProductList;
module.exports.insertProductClone = insertProductClone;
module.exports.insertMainProduct = insertMainProduct;
module.exports.findMainProductId = findMainProductId;
// module.exports.generateRandomName = generateRandomName;
// module.exports.generateRandomPrice = generateRandomPrice;
// module.exports.generateRandomRating = generateRandomRating;
// module.exports.generateRandomSoldBy = generateRandomSoldBy;

// name DECIMAL(18,2) NOT NULL,
//   price DECIMAL(18,2) NOT NULL,
//   shipping_cost DECIMAL(18,2) NOT NULL,
//   customer_rating DECIMAL (18,2) NOT NULL,
//   sold_by VARCHAR(50) NOT NULL,