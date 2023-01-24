import { Request, Response } from "express";
import * as db from '../controllers/db'

const getAutoSuggestUsersReq = () => {
	return (req: Request, res: Response) => {
        const { loginsubstring, limit } = req.params;
        db.getAutoSuggestUsers(loginsubstring, limit)
          .then(users => res.json(users))
          .catch(error => 
            res.status(404) 
              .json({ message: `Username containing ${loginsubstring} not found`, error}))
	};
};

const getUserByIdReq = () => {
  return(req: Request, res: Response) =>{
    const { id } = req.params;
    db.getUserById(id)
      .then(user => res.json(user))
      .catch(error => 
        res.status(404) 
          .json({ message: `User with id ${id} not found`, error}))
  }
}

const createUserReq = () => {
  return (req: Request, res: Response) => {
    const user = req.body;
    console.log(user)
    db.createUser(user)
        .then(newUser => res.json(newUser))
        .catch(error => 
          res.status(404)
            .json({message: 'Unable to create user', error}))
  }
}

const updateUserReq = () => {
  return (req: Request, res: Response) => {
    const { id, login, password, age } = req.body;
    db.updateUser(id, login, password, age)
        .then( updatedUser => res.json(`User with id ${id} was updated`))
        .catch(error => 
            res.status(404)
               .json({ message: `There is no existing user with id ${id}`, error}));
  }
}

const deleteUserReq = () => {
  return (req: Request, res: Response) => {
    const { id } = req.params;
    db.deleteUser(id).then(deletedUser => {
      res.json(`User with id ${id} was deleted`)
    }).catch( error => 
      res.status(404)
         .json({ message: `There is no existing user with id ${id}`, error }))
  }
}

export {
  getAutoSuggestUsersReq,
  getUserByIdReq,
  createUserReq,
  updateUserReq,
  deleteUserReq
}