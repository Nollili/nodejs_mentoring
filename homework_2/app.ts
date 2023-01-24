import express from 'express';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user-routes';
import groupRouter from './routes/group-routes';
import { errorHandler } from "./middlewares/error-handling"

const app = express();
const port = 3000;

app.set('strict routing', true);
app.disable('x-powered-by');

app.use(express.json());
app.use(cookieParser());

app.use(userRouter)
app.use(groupRouter)

app.use(errorHandler())
app.use(() => {
	throw new Error('Error');
});

app.listen(port, () => console.log(`server is listening on port ${port}`));
