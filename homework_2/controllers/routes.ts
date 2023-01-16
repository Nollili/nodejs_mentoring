import express, { Request, Response, NextFunction } from "express";
import {getAutoSuggestUsers, getUserById, createUser, updateUser, deleteUser} from "../services/user-service"
import {validateSchema, userSchema} from "../validators/user-validator"
import User from "../models/user-model"

import { v4 as uuidv4 } from 'uuid';

let users: Array<User> = [
	{
		id: uuidv4(),
		login: 'Aaiefnf28',
		password: 'Pa55word',
		age: 12,
		isDeleted: false,
	},
	{
		id: uuidv4(),
		login: 'Peanif0',
		password: 'Pa55word_<>',
		age: 90,
		isDeleted: false,
	},
	{
		id: uuidv4(),
		login: '2ekafnje3',
		password: 'Pa$$word',
		age: 21,
		isDeleted: false,
	},
];
const userRouter = express.Router();

userRouter.get('/users', (req, res) =>{
	res.json(users);
})


userRouter.get('/users/:loginsubstring/:limit', getAutoSuggestUsers(users));
userRouter.get('/users/:id', getUserById(users));
userRouter.post('/users', validateSchema(userSchema), createUser(users));
userRouter.put('/users', validateSchema(userSchema), updateUser(users));
userRouter.delete('/users/:id', deleteUser(users));

export default userRouter;
