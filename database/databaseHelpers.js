const con = require('./index.js');
const db = con.connection;
const faker = require('faker');
const csvHelpers = require('./makeCSV.js');
db.query('SET GLOBAL connect_timeout=28800');
db.query('SET GLOBAL wait_timeout=28800');
db.query('SET GLOBAL interactive_timeout=28800');

//name generation will be different
// const generateRandomName = (name) => {
//   let text = ['MK', 'X', 'VS']
//   let numbers = ['I', 'II', 'III', 'IV', '500', '600', '700', '800', '900', '1000']
//   let randomText = text[Math.floor(Math.random() * text.length)];
//   let randomNumber = numbers[Math.floor(Math.random() * numbers.length )];
//   return `${name} ${randomText} ${randomNumber}`;
// }

//use this for price AND shipping cost
const generateRandomPrice = (maxPrice) => {
  return '$' + (Math.random() * maxPrice).toFixed(2);
}

const generateRandomRating = () => {
  return (Math.random() * 5).toFixed(2);
}

const generateRandomSoldBy = () => {
  let venders = ['Walmart', 'Amazon', 'Adam', 'Jonathan', 'Josh', 'Hao-Han', 'Hallie']
  return venders[Math.floor(Math.random() * venders.length)];
}

const catNames = ['color', 'department', 'weight'];
const generateRandomCategories = () => {
  let categories = {}
  let catNum = Math.floor(Math.random() * 4);
  if (catNum === 0) {
    return false;
  }
  for (let i = 0; i < catNum; i++) {
    let catName = catNames[i];
    if (catName === 'color') {
      categories[catName] = faker.fake("{{commerce.color}}");
    } else if (catName === 'department') {
      categories[catName] = faker.fake("{{commerce.department}}");
    } else {
      categories[catName] = faker.fake("{{random.number}} oz");
    }
  }
  return categories;
}

const hasDupName = (name ,arr) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].includes(name)) {
      return true
    }
  }
  return false;
}


const findProductId = (name, callback) => {
  let quaryArr = [name]
  let quaryStr = "SELECT product_id FROM product\
  WHERE name = (?)"
  db.query(quaryStr, [quaryArr], function(err, result) {
    if (err) {
      console.log(err);
    } else {
      callback(result[0].product_id);
    }
  })
}



// const insertProductCategories = (productId, categories) => {
//   return new Promise((resolve, reject) => {
//     if (categories === false) {
//       return resolve();
//     }
//     for (let cat in categories) {
//       return new Promise((resolve, reject) => {
//         let catName = cat;
//         let catValue = categories[cat];
//         let quaryArr = [productId, catName, catValue];
//         let quaryStr = "INSERT INTO category (belongs_to, category_name, category_value)\
//         VALUES (?)"
//         db.query(quaryStr, [quaryArr], function(err, result) {
//           if (err) {
//             return reject(err);
//           } else {
//             return resolve(result);
//           }
//         })
//       })
//     }
//     return resolve();
//   })
// }

const formatArray = (arr) => {
    //console.log(5)
    let quaryArr = []
    arr.forEach((name, index) => {
      let price = generateRandomPrice("400");
      let shippingCost = generateRandomPrice("50");
      let rating = generateRandomRating();
      let soldBy = generateRandomSoldBy();
      let tempArr = [name, price, shippingCost, rating, soldBy];
      quaryArr.push(tempArr);
      console.log(`${index} records formatted`)
    });
    csvHelpers.writeToCSV(quaryArr);
}

async function insertProduct () {
  let p2 = new Promise ((resolve, reject) => {
    console.log('inserting csv data');
    let filePath = "mysql_product.csv";
    let columns = '(name, price, shipping_cost, customer_rating, sold_by)'
    let quaryStr = `LOAD DATA LOCAL INFILE '${filePath}' INTO TABLE product FIELDS TERMINATED BY ','\
    LINES TERMINATED BY '\\n' ${columns}`;
    db.query(quaryStr, function(err, result) {
      if (err) {
        reject(err);
      } else {
        console.log('DONE')
        resolve(result);
      }
    })
  })
  return await p2
}

