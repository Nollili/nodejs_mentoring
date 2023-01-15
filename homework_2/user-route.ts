import express, { Request, Response, NextFunction } from "express";
import Joi from 'joi';
import { v4 as uuidv4 } from 'uuid';
import validateSchema from './utils'

const userRouter = express.Router();

type User = {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
};

const userSchema = Joi.object().keys({
	id: Joi.string().required(),
	login: Joi.string().alphanum().min(3).max(30).required(),
	password: Joi.string().pattern(new RegExp('(?=.*[A-Za-z])(?=.*\d)[A-Za-z0-9]{3,30}$')).required(),
	age: Joi.number().integer().min(4).max(130).required(),
	isDeleted: Joi.boolean().required(),
});

let users: Array<User> = [
	{
		id: "1",
		login: 'Aaiefnf28',
		password: 'Pa55word',
		age: 12,
		isDeleted: false,
	},
	{
		id: uuidv4(),
		login: 'Penif0',
		password: 'Pa55word_<>',
		age: 90,
		isDeleted: false,
	},
	{
		id: uuidv4(),
		login: '2ekfnje3',
		password: 'Pa$$word',
		age: 21,
		isDeleted: false,
	},
];

const getAutoSuggestUsers = () => {
	return (req: Request, res: Response) => {
		const { loginsubstring, limit } = req.params;
		const userList = users
			.filter((user) => user.login.includes(loginsubstring) && !user.isDeleted)
			.sort((a, b) => a.login.localeCompare(b.login))
			.slice(0, Number(limit));
		res.json(userList);
	};
};

userRouter.get('/users/:loginsubstring/:limit', getAutoSuggestUsers());

userRouter.post('/users', validateSchema(userSchema), (req, res) => {
	const user = req.body;
	users = [...users, user];
	res.json(users);
});

userRouter.get('/users', (req, res) =>{
	res.json(users);
})

userRouter.get('/users/:id', (req, res) => {
	const { id } = req.params;
	const user = users.find((user) => user.id === id);
	if (user === undefined) {
		res.status(404).json({ message: `User with id ${id} not found` });
	} else {
		res.json(user);
	}
});

userRouter.put('/users', validateSchema(userSchema), (req, res) => {
	const { id, login, password, age, isDeleted } = req.body;
	const user = users.find((user) => user.id === id);
	const index =users.findIndex((user) => user.id === id);
	if (user === undefined) {
		res
			.status(404)
			.json({ message: `There is no existing user with id ${id}` });
	} else {
		const updatedUser = {
			id: id,
			login: login === user.login ? user.login : login,
			password: password === user.password ? user.password : password,
			age: age === user.age ? user.age : age,
			isDeleted: isDeleted === user.isDeleted ? user.isDeleted : isDeleted,
		};

		users.splice(index, 1);
		users.push(updatedUser);
		console.log(users)
		res.json(updatedUser);
	}
});

userRouter.delete('/users/:id', (req, res) => {
	const { id } = req.params;
	const user = users.find((user) => user.id === id);

	if (user === undefined) {
		res
			.status(404)
			.json({ message: `There is no existing user with id ${id}` });
	} else {
		req.body.isDeleted = true;
		res.json(req.body);
	}
});

export default userRouter;
