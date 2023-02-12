import { Request, Response } from 'express';
import * as groupController from '../controllers/group-controller';
import { requestErrorLogger, requestLogger } from '../middlewares/loggers';

const getAllGroupsReq = () => {
	return (req: Request, res: Response) => {
		requestLogger(getAllGroupsReq.name, []);

		groupController
			.getAllGroups()
			.then((groups) => {
				res.json(groups);
			})
			.catch((error) => {
				requestErrorLogger(getAllGroupsReq.name, [], error);

				res.status(404).json({ message: `Groups not found`, error });
			});
	};
};

const getGroupByIdReq = () => {
	return (req: Request, res: Response) => {
		const { id } = req.params;
		requestLogger(getGroupByIdReq.name, [id]);

		groupController
			.getGroupById(id)
			.then((Group) => res.json(Group))
			.catch((error) => {
				requestErrorLogger(getGroupByIdReq.name, [id], error);

				res
					.status(404)
					.json({ message: `Group with id ${id} not found`, error });
			});
	};
};

const createGroupReq = () => {
	return (req: Request, res: Response) => {
		const Group = req.body;
		requestLogger(createGroupReq.name, [JSON.stringify(Group)]);

		groupController
			.createGroup(Group)
			.then((newGroup) => res.json(newGroup))
			.catch((error) => {
				requestErrorLogger(createGroupReq.name, [JSON.stringify(Group)], error);

				res.status(404).json({ message: 'Unable to create Group', error });
			});
	};
};

const updateGroupReq = () => {
	return (req: Request, res: Response) => {
		const { id, name, permissions } = req.body;
		requestLogger(updateGroupReq.name, [JSON.stringify(req.body)]);

		groupController
			.updateGroup(id, name, permissions)
			.then(() => res.json(`Group with id ${id} was updated`))
			.catch((error) => {
				requestErrorLogger(
					updateGroupReq.name,
					[JSON.stringify(req.body)],
					error
				);

				res
					.status(404)
					.json({ message: `There is no existing Group with id ${id}`, error });
			});
	};
};

const deleteGroupReq = () => {
	return (req: Request, res: Response) => {
		const { id } = req.params;
		requestLogger(deleteGroupReq.name, [id]);

		groupController
			.deleteGroup(id)
			.then(() => {
				res.json(`Group with id ${id} was deleted`);
			})
			.catch((error) => {
				requestErrorLogger(deleteGroupReq.name, [id], error);

				res
					.status(404)
					.json({ message: `There is no existing Group with id ${id}`, error });
			});
	};
};

const addUserToGroupReq = () => {
	return async (req: Request, res: Response) => {
		const groupId: string = req.params.groupId;
		const userId: string = req.params.userId;
		requestLogger(addUserToGroupReq.name, [groupId, userId]);

		groupController
			.addUserToGroup(groupId, userId)
			.then((newUserInGroup) => res.json(newUserInGroup))
			.catch((error) => {
				requestErrorLogger(addUserToGroupReq.name, [groupId, userId], error);

				res.status(404).json({ message: 'Unable to create Group', error });
			});
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
