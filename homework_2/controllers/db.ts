import { DataTypes, Sequelize } from 'sequelize';
import { getAllGroups } from './group-controller';
import { getAllUsers } from './user-controller';
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

const connectDb = async () =>
	await sequelize
		.authenticate()
		.then(() => {
			console.log('Connection has been established');
		})
		.catch((err) => {
			console.error('Unable to connect to the database', err);
		});

const Users = sequelize.define('Users', {
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
		defaultValue: DataTypes.UUID,
	},
	login: { type: DataTypes.STRING, allowNull: false },
	password: { type: DataTypes.STRING, allowNull: false },
	age: { type: DataTypes.INTEGER, allowNull: false },
});

const Groups = sequelize.define('Groups', {
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
		defaultValue: DataTypes.UUID,
	},
	name: { type: DataTypes.STRING, allowNull: false },
	permissions: { type: DataTypes.ARRAY(DataTypes.TEXT), allowNull: false },
});

const UsersInGroups = sequelize.define('UserGroups', {
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
		defaultValue: DataTypes.UUID,
	},
	UserId: {
		type: DataTypes.UUID,
	},
	GroupId: {
		type: DataTypes.UUID,
	},
});

const SyncUsersDb = async () =>
	await Users.sync({ force: true })
		.then(() => {
			console.log('Sync users with DB was successful!');
		})
		.catch((error) => {
			console.error('Unable to create table : ', error);
		});

const SyncGroupsDb = async () =>
	await Groups.sync({ force: true })
		.then(() => {
			console.log('Sync groups with DB was successful!');
		})
		.catch((error) => {
			console.error('Unable to create table : ', error);
		});

const SyncUsersInGroupsDb = async () =>
	await UsersInGroups.sync({ force: true })
		.then(() => {
			console.log('Sync users groups connection DB!');
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

const createDefaultGroups = async () => {
	await Groups.create({
		id: 'b6892453-1aca-43c5-ab83-7f8937f76598',
		name: 'First Group',
		permissions: ['READ', 'SHARE'],
	});
	await Groups.create({
		id: '4b7650e5-42d3-4ade-a95e-f9e14b964fca',
		name: 'Second Group',
		permissions: ['WRITE', 'DELETE', 'UPLOAD_FILES'],
	});
};

const setDefaultUsers = () => {
	getAllUsers()
		.then((amount) => {
			if (amount.length === 0) {
				createDefaultUsers();
			}
		})
		.catch((err) => {
			console.log(err);
		});
};

const setDefaultGroups = () => {
	getAllGroups()
		.then((groups) => {
			if (groups.length === 0) {
				createDefaultGroups();
			}
		})
		.catch((err) => {
			console.log(err);
		});
};

export {
	connectDb,
	Users,
	Groups,
	UsersInGroups,
	SyncUsersDb,
	SyncGroupsDb,
	SyncUsersInGroupsDb,
	setDefaultUsers,
	setDefaultGroups,
};
