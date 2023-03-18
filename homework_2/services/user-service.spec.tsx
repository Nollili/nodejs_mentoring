const defaultUsers = [
	{
		id: '16c4f061-b629-4a49-9537-a86a8d8ac5f9',
		login: 'itsME',
		password: 'Pa$$word_<>',
		age: 88,
		createdAt: '2023-03-15T11:12:44.070Z',
		updatedAt: '2023-03-15T11:12:44.070Z',
	},
	{
		id: '3ee86cdc-69bc-4591-8f8b-592265c1c50b',
		login: 'N00ne',
		password: 'Pa55word_<>',
		age: 30,
		createdAt: '2023-03-15T11:12:44.144Z',
		updatedAt: '2023-03-15T11:12:44.144Z',
	},
	{
		id: '7a020737-f610-4bc3-8ac1-9d9553d0ce32',
		login: 'Kimberly12',
		password: 'Pa55word',
		age: 24,
		createdAt: '2023-03-15T11:12:44.219Z',
		updatedAt: '2023-03-15T11:12:44.219Z',
	},
];

jest.mock('../controllers/user-controller', () => ({
	getAutoSuggestUsers: jest.fn().mockResolvedValue(defaultUsers[0]),
	getAllUsers: jest.fn().mockResolvedValue(defaultUsers),
	getUserById: jest.fn().mockResolvedValue(defaultUsers[1]),
	createUser: jest.fn().mockResolvedValue({
		id: '90666651-6750-4343-ae5e-a9a07cafb1bd',
		login: 'newUser',
		password: 'Pa$$word_<>',
		age: 40,
	}),
	updateUser: jest.fn().mockResolvedValue({}),
	deleteUser: jest.fn().mockResolvedValue({}),
}));

import { describe, expect } from '@jest/globals';
import * as userService from '../services/user-service';
import { Request, Response } from 'express';

const mockResponse = (): Response => {
	const res = {
		status: {},
		json: {},
	};
	res.status = jest.fn().mockReturnValue(res);
	res.json = jest.fn().mockReturnValue(res);
	return res as Response;
};

describe('getAutoSuggestUsersReq', () => {
	const loginsubstring = 'its';
	const limit = 3;
	it('should return all users', async () => {
		const mockRequest = (loginsubstring: string, limit: number): Request => {
			return {
				params: { loginsubstring, limit },
			} as any as Request;
		};

		const getAutoSuggestUsers = userService.getAutoSuggestUsersReq();
		const req = mockRequest(loginsubstring, limit);
		const res = mockResponse();

		await getAutoSuggestUsers(req, res);
		expect(res.json).toHaveBeenCalledWith(defaultUsers[0]);
	});
});

describe('getAllUsersReq', () => {
	it('should return all users', async () => {
		const mockRequest = (reqData: any): Request => {
			return {
				body: { id: reqData },
			} as any as Request;
		};

		const getAllUsers = userService.getAllUsersReq();
		const req = mockRequest('');
		const res = mockResponse();

		await getAllUsers(req, res);
		expect(res.json).toHaveBeenCalledWith(defaultUsers);
	});
});

describe('getUserByIdReq', () => {
	it('should return one user with the correct id', async () => {
		const id = '3ee86cdc-69bc-4591-8f8b-592265c1c50b';
		const mockGetUserRequest = (reqData: any): Request => {
			return {
				params: { id: reqData },
			} as any as Request;
		};
		const getUserById = userService.getUserByIdReq();
		const req = mockGetUserRequest(id);
		const res = mockResponse();

		await getUserById(req, res);
		expect(res.json).toHaveBeenCalledWith(defaultUsers[1]);
	});
});

describe('createUserReq', () => {
	it('should create user', async () => {
		const newUser = {
			id: '90666651-6750-4343-ae5e-a9a07cafb1bd',
			login: 'newUser',
			password: 'Pa$$word_<>',
			age: 40,
		};

		const mockCreateUserRequest = (reqData: any): Request => {
			const { id, name, permissions } = reqData;
			return {
				body: { id: id, name: name, permissions: permissions },
			} as any as Request;
		};

		const createUser = userService.createUserReq();
		const req = mockCreateUserRequest(newUser);
		const res = mockResponse();

		await createUser(req, res);
		expect(res.json).toHaveBeenCalledWith(newUser);
	});
});

describe('updateUserReq', () => {
	it('should update User', async () => {
		const updatedUser = {
			id: '3ee86cdc-69bc-4591-8f8b-592265c1c50b',
			login: 'N00ne',
			password: 'Pa55word_<>',
			age: 55,
		};

		const mockUpdateRequest = (reqData: any): Request => {
			const { id, name, permissions } = reqData;
			return {
				body: { id: id, name: name, permissions: permissions },
			} as any as Request;
		};

		const updateUser = userService.updateUserReq();
		const req = mockUpdateRequest(updatedUser);
		const res = mockResponse();

		await updateUser(req, res);
		expect(res.json).toHaveBeenCalledWith(
			'User with id 3ee86cdc-69bc-4591-8f8b-592265c1c50b was updated'
		);
	});
});

describe('deleteUserReq', () => {
	it('should delete User with given id', async () => {
		const id = '3ee86cdc-69bc-4591-8f8b-592265c1c50b';
		const mockRequest = (reqData: any): Request => {
			return {
				params: { id: reqData },
			} as any as Request;
		};
		const deleteUser = userService.deleteUserReq();
		const req = mockRequest(id);
		const res = mockResponse();

		await deleteUser(req, res);
		expect(res.json).toHaveBeenCalledWith(
			'User with id 3ee86cdc-69bc-4591-8f8b-592265c1c50b was deleted'
		);
	});
});
