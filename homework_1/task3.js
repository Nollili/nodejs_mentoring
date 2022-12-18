'use strict';
import path from 'path';
import csvtojson from 'csvtojson';
import fs from 'fs';
const csvFilePath = path.join(__dirname + '/csv/nodejs-hw1-ex1.csv');
import { parserParams } from './utils';


try {
	csvtojson(parserParams)
		.fromFile(csvFilePath)
		.then((jsonObj) => {
			const items = jsonObj
				.map((elem) => '\n' + JSON.stringify(elem))
				.toString()
				.replace(/},/g, '}');
			  fs.writeFileSync(path.join(__dirname + '/csv/text_task1.3.txt'), items);
		});
} catch (error) {
	console.log(error);
}
