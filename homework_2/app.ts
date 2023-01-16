import express from 'express';
import cookieParser from 'cookie-parser';
import userRouter from './controllers/routes';
import pg from 'pg';

var conString =
	'postgres://qnzwcitq:Ty3WVvLy97PnjBK6sjt1-LJIk2e2oko-@rogue.db.elephantsql.com/qnzwcitq';
var client = new pg.Client(conString);
client.connect(function (err) {
	if (err) {
		return console.error('could not connect to postgres', err);
	}
	client.query('SELECT * FROM users', function (err, result) {
		if (err) {
			return console.error('error running query', err);
		}
		console.log(result.rows);

		client.end();
	});
});

const app = express();
const port = 3000;

app.set('strict routing', true);
app.disable('x-powered-by');

app.use(express.json());
app.use(cookieParser());
app.use(userRouter);

app.listen(port, () => console.log(`server is listening on port ${port}`));

/*

CREATE TABLE users (
  id   UUID PRIMARY KEY,
  login     VARCHAR(50),
  password   VARCHAR(50),
  age	INT,
  isDeleted  bool
);

INSERT INTO users (id,login,password,age,isDeleted)
VALUES ( '3ee86cdc-69bc-4591-8f8b-592265c1c50b', 'N00ne', 'Pa$$word', '30', false);

INSERT INTO users (id,login,password,age,isDeleted)
VALUES ( '7a020737-f610-4bc3-8ac1-9d9553d0ce32', 'Kimberly12', 'Pa55word', '24', false);

INSERT INTO users (id,login,password,age,isDeleted)
VALUES ( '16c4f061-b629-4a49-9537-a86a8d8ac5f9', 'itsME', 'Pa55word_<>', '88', false);

*/