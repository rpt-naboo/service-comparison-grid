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
			console.log('hello')
			helpers.insertProductCategories();
		})
}

const writeToCSV = (array) => {

	Object.defineProperty(Array.prototype, 'flat', {
    value: function(depth = 1) {
      return this.reduce(function (flat, toFlatten) {
        return flat.concat((Array.isArray(toFlatten) && (depth-1)) ? toFlatten.flat(depth-1) : toFlatten);
      }, []);
    }
	});

	csv.write(array, {headers:true}).pipe(ws);
	console.log('writing to product csv');
	ws
		.on("finish", function() {
			helpers.insertProduct()
			.then(() => {
				return helpers.findLastInsertedProductId()
			})
			.then((result) => {
				let startingId = result - 10;
				let categories = [];
				for (let i = startingId; i < result; i++) {
					let formatted = helpers.formatCategory(i);
					if (formatted !== undefined) {
						categories.push(formatted);
					}
				}
				categories = categories.flat();
				writeToCategoryCSV(categories);
			})
		})
}



// fs.truncate('/ztest.csv', 0, function(){
// 	console.log('check file now');
// })

module.exports.writeToCSV = writeToCSV;