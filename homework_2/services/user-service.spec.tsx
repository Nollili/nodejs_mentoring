import { describe, expect, test } from '@jest/globals';
import * as userController from '../controllers/user-controller';
import * as userService from '../services/user-service';

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

describe('GET all users', () => {
	it('should return all users', async () => {
		const spy = jest.spyOn(userService, 'getAllUsersReq');
		userService.getAllUsersReq();

		expect(spy).toHaveBeenCalledTimes(1);
	});
});
