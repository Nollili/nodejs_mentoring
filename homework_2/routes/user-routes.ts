import express from 'express';
import * as userService from '../services/user-service';
import { validateSchema, userSchema } from '../validators/user-validator';

const userRouter = express.Router();

userRouter.get('/users', userService.getAllUsersReq());
userRouter.get(
	'/users/:loginsubstring/:limit',
	userService.getAutoSuggestUsersReq()
);
userRouter.get('/users/:id', userService.getUserByIdReq());
userRouter.post(
	'/users',
	validateSchema(userSchema),
	userService.createUserReq()
);
userRouter.put(
	'/users',
	validateSchema(userSchema),
	userService.updateUserReq()
);
userRouter.delete('/users/:id', userService.deleteUserReq());

export default userRouter;
