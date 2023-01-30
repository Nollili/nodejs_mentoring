import express from "express";
import * as groupService from "../services/group-service"
import * as groupController from '../controllers/group-controller'
import {connectDb} from "../controllers/db"

connectDb()
  .then(() => groupController.addUsersToGroups())
	.then(() => groupController.SyncGroupsDb())
	.then(() => groupController.setDefaultGroups())

const groupRouter = express.Router();

groupRouter.get('/groups', groupService.getAllGroupsReq());
groupRouter.get('/groups/:id', groupService.getGroupByIdReq());
groupRouter.post('/groups', groupService.createGroupReq());
groupRouter.put('/groups', groupService.updateGroupReq());
groupRouter.delete('/groups/:id', groupService.deleteGroupReq());
groupRouter.post('/groups/:id/:addUser', groupService.addUserToGroup());

export default groupRouter;
