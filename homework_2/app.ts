import express from 'express';
import cookieParser from 'cookie-parser';
import userRouter from './controllers/routes';
import { errorHandler } from "./middlewares/error-handling"
import pg from 'pg';
import {Sequelize, DataTypes} from 'sequelize';

const app = express();
const port = 3000;

app.set('strict routing', true);
app.disable('x-powered-by');

app.use(express.json());
app.use(cookieParser());

const conString =
	'postgres://qnzwcitq:Ty3WVvLy97PnjBK6sjt1-LJIk2e2oko-@rogue.db.elephantsql.com/qnzwcitq';

const sequelize = new Sequelize(conString, {
	host: 'localhost',
	dialect: 'postgres',
	pool: {
		max: 5,
		min: 0,
		idle: 1000,
	},
});

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("✅ Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

sequelize
	.authenticate()
	.then(() => {
		console.log('Connection has been established');
	})
	.catch((err:Error) => {
		console.error('Unable to connect to the database', err);
	});

const Users = sequelize.define('users', {
	id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUID },
	login: {type: DataTypes.STRING, allowNull: false },
	password: {type: DataTypes.STRING, allowNull: false },
	age: {type: DataTypes.INTEGER, allowNull: false},
	isDeleted: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
});


(async () => {
	// move this to db.js => change it to ts
	// add single async functions for every method
	// need something for initialize the users on load, or not if there are a table with users

  await sequelize
	.sync()
	.then(() => {
		console.log('Users table created successfully!');
	})
	.catch((error:Error) => {
		console.error('Unable to create table : ', error);
	});
  // Code here
/*
	await Users.create({ 
		id: '16c4f061-b629-4a49-9537-a86a8d8ac5f9',
		login: 'itsME',
		password: 'Pa$$word_<>',
		age: '88',
		isDeleted: false
	});
	await Users.create({
		id: '3ee86cdc-69bc-4591-8f8b-592265c1c50b',
		login: 'N00ne',
		password: 'Pa55word_<>',
		age: 30,
		isDeleted: false,
	});
	await Users.create({
			id: '7a020737-f610-4bc3-8ac1-9d9553d0ce32',
			login: 'Kimberly12',
			password: 'Pa55word',
			age: 24,
			isDeleted: false,
		});
*/
	const users = await Users.findAll(); 
console.log(users.every(user => user instanceof Users)); // true
console.log("All users:", JSON.stringify(users, null, 2));

const findById = await Users.findByPk('7a020737-f610-4bc3-8ac1-9d9553d0ce32')
console.log("found by primary key:", JSON.stringify(findById))

const findOneUser = await Users.findOne({where:{
	login: 'itsME',
}})
console.log('find one: ', JSON.stringify(findOneUser))

})();

/*
getAutoSuggestUsers:
loginsubstring, limit
 => findAll( where:{loginsubstring}, limit:limit)


findByPk => find user where id is specified

createUser => users.create({...})


updateUser => 
		const userToUpdate = await User.findByPk
			=> get the name 
			=> name.set({
					name: "Ada",
					favoriteColor: "blue"
				});
			=> await name.save();
		
createUser =>
			await Users.create({ 
				id: id,
				login: login,
				password: password,
				age: age,
				isDeleted: false
			});


deleteUser => 
			const userToDelete = await User.findByPk
			=> get the name 
			=> name.set({
					isDeleted: true
				});
			=> await name.save();

*/




app.use(errorHandler())
app.use(() => {
	throw new Error('Error');
});



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