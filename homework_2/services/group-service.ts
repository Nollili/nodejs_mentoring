import { Request, Response } from 'express';
import * as groupController from '../controllers/group-controller';
import * as logger from '../middlewares/loggers';

const getAllGroupsReq = () => {
	return (req: Request, res: Response) => {
		logger.requestLogger.info(`Called getAllUsersReq`);

		groupController
			.getAllGroups()
			.then((groups) => {
				res.json(groups);
			})
			.catch((error) =>
				res.status(404).json({ message: `Groups not found`, error })
			);
	};
};

const getGroupByIdReq = () => {
	return (req: Request, res: Response) => {
		const { id } = req.params;
		logger.requestLogger.info(`Called getGroupByIdReq with id: ${id}`);
		groupController
			.getGroupById(id)
			.then((Group) => res.json(Group))
			.catch((error) =>
				res
					.status(404)
					.json({ message: `Group with id ${id} not found`, error })
			);
	};
};

const createGroupReq = () => {
	return (req: Request, res: Response) => {
		const Group = req.body;
		logger.requestLogger.info(
			`Called createGroupReq with id ${Group.id} group name: ${Group.name} permissions: ${Group.permissions}`
		);

		groupController
			.createGroup(Group)
			.then((newGroup) => res.json(newGroup))
			.catch((error) =>
				res.status(404).json({ message: 'Unable to create Group', error })
			);
	};
};

const updateGroupReq = () => {
	return (req: Request, res: Response) => {
		const { id, name, permissions } = req.body;
		logger.requestLogger.info(
			`Called updateGroupReq with id ${id}, updated values: group name: ${name} permissions: ${permissions}`
		);

		groupController
			.updateGroup(id, name, permissions)
			.then(() => res.json(`Group with id ${id} was updated`))
			.catch((error) =>
				res
					.status(404)
					.json({ message: `There is no existing Group with id ${id}`, error })
			);
	};
};

const deleteGroupReq = () => {
	return (req: Request, res: Response) => {
		const { id } = req.params;
		logger.requestLogger.info(
			`Called deleteGroupReq, group with id: ${id} deleted`
		);

		groupController
			.deleteGroup(id)
			.then(() => {
				res.json(`Group with id ${id} was deleted`);
			})
			.catch((error) =>
				res
					.status(404)
					.json({ message: `There is no existing Group with id ${id}`, error })
			);
	};
};

const addUserToGroupReq = () => {
	return async (req: Request, res: Response) => {
		const groupId: string = req.params.groupId;
		const userId: string = req.params.userId;
		logger.requestLogger.info(
			`Called addUserToGroupReq, user with id: ${userId} was added to group: ${groupId}`
		);

		groupController
			.addUserToGroup(groupId, userId)
			.then((newUserInGroup) => res.json(newUserInGroup))
			.catch((error) =>
				res.status(404).json({ message: 'Unable to create Group', error })
			);
	};
};

export {
	getAllGroupsReq,
	getGroupByIdReq,
	createGroupReq,
	updateGroupReq,
	deleteGroupReq,
	addUserToGroupReq,
};
