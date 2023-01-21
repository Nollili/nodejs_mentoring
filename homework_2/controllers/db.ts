import { Sequelize, DataTypes, Op } from 'sequelize';
import User from '../models/user-model'
const conString =
	'connection string';

const sequelize = new Sequelize(conString, {
	host: 'localhost',
	dialect: 'postgres',
	pool: {
		max: 5,
		min: 0,
		idle: 1000,
	},
});

const connectDb = async () =>
	await sequelize
		.authenticate()
		.then(() => {
			console.log('Connection has been established');
		})
		.catch((err) => {
			console.error('Unable to connect to the database', err);
		});

const Users = sequelize.define('users', {
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
		defaultValue: DataTypes.UUID,
	},
	login: { type: DataTypes.STRING, allowNull: false },
	password: { type: DataTypes.STRING, allowNull: false },
	age: { type: DataTypes.INTEGER, allowNull: false },
});

const SyncDb = async () =>
	await Users
		.sync({ alter: true })
		.then(() => {
			console.log('Sync with DB was successful!');
		})
		.catch((error) => {
			console.error('Unable to create table : ', error);
		});

const createDefaultUsers = async () => {
	await Users.create({
		id: '16c4f061-b629-4a49-9537-a86a8d8ac5f9',
		login: 'itsME',
		password: 'Pa$$word_<>',
		age: '88',
	});
	await Users.create({
		id: '3ee86cdc-69bc-4591-8f8b-592265c1c50b',
		login: 'N00ne',
		password: 'Pa55word_<>',
		age: 30,
	});
	await Users.create({
		id: '7a020737-f610-4bc3-8ac1-9d9553d0ce32',
		login: 'Kimberly12',
		password: 'Pa55word',
		age: 24,
	});
};

const getAllUsers = async () => {
	const numberOfUsers = (await Users.findAll()).length;
	return numberOfUsers;
};

const setDefaultUsers = () => {
	getAllUsers().then(amount => {
		if(amount === 0){
			createDefaultUsers()
		}}
	).catch(err => {console.log(err)})
}

const getUserById = async (id: string) => {
	const findById = await Users.findByPk(id);
	return(findById)
};

const getAutoSuggestUsers = async (loginsubstring: string, limit: string) => {
	const foundUsers = await Users.findAll({
		limit: Number(limit),
		where: {
			login: {[Op.iLike]: `%${loginsubstring}%`}
		},
	});
	return foundUsers;
};

const updateUser = async (id: string, login: string, password: string, age: number) => {
	const updatedUser = await Users.update({ 
		login: login,
		password: password,
		age: age
	}, {
		where: {
			id: id
		}
	});
	return updatedUser;
};

const createUser = async (user: User) => {
	
	const newUser = await Users.create({ 
		id: user.id,
		login: user.login,
		password: user.password,
		age: user.age,
	});
	return newUser
};

const deleteUser = async (id: string) => {
	const userToDelete = await Users.destroy({
		where:{
			id: id
		}
	});
	return userToDelete;
};

export {
	connectDb,
	SyncDb,
	setDefaultUsers,
	getAllUsers,
	getUserById,
	getAutoSuggestUsers,
	updateUser,
	createUser,
	deleteUser,
};
