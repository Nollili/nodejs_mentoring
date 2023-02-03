import { Request, Response } from "express";
import * as groupController from '../controllers/group-controller'
import {getUserById} from '../controllers/user-controller'

const getAllGroupsReq = () => {
  return(req: Request, res: Response) =>{
    groupController.getAllGroups()
      .then(groups => {
        console.log(
          groups
        )
        res.json(groups)})
      .catch(error => 
        res.status(404) 
          .json({ message: `Groups not found`, error}))
  }
}

const getGroupByIdReq = () => {
  return(req: Request, res: Response) =>{
    const { id } = req.params;
    groupController.getGroupById(id)
      .then(Group => res.json(Group))
      .catch(error => 
        res.status(404) 
          .json({ message: `Group with id ${id} not found`, error}))
  }
}

const createGroupReq = () => {
  return (req: Request, res: Response) => {
    const Group = req.body;
    console.log(Group)
    groupController.createGroup(Group)
        .then(newGroup => res.json(newGroup))
        .catch(error => 
          res.status(404)
            .json({message: 'Unable to create Group', error}))
  }
}

const updateGroupReq = () => {
  return (req: Request, res: Response) => {
    const { id, name, permissions} = req.body;
    groupController.updateGroup(id, name, permissions)
        .then( updatedGroup => res.json(`Group with id ${id} was updated`))
        .catch(error => 
            res.status(404)
               .json({ message: `There is no existing Group with id ${id}`, error}));
  }
}

const deleteGroupReq = () => {
  return (req: Request, res: Response) => {
    const { id } = req.params;
    groupController.deleteGroup(id).then(deletedGroup => {
      res.json(`Group with id ${id} was deleted`)
    }).catch( error => 
      res.status(404)
         .json({ message: `There is no existing Group with id ${id}`, error }))
  }
}

const addUserToGroup = () => {
  return async (req: Request, res: Response) => {
    const groupId = req.params.id;
    const userId = req.params.addUser;

    const groupToAdd = await groupController.getGroupById(groupId)
    const userToAdd = await getUserById(userId)

    
    
  //  console.log(groupToAdd);
  //  console.log(userToAdd)
    res.json({
      groupToAdd,
      userToAdd
    })
  }
  
}

export {
  getAllGroupsReq,
  getGroupByIdReq,
  createGroupReq,
  updateGroupReq,
  deleteGroupReq,
  addUserToGroup
}