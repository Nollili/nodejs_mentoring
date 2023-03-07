import express from 'express';
import { authLogin } from '../middlewares/authentication';
import * as userService from '../services/user-service';
import { validateSchema, userSchema } from '../validators/validator';
const userRouter = express.Router();

userRouter.get('/users', authLogin, userService.getAllUsersReq());
userRouter.get(
	'/users/:loginsubstring/:limit',
	authLogin,
	userService.getAutoSuggestUsersReq()
);
userRouter.get('/users/:id', authLogin, userService.getUserByIdReq());
userRouter.post(
	'/users',
	authLogin,
	validateSchema(userSchema),
	userService.createUserReq()
);
userRouter.post('/userlogin', userService.loginUser());
userRouter.put(
	'/users',
	authLogin,
	validateSchema(userSchema),
	userService.updateUserReq()
);
userRouter.delete('/users/:id', authLogin, userService.deleteUserReq());

export default userRouter;
