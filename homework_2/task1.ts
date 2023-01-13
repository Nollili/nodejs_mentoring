import express, { Request, Response, NextFunction } from "express";
import cookieParser from 'cookie-parser';
import userRouter from './user-route';

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

app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
	console.log(err.stack);
	res.status(500).send('Something broke');
	next();
});

app.listen(port, () => console.log(`server is listening on port ${port}`));
