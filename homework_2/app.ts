import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user-routes';
import groupRouter from './routes/group-routes';
import { errorHandler } from './middlewares/error-handling';
import * as db from './controllers/db';
import { createLogger, format, transports } from 'winston';
const app = express();
const port = 3000;

app.set('strict routing', true);
app.disable('x-powered-by');

console.log(process.env.ACCESS_TOKEN_SECRET);

createLogger({
	transports: [
		new transports.Console(),
		new transports.File({
			filename: './logs/exceptions.log',
			handleExceptions: true,
		}),
		new transports.File({
			filename: './logs/rejections.log',
			handleRejections: true,
		}),
	],
	format: format.combine(
		format.json(),
		format.timestamp(),
		format.metadata(),
		format.prettyPrint()
	),
});

db.connectDb()
	.then(() => db.SyncUsersDb())
	.then(() => db.SyncGroupsDb())
	.then(() => db.SyncUsersInGroupsDb())
	.then(() => db.setDefaultUsers())
	.then(() => db.setDefaultGroups());

app.use(express.json());
app.use(cookieParser());

app.use(userRouter);
app.use(groupRouter);

process.on('uncaughtException', (err: Error, origin: string) => {
	const errorMessage = `Exception at ${origin}: \n ${err}`;
	console.error(errorMessage);
});
process.on(
	'unhandledRejection',
	(reason: {} | null | undefined, promise: Promise<void>) => {
		const errorMessage = `Unhandled rejection at ${promise} \n ${reason}`;
		console.error(errorMessage);
	}
);

app.use(errorHandler());
app.use(() => {
	throw new Error('Error');
});

app.listen(port, () => console.log(`server is listening on port ${port}`));
