module.export = parserParams = {
	delimiter: [';', ','],
	headers: ['book', 'author', 'amount', 'price'],
	ignoreColumns: /(amount)/,
	colParser: {
		price: 'number',
	},
};

export let parserParams = {
	delimiter: [';', ','],
	headers: ['book', 'author', 'amount', 'price'],
	ignoreColumns: /(amount)/,
	colParser: {
		price: 'number',
	},
};