const insertProductCategories = (productId, categories) => {
  return new Promise((resolve, reject) => {
    if (categories === false) {
      return resolve();
    }
    let quaryArr = [];
    for (let cat in categories) {
      catName = cat;
      catValue = categories[cat]
      let tempArr = [productId, catName, catValue];
      quaryArr.push(tempArr);
    }
    let quaryStr = "INSERT INTO category (belongs_to, category_name, category_value)\
    VALUES ?"
    db.query(quaryStr, [quaryArr], function(err, result) {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  })
}

//old insertMainProduct
// const insertMainProduct = (product, callback) => {
//   let price = generateRandomPrice("400");
//   let shippingCost = generateRandomPrice("50");
//   let rating = generateRandomRating();
//   let soldBy = generateRandomSoldBy();
//   let quaryArr = [product, price, shippingCost, rating, soldBy];
//   let quaryStr = "INSERT INTO main_product (name, price, shipping_cost, customer_rating, sold_by)\
//   VALUE (?)"
//   db.query(quaryStr, [quaryArr], function(err, result) {
//     if (err) {
//       console.log(err);
//     } else {
//       callback(result);
//     }
//   })
// }



//No longer using clones
// const insertProductClone = (product, callback) => {
//   findMainProductId(product, function(result) {
//     let mainId = result;
//     let quaryArr = [];
//     for (let i = 0; i < 3; i++) {
//       let name = generateRandomName(product);
//       while (hasDupName(name, quaryArr) === true) {
//         name = generateRandomName(product);
//       }
//       let price = generateRandomPrice("400");
//       let shippingCost = generateRandomPrice("50");
//       let rating = generateRandomRating();
//       let soldBy = generateRandomSoldBy();
//       let tempArr =  [mainId, name, price, shippingCost, rating, soldBy]
//       quaryArr.push(tempArr);
//       console.log(quaryArr);
//     }
//     let quaryStr = "INSERT INTO product_clone (clone_of, name, price, shipping_cost, customer_rating, sold_by)\
//     VALUES ?"
//     db.query(quaryStr, [quaryArr], function(err, result) {
//       if (err) {
//         console.log(err);
//       } else {
//         callback(result);
//       }
//     })
//   })
// }


const findRandomMainProduct = (callback) => {
  let quaryStr = 'SELECT * FROM main_product\
  ORDER BY RAND() LIMIT 1'
  db.query(quaryStr, function(err, result) {
    let output = formatQueryData(result);
    if (err) {
      console.log(err);
    } else {
      callback(output);
    }
  });
}



//no longer using clones
// const findClones = (productId, callback) => {
//   let quaryStr = 'SELECT * FROM product_clone\
//   WHERE clone_of = ?'
//   let quaryArr = [productId];
//   db.query(quaryStr, [quaryArr], function(err, result) {
//     let output = formatQueryData(result);
//     if (err) {
//       console.log(err);
//     } else {
//       callback(output);
//     }
//   });
// }

const assembleProductList = (callback) => {
  findRandomMainProduct(function(result) {
    let output = [];
    output.push(result[0]);
    findClones(output[0].product_id, function(result) {
      for (let i = 0; i < result.length; i++) {
        output.push(result[i]);
      }
      callback(output);
    })
  })
}

const formatQueryData = (data) => {
  let string = JSON.stringify(data);
  let json = JSON.parse(string);
  return json;
}

module.exports.assembleProductList = assembleProductList;
module.exports.insertProduct = insertProduct;
module.exports.findProductId = findProductId;
module.exports.generateRandomCategories = generateRandomCategories;
module.exports.insertProductCategories = insertProductCategories;
module.exports.formatArray = formatArray;
//module.exports.insertProductClone = insertProductClone;
// module.exports.generateRandomName = generateRandomName;
// module.exports.generateRandomPrice = generateRandomPrice;
// module.exports.generateRandomRating = generateRandomRating;
// module.exports.generateRandomSoldBy = generateRandomSoldBy;

// name DECIMAL(18,2) NOT NULL,
//   price DECIMAL(18,2) NOT NULL,
//   shipping_cost DECIMAL(18,2) NOT NULL,
//   customer_rating DECIMAL (18,2) NOT NULL,
//   sold_by VARCHAR(50) NOT NULL,