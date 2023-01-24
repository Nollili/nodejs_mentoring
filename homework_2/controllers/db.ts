import { Sequelize } from 'sequelize';
const conString = 'postgres://qnzwcitq:Ty3WVvLy97PnjBK6sjt1-LJIk2e2oko-@rogue.db.elephantsql.com/qnzwcitq';

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


export {
	sequelize,
	connectDb,
};
