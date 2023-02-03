import { Op } from 'sequelize';
import User from '../models/user-model'
import { Users } from './db';

const getAllUsers = async () => {
  const numberOfUsers = await Users.findAll();
  return numberOfUsers;
  };

const getUserById = async (id: string) => {
  const findById = await Users.findByPk(id);
  return(findById)
};

const getAutoSuggestUsers = async (loginsubstring: string, limit: string) => {
  const foundUsers = await Users.findAll({
    limit: Number(limit),
    where: {
      login: {[Op.iLike]: `%${loginsubstring}%`}
    },
  });
  return foundUsers;
};

const updateUser = async (id: string, login: string, password: string, age: number) => {
  const updatedUser = await Users.update({ 
    login: login,
    password: password,
    age: age
  }, {
    where: {
      id: id
    }
  });
  return updatedUser;
};

const createUser = async (user: User) => {
  const newUser = await Users.create({ 
    id: user.id,
    login: user.login,
    password: user.password,
    age: user.age,
  });
  return newUser
};

const deleteUser = async (id: string) => {
  const userToDelete = await Users.destroy({
    where:{
      id: id
    }
  });
  return userToDelete;
};

export {
	getAllUsers,
	getUserById,
	getAutoSuggestUsers,
	updateUser,
	createUser,
	deleteUser,
};
