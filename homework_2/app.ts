import express, { Request, Response, NextFunction } from "express";
import cookieParser from 'cookie-parser';
import userRouter from './controllers/routes';

const app = express();
const port = 3000;

app.set('strict routing', true);
app.disable('x-powered-by');

app.use(express.json());
app.use(cookieParser());
app.use(userRouter);


app.listen(port, () => console.log(`server is listening on port ${port}`));
