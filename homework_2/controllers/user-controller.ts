import { v4 as uuidv4 } from 'uuid';
import { Op } from 'sequelize';
import User from '../models/user-model';
import { Users, UsersInGroups } from './db';

const getAllUsers = async () => {
	const numberOfUsers = await Users.findAll();
	return numberOfUsers;
};

const getUserById = async (id: string) => {
	const findById = await Users.findByPk(id);
	return findById;
};

const getAutoSuggestUsers = async (loginsubstring: string, limit: string) => {
	const foundUsers = await Users.findAll({
		limit: Number(limit),
		where: {
			login: { [Op.iLike]: `%${loginsubstring}%` },
		},
	});
	return foundUsers;
};

const getUserByLogin = async (login: string) => {
	const foundUser = await Users.findAll({
		where: {
			login: login,
		},
	});
	return foundUser;
};

const updateUser = async (
	id: string,
	login: string,
	password: string,
	age: number
) => {
	const updatedUser = await Users.update(
		{
			login: login,
			password: password,
			age: age,
		},
		{
			where: {
				id: id,
			},
		}
	);
	return updatedUser;
};

const createUser = async (user: User) => {
	const newUser = await Users.create({
		id: uuidv4(),
		login: user.login,
		password: user.password,
		age: user.age,
	});
	return newUser;
};

const deleteUser = async (id: string) => {
	const userToDelete = await Users.destroy({
		where: {
			id: id,
		},
	});
	await UsersInGroups.destroy({
		where: {
			UserId: id,
		},
	});
	return userToDelete;
};

export {
	getAllUsers,
	getUserById,
	getAutoSuggestUsers,
	getUserByLogin,
	updateUser,
	createUser,
	deleteUser,
};
