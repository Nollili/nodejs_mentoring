import {Permission, Group} from '../models/group-model'
import { Groups } from './db';

const getAllGroups = async () => {
  const allGroups = await Groups.findAll();
  return allGroups;
};

const getGroupById = async (id: string) => {
  const findById = await Groups.findByPk(id);
  return(findById)
};

const updateGroup = async (id: string, name: string, permissions: Array<Permission>) => {
  const updatedGroup = await Groups.update({ 
    name: name,
    permissions: permissions
  }, {
    where: {
      id: id
    }
  });
  return updatedGroup;
};

const createGroup = async (group: Group) => {
  const newGroup = await Groups.create({ 
    id: group.id,
    name: group.name,
    permissions: group.permissions,
  });
  return newGroup
};

const deleteGroup = async (id: string) => {
  const GroupToDelete = await Groups.destroy({
    where:{
      id: id
    }
  });
  return GroupToDelete;
};

const addUserToGroup = async (groupId: string, userId: string) =>{
  
}

export {
  getAllGroups,
	getGroupById,
	updateGroup,
	createGroup,
	deleteGroup,
};
