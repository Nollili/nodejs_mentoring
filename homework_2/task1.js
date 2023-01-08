const express = require('express');
const cookieParser = require('cookie-parser');
const userRouter = require('./user-route.js');

const app = express();
const port = 3000;

app.set('strict routing', true);
app.disable('x-powered-by');

app.use(express.json());
app.use(cookieParser());
app.use(userRouter);

app.use(() => {
	throw new Error('Error');
});

app.use(function (err, req, res, next) {
	console.log(err.stack);
	res.status(500).send('Something broke');
	next();
});

app.listen(port, () => console.log(`server is listening on port ${port}`));
