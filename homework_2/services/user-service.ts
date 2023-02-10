import { Request, Response } from 'express';
import * as userController from '../controllers/user-controller';
import * as logger from '../middlewares/loggers';

const getAutoSuggestUsersReq = () => {
	return (req: Request, res: Response) => {
		const { loginsubstring, limit } = req.params;
		logger.requestLogger.info(
			`Called getAutoSuggestUsersReq with login substring: "${loginsubstring}", limit: ${limit}`
		);
		userController
			.getAutoSuggestUsers(loginsubstring, limit)
			.then((users) => res.json(users))
			.catch((error) =>
				res.status(404).json({
					message: `Username containing ${loginsubstring} not found`,
					error,
				})
			);
	};
};

const getAllUsersReq = () => {
	return (req: Request, res: Response) => {
		logger.requestLogger.info(`Called getAllUsersReq`);

		userController
			.getAllUsers()
			.then((users) => {
				res.json(users);
			})
			.catch((error) =>
				res.status(404).json({ message: `Users not found`, error })
			);
	};
};

const getUserByIdReq = () => {
	return (req: Request, res: Response) => {
		const { id } = req.params;
		logger.requestLogger.info(`Called getUserByIdReq with id: ${id}`);
		userController
			.getUserById(id)
			.then((user) => res.json(user))
			.catch((error) =>
				res.status(404).json({ message: `User with id ${id} not found`, error })
			);
	};
};

const createUserReq = () => {
	return (req: Request, res: Response) => {
		const user = req.body;
		console.log(req.body);
		logger.requestLogger.info(
			`Called createUserReq with id ${user.id} user login: ${user.login} password: ${user.password} age ${user.age}`
		);
		userController
			.createUser(user)
			.then((newUser) => res.json(newUser))
			.catch((error) => {
				logger.warningErrorLogger.info(
					`Called createUserReq, request failed on ${error.message}`,
					error
				);

				res.status(404).json({ message: 'Unable to create user', error });
			});
	};
};

const updateUserReq = () => {
	return (req: Request, res: Response) => {
		const { id, login, password, age } = req.body;

		logger.requestLogger.info(
			`Called updateUserReq with userId : ${id}, updated values: login: ${login}, password: ${password}, age: ${age}`
		);

		userController
			.updateUser(id, login, password, age)
			.then(() => res.json(`User with id ${id} was updated`))
			.catch((error) =>
				res
					.status(404)
					.json({ message: `There is no existing user with id ${id}`, error })
			);
	};
};

const deleteUserReq = () => {
	return (req: Request, res: Response) => {
		const { id } = req.params;
		logger.requestLogger.info(
			`Called deleteUserReq, user with id: ${id} deleted`
		);

		userController
			.deleteUser(id)
			.then(() => {
				res.json(`User with id ${id} was deleted`);
			})
			.catch((error) =>
				res
					.status(404)
					.json({ message: `There is no existing user with id ${id}`, error })
			);
	};
};

export {
	getAutoSuggestUsersReq,
	getAllUsersReq,
	getUserByIdReq,
	createUserReq,
	updateUserReq,
	deleteUserReq,
};
