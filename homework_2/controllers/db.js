import Sequelize from 'sequelize';

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

sequelize
	.authenticate()
	.then(() => {
		console.log('Connection has been established');
	})
	.catch((err) => {
		console.error('Unable to connect to the database', err);
	});

const Users = sequelize.define('users', {
	id: { type: Sequelize.UUIDV4, primaryKey: true },
	login: Sequelize.STRING,
	password: Sequelize.STRING,
	age: Sequelize.INTEGER,
	isDeleted: Sequelize.BOOLEAN,
});

sequelize
	.sync()
	.then(() => {
		console.log('Book table created successfully!');
	})
	.catch((error) => {
		console.error('Unable to create table : ', error);
	});

const users = Users.findAll();
console.log(JSON.stringify(users));

export const getAllUsers = () => {
	return 'this';
};
