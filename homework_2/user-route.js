const express = require('express');
const Joi = require('joi');
const { v4: uuidv4 } = require('uuid');

const userRouter = express.Router();

const errorResponse = (schemaErrors) => {
	const errors = schemaErrors.map(({ path, message }) => {
		return { path, message };
	});

	return {
		status: 'Failed',
		errors,
	};
};

const validateSchema = (schema) => {
	return (req, res, next) => {
		const { error } = schema.validate(req.body, {
			abortEarly: true,
			allowUnknow: false,
		});

		if (error && error.isJoi) {
			return res.status(400).json(errorResponse(error.details));
		}
		next();
	};
};

const userSchema = Joi.object().keys({
	id: Joi.number().required(),
	login: Joi.string().alphanum().min(3).max(30).required(),
	password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
	age: Joi.number().integer().min(4).max(130).required(),
	isDeleted: Joi.boolean().required(),
});

const users = [
	{
		id: 1,
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
	return (req, res) => {
		const { loginsubstring, limit } = req.params;

		const userList = users
			.filter((user) => user.login.includes(loginsubstring) && !user.isDeleted)
			.sort((a, b) => a.login.localeCompare(b.login))
			.slice(0, limit);
		res.json(userList);
	};
};

userRouter.get('/users/:loginsubstring/:limit', getAutoSuggestUsers());

userRouter.get('/users/:id', (req, res) => {
	const { id } = req.params;
	const user = users.find((user) => user.id === parseInt(id, 10));
	if (user === undefined) {
		res.status(404).json({ message: `User with id ${id} not found` });
	} else {
		res.json(user);
	}
});

userRouter.post('/users', validateSchema(userSchema), (req, res) => {
	const user = req.body;
	const newUsers = [...users, user];
	res.json(newUsers);
});

userRouter.put('/users', validateSchema(userSchema), (req, res) => {
	const { id, login, password, age, isDeleted } = req.body;
	const user = users.find((user) => user.id === parseInt(id, 10));
	if (user === undefined) {
		res
			.status(404)
			.json({ message: `There is no existing user with id ${id}` });
	} else {
		const newUser = {
			id: id,
			login: login === user.login ? user.login : login,
			password: password === user.password ? user.password : password,
			age: age === user.age ? user.age : age,
			isDeleted: isDeleted === user.isDeleted ? user.isDeleted : isDeleted,
		};
		res.json(newUser);
	}
});

userRouter.delete('/users/:id', (req, res) => {
	const { id } = req.params;
	const user = users.find((user) => user.id === parseInt(id, 10));

	if (user === undefined) {
		res
			.status(404)
			.json({ message: `There is no existing user with id ${id}` });
	} else {
		req.body.isDeleted = true;
		res.json(req.body);
	}
});

module.exports = userRouter;
