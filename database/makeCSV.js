const fs = require('fs');

const csv = require('fast-csv');

const ws = fs.createWriteStream(`mysql_product.csv`);
const catWrite = fs.createWriteStream(`mysql_category.csv`);

const helpers = require('./databaseHelpers.js');

const writeToCategoryCSV = (array) => {
	csv.write(array, {headers:true}).pipe(catWrite);
	console.log('writing to categories csv');
	catWrite
		.on("finish", function() {
			helpers.insertProductCategories();
		})
}

const writeToCSV = (array) => {

	csv.write(array, {headers:true}).pipe(ws);
	console.log('writing to product csv');
	ws
		.on("finish", function() {
			helpers.insertProduct()
			.then(() => {
				console.log('finding lastinsertid')
				return helpers.findLastInsertedProductId()
			})
			.then((result) => {
				console.log(`last insert id found ${result}`)
				let startingId = result - 10000001;
				let categories = [];
				console.log(`formatting categories`);
				for (let i = startingId; i < result; i++) {
					let formatted = helpers.formatCategory(i);
					if (formatted !== undefined) {
						formatted.forEach((item) => {
							categories.push(item);
						})
					}
				}
				console.log(`Done formatting categories`);
				writeToCategoryCSV(categories);
			})
		})
}



// fs.truncate('/ztest.csv', 0, function(){
// 	console.log('check file now');
// })

module.exports.writeToCSV = writeToCSV;