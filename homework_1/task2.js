'use strict';
const fs = require('fs');
const path = require('path');
const csvtojson = require('csvtojson');
const csvFilePath = path.join(__dirname + '/csv/nodejs-hw1-ex1.csv');

const parseParams = {
	delimiter: [';', ','],
	headers: ['book', 'author', 'amount', 'price'],
	ignoreColumns: /(amount)/,
	colParser: {
		price: 'number',
	},
};

try {
	csvtojson(parseParams)
		.fromFile(csvFilePath)
		.then((jsonObj) => {
			const items = jsonObj
				.map((elem) => '\n' + JSON.stringify(elem))
				.toString()
				.replace(/},/g, '}');
			fs.writeFileSync(path.join(__dirname + '/csv/text_task1.2.txt'), items);
		});
} catch (error) {
	console.log(error);
}
