import { v4 as uuidv4 } from 'uuid';
import { Permission, Group } from '../models/group-model';
import { Groups, UsersInGroups } from './db';

const getAllGroups = async () => {
	const allGroups = await Groups.findAll();
	return allGroups;
};

const getGroupById = async (id: string) => {
	const findById = await Groups.findByPk(id);
	return findById;
};

const updateGroup = async (
	id: string,
	name: string,
	permissions: Array<Permission>
) => {
	const updatedGroup = await Groups.update(
		{
			name: name,
			permissions: permissions,
		},
		{
			where: {
				id: id,
			},
		}
	);
	return updatedGroup;
};

const createGroup = async (group: Group) => {
	const newGroup = await Groups.create({
		id: uuidv4(),
		name: group.name,
		permissions: group.permissions,
	});
	return newGroup;
};

const deleteGroup = async (id: string) => {
	const GroupToDelete = await Groups.destroy({
		where: {
			id: id,
		},
	});
	await UsersInGroups.destroy({
		where: {
			GroupId: id,
		},
	});
	return GroupToDelete;
};

const addUserToGroup = async (groupId: string, userId: string) => {
	const newGroup = await UsersInGroups.create({
		id: uuidv4(),
		UserId: userId,
		GroupId: groupId,
	});
	return newGroup;
};

export {
	getAllGroups,
	getGroupById,
	updateGroup,
	createGroup,
	deleteGroup,
	addUserToGroup,
};
