import { Request, Response } from "express";
import * as groupController from '../controllers/group-controller'

const getAllGroupsReq = () => {
  return(req: Request, res: Response) =>{
    groupController.getAllGroups()
      .then(groups => {
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

const addUserToGroupReq = () => {
  return async (req: Request, res: Response) => {
    const groupId: string = req.params.groupId;
    const userId: string = req.params.userId;

    groupController.addUserToGroup(groupId, userId)
        .then(newUserInGroup => res.json(newUserInGroup))
            .catch(error => 
              res.status(404)
                .json({message: 'Unable to create Group', error}))
  }
  
}

export {
  getAllGroupsReq,
  getGroupByIdReq,
  createGroupReq,
  updateGroupReq,
  deleteGroupReq,
  addUserToGroupReq
}