import { Request, Response } from 'express';
import * as userController from '../controllers/user-controller';
import { requestErrorLogger, requestLogger } from '../middlewares/loggers';
import jwt from 'jsonwebtoken';

const getAutoSuggestUsersReq = () => {
	return (req: Request, res: Response) => {
		const { loginsubstring, limit } = req.params;
		requestLogger(getAutoSuggestUsersReq.name, [loginsubstring, limit]);

		userController
			.getAutoSuggestUsers(loginsubstring, limit)
			.then((users) => res.json(users))
			.catch((error) => {
				requestErrorLogger(
					getAutoSuggestUsersReq.name,
					[loginsubstring, limit],
					error
				);

				res.status(404).json({
					message: `Username containing ${loginsubstring} not found`,
					error,
				});
			});
	};
};

const getAllUsersReq = () => {
	return (req: Request, res: Response) => {
		requestLogger(getAllUsersReq.name, []);

		userController
			.getAllUsers()
			.then((users) => {
				res.json(users);
			})
			.catch((error) => {
				requestErrorLogger(getAllUsersReq.name, [], error);

				res.status(404).json({ message: `Users not found`, error });
			});
	};
};

const getUserByIdReq = () => {
	return (req: Request, res: Response) => {
		const { id } = req.params;
		requestLogger(getUserByIdReq.name, [id]);

		userController
			.getUserById(id)
			.then((user) => res.json(user))
			.catch((error) => {
				requestErrorLogger(getUserByIdReq.name, [id], error);

				res
					.status(404)
					.json({ message: `User with id ${id} not found`, error });
			});
	};
};

const createUserReq = () => {
	return (req: Request, res: Response) => {
		const user = req.body;
		requestLogger(createUserReq.name, [JSON.stringify(user)]);

		userController
			.createUser(user)
			.then((newUser) => res.json(newUser))
			.catch((error) => {
				{
					requestErrorLogger(createUserReq.name, [JSON.stringify(user)], error);

					res.status(404).json({ message: 'Unable to create user', error });
				}
			});
	};
};

const loginUser = () => {
	return (req: Request, res: Response) => {
		requestLogger(loginUser.name, [req.body]);
		userController.getUserByLogin(req.body.login).then((user) => {
			const loginDB = user[0].dataValues.login;
			const passwordDB = user[0].dataValues.password;

			if (req.body.password === passwordDB) {
				const accessToken = jwt.sign(
					loginDB,
					process.env.ACCESS_TOKEN_SECRET as string
				);
				if (accessToken) {
					res.json({ accessToken: accessToken });
				}
			}
		});
	};
};

const updateUserReq = () => {
	return (req: Request, res: Response) => {
		const { id, login, password, age } = req.body;
		requestLogger(updateUserReq.name, [JSON.stringify(req.body)]);

		userController
			.updateUser(id, login, password, age)
			.then(() => res.json(`User with id ${id} was updated`))
			.catch((error) => {
				requestErrorLogger(
					updateUserReq.name,
					[JSON.stringify(req.body)],
					error
				);

				res
					.status(404)
					.json({ message: `There is no existing user with id ${id}`, error });
			});
	};
};

const deleteUserReq = () => {
	return (req: Request, res: Response) => {
		const { id } = req.params;
		requestLogger(deleteUserReq.name, [id]);

		userController
			.deleteUser(id)
			.then(() => {
				res.json(`User with id ${id} was deleted`);
			})
			.catch((error) => {
				requestErrorLogger(deleteUserReq.name, [id], error);

				res
					.status(404)
					.json({ message: `There is no existing user with id ${id}`, error });
			});
	};
};

export {
	getAutoSuggestUsersReq,
	getAllUsersReq,
	getUserByIdReq,
	createUserReq,
	loginUser,
	updateUserReq,
	deleteUserReq,
};
