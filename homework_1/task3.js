'use strict';
import path from 'path';
import csvtojson from 'csvtojson';
import fs from 'fs';

const csvFilePath = path.join(__dirname + '/csv/nodejs-hw1-ex1.csv');
const outputTextPath = path.join(__dirname + '/csv/text_task1.3.txt');
const readStream = new fs.ReadStream(csvFilePath);
const writeStream = new fs.WriteStream(outputTextPath);

const parserParams = {
	delimiter: [';', ','],
	headers: ['book', 'author', 'amount', 'price'],
	ignoreColumns: /(amount)/,
	colParser: {
		price: 'number',
	},
};

try {
	readStream.pipe(csvtojson(parserParams)).pipe(writeStream);
} catch (error) {
	console.log(error);
}