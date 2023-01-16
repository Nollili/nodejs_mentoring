app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
	console.log(err.stack);
	res.status(500).send('Something broke');
	next();
});

app.use(() => {
	throw new Error('Error');
});



