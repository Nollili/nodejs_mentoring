import express, { Request, Response, NextFunction } from "express";
import User from "../models/user-model"

const getAutoSuggestUsers = (users: Array<User>) => {
	return (req: Request, res: Response) => {
		const { loginsubstring, limit } = req.params;
		const userList = users
			.filter((user: User) => user.login.includes(loginsubstring) && !user.isDeleted)
			.sort((a: User, b: User) => a.login.localeCompare(b.login))
			.slice(0, Number(limit));
		res.json(userList);
	};
};

const getUserById = (users: Array<User>) => {
  return(req: Request, res: Response) =>{
	const { id } = req.params;
	const user = users.find((user) => user.id === id);
	if (user === undefined) {
		res.status(404).json({ message: `User with id ${id} not found` });
	} else {
		res.json(user);
	}
 }
}

const createUser = (users: Array<User>) =>{
  return (req: Request, res: Response) => {
    const user = req.body;
    users = [...users, user];
    res.json(users);
  }
}

const updateUser = (users: Array<User>) =>{
  return (req: Request, res: Response) => {
    const { id, login, password, age, isDeleted } = req.body;
    const user = users.find((user) => user.id === id);
    const index =users.findIndex((user) => user.id === id);
    if (user === undefined) {
      res
        .status(404)
        .json({ message: `There is no existing user with id ${id}` });
    } else {
      const updatedUser = {
        id: id,
        login: login === user.login ? user.login : login,
        password: password === user.password ? user.password : password,
        age: age === user.age ? user.age : age,
        isDeleted: isDeleted === user.isDeleted ? user.isDeleted : isDeleted,
      };
  
      users.splice(index, 1);
      users.push(updatedUser);
      console.log(users)
      res.json(updatedUser);
    }
  }
}

const deleteUser = (users: Array<User>) => {
  return (req: Request, res: Response) => {
    const { id } = req.params;
    const user = users.find((user) => user.id === id);
  
    if (user === undefined) {
      res
        .status(404)
        .json({ message: `There is no existing user with id ${id}` });
    } else {
      req.body.isDeleted = true;
      res.json(req.body);
    }
  }
}

export {
  getAutoSuggestUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
}