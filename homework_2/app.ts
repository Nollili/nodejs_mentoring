import expressWinston from 'express-winston'
import express from 'express';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user-routes';
import groupRouter from './routes/group-routes';
import { errorHandler } from "./middlewares/error-handling"
import * as db from "./controllers/db"
import { requestLogger, warningErrorLogger, internalErrorLogger } from './middlewares/loggers';

const app = express();
const port = 3000;

app.set('strict routing', true);
app.disable('x-powered-by');

app.use(expressWinston.logger({
	winstonInstance: requestLogger,
	statusLevels: true
}));

app.use(expressWinston.logger({
	winstonInstance: warningErrorLogger,
	statusLevels: true
}));

db.connectDb()
	.then(()=>db.SyncUsersDb())
	.then(()=>db.SyncGroupsDb())
	.then(()=> db.SyncUsersInGroupsDb())
	.then(()=>db.setDefaultUsers())
	.then(()=>db.setDefaultGroups());

app.use(express.json());
app.use(cookieParser());

app.use(userRouter);
app.use(groupRouter);

app.use(expressWinston.logger({
	winstonInstance: internalErrorLogger,
	statusLevels: true
}));

app.use(errorHandler());
app.use(() => {
	throw new Error('Error');
});

app.listen(port, () => console.log(`server is listening on port ${port}`));
