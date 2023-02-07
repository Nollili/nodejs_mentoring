import { Request, Response } from "express";
import * as userController from '../controllers/user-controller'

const getAutoSuggestUsersReq = () => {
	return (req: Request, res: Response) => {
        const { loginsubstring, limit } = req.params;
        userController.getAutoSuggestUsers(loginsubstring, limit)
          .then(users => res.json(users))
          .catch(error => 
            res.status(404) 
              .json({ message: `Username containing ${loginsubstring} not found`, error}))
	};
};

const getAllUsersReq = () => {
  return(req: Request, res: Response) =>{
    userController.getAllUsers()
      .then(users => {
        res.json(users)})
      .catch(error => 
        res.status(404) 
          .json({ message: `Users not found`, error}))
  }
}

const getUserByIdReq = () => {
  return(req: Request, res: Response) =>{
    const { id } = req.params;
    userController.getUserById(id)
      .then(user => res.json(user))
      .catch(error => 
        res.status(404) 
          .json({ message: `User with id ${id} not found`, error}))
  }
}

const createUserReq = () => {
  return (req: Request, res: Response) => {
    const user = req.body;
    userController.createUser(user)
        .then(newUser => res.json(newUser))
        .catch(error => 
          res.status(404)
            .json({message: 'Unable to create user', error}))
  }
}

const updateUserReq = () => {
  return (req: Request, res: Response) => {
    const { id, login, password, age } = req.body;
    userController.updateUser(id, login, password, age)
        .then( () => res.json(`User with id ${id} was updated`))
        .catch(error => 
            res.status(404)
               .json({ message: `There is no existing user with id ${id}`, error}));
  }
}

const deleteUserReq = () => {
  return (req: Request, res: Response) => {
    const { id } = req.params;
    userController.deleteUser(id).then(() => {
      res.json(`User with id ${id} was deleted`)
    }).catch( error => 
      res.status(404)
         .json({ message: `There is no existing user with id ${id}`, error }))
  }
}

export {
  getAutoSuggestUsersReq,
  getAllUsersReq,
  getUserByIdReq,
  createUserReq,
  updateUserReq,
  deleteUserReq
}