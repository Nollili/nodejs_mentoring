process.stdin.setEncoding('utf-8');
process.stdin.on('data', function (inputString: string) {
	process.stdout.write(inputString.split('').reverse().join('')+'\n\n');
});
