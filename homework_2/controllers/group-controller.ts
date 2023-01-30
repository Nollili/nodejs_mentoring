import { DataTypes, Op } from 'sequelize';
import {Permission, Group} from '../models/group-model'
import { sequelize } from './db';
import { Users } from './user-controller';

const Groups = sequelize.define('UserGroup', {
	id: {
		type: DataTypes.UUID,
		primaryKey: true,
		defaultValue: DataTypes.UUID,
	},
	name: { type: DataTypes.STRING, allowNull: false },
	permissions: { type: DataTypes.ARRAY(DataTypes.TEXT), allowNull: false },
});

const addUsersToGroups = async () => {
  await Groups.hasMany(Users,{
    foreignKey: 'id',
  })

  console.log('addUsersToGroups  ',await (Groups.findAll({include:Users})))
}

const SyncGroupsDb = async () =>
  await Groups
    .sync({ alter: true })
    .then(() => {
      console.log('Sync with DB was successful!');
    })
    .catch((error) => {
      console.error('Unable to create table : ', error);
    });

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

const getAllGroups = async () => {
  const allGroups = await Groups.findAll();
  return allGroups;
};

const setDefaultGroups = () => {
  getAllGroups().then(groups => {
    if(groups.length === 0){
      createDefaultGroups()
    }}
  ).catch(err => {console.log(err)})
}

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
  Groups,
  addUsersToGroups,
	SyncGroupsDb,
	setDefaultGroups,
	getAllGroups,
	getGroupById,
	updateGroup,
	createGroup,
	deleteGroup,
};
