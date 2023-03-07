import express from 'express';
import { authLogin } from '../middlewares/authentication';
import * as groupService from '../services/group-service';
import { validateSchema, groupSchema } from '../validators/validator';

const groupRouter = express.Router();

groupRouter.get('/groups', authLogin, groupService.getAllGroupsReq());
groupRouter.get('/groups/:id', authLogin, groupService.getGroupByIdReq());
groupRouter.post(
	'/groups',
	authLogin,
	validateSchema(groupSchema),
	groupService.createGroupReq()
);
groupRouter.put(
	'/groups',
	authLogin,
	validateSchema(groupSchema),
	groupService.updateGroupReq()
);
groupRouter.delete('/groups/:id', authLogin, groupService.deleteGroupReq());
groupRouter.post(
	'/groups/:groupId/:userId',
	authLogin,
	groupService.addUserToGroupReq()
);

export default groupRouter;
