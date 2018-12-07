const fs = require('fs');

const csv = require('fast-csv');

const ws = fs.createWriteStream(`mysql_product.csv`);

const helpers = require('./databaseHelpers.js');

const writeToCSV = (array) => {
	console.log('starting csv write');
	csv.write(array, {headers:true}).pipe(ws);
	ws
		.on("data", function(data) {
			console.log('hmm');
		})
		.on("finish", function() {
			console.log('done writing to csv');
			helpers.insertProduct();
		})
}

// fs.truncate('/ztest.csv', 0, function(){
// 	console.log('check file now');
// })

module.exports.writeToCSV = writeToCSV;