import express from 'express';
import * as groupService from '../services/group-service';
import { validateSchema, groupSchema } from '../validators/user-validator';

const groupRouter = express.Router();

groupRouter.get('/groups', groupService.getAllGroupsReq());
groupRouter.get('/groups/:id', groupService.getGroupByIdReq());
groupRouter.post(
	'/groups',
	validateSchema(groupSchema),
	groupService.createGroupReq()
);
groupRouter.put(
	'/groups',
	validateSchema(groupSchema),
	groupService.updateGroupReq()
);
groupRouter.delete('/groups/:id', groupService.deleteGroupReq());
groupRouter.post('/groups/:groupId/:userId', groupService.addUserToGroupReq());

export default groupRouter;
