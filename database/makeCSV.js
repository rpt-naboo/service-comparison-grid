const fs = require('fs');

const csv = require('fast-csv');

const ws = fs.createWriteStream(`mysql_product.csv`);
const catWrite = fs.createWriteStream(`mysql_category.csv`);

const helpers = require('./databaseHelpers.js');

const writeToCSV = (array) => {
	csv.write(array, {headers:true}).pipe(ws);
	ws
		.on("finish", function() {
			helpers.insertProduct()
			.then(() => {
				console.log('2nd')
				return helpers.findLastInsertedProductId()
			})
			.then((result) => {
				console.log(result);
			})
		})
}



// fs.truncate('/ztest.csv', 0, function(){
// 	console.log('check file now');
// })

module.exports.writeToCSV = writeToCSV;