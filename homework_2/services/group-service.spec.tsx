const defaultGroups = [
	{
		id: 'b6892453-1aca-43c5-ab83-7f8937f76598',
		name: 'First Group',
		permissions: ['READ', 'SHARE'],
		createdAt: '2023-03-15T11:12:44.106Z',
		updatedAt: '2023-03-15T11:12:44.106Z',
	},
	{
		id: '4b7650e5-42d3-4ade-a95e-f9e14b964fca',
		name: 'Second Group',
		permissions: ['WRITE', 'DELETE', 'UPLOAD_FILES'],
		createdAt: '2023-03-15T11:12:44.182Z',
		updatedAt: '2023-03-15T11:12:44.182Z',
	},
];

jest.mock('../controllers/group-controller', () => ({
	getAllGroups: jest.fn().mockResolvedValue(defaultGroups),
	getGroupById: jest.fn().mockResolvedValue(defaultGroups[0]),
	createGroup: jest.fn().mockResolvedValue({
		id: 'd45621c9-5ec1-47ea-8958-8f7db366d182',
		name: 'newGroup',
		permissions: ['DELETE'],
	}),
	updateGroup: jest.fn().mockResolvedValue({}),
	deleteGroup: jest.fn().mockResolvedValue({}),
	addUserToGroup: jest.fn().mockResolvedValue({
		id: 'e3a13b49-715e-486b-ac17-59f9b89b7a75',
		UserId: '16c4f061-b629-4a49-9537-a86a8d8ac5f9',
		GroupId: 'd45621c9-5ec1-47ea-8958-8f7db366d182',
	}),
}));

import { describe, expect } from '@jest/globals';
import { Request, Response } from 'express';
import * as groupService from '../services/group-service';

const mockResponse = (): Response => {
	const res = {
		status: {},
		json: {},
	};
	res.status = jest.fn().mockReturnValue(res);
	res.json = jest.fn().mockReturnValue(res);
	return res as Response;
};

describe('getAllGroupsReq', () => {
	it('should return all groups', async () => {
		const mockRequest = (reqData: any): Request => {
			return {
				body: { id: reqData },
			} as any as Request;
		};

		const getAllGroups = groupService.getAllGroupsReq();
		const req = mockRequest('');
		const res = mockResponse();

		await getAllGroups(req, res);
		expect(res.json).toHaveBeenCalledWith(defaultGroups);
	});
});

describe('getGroupByIdReq', () => {
	it('should return one group with the correct id', async () => {
		const id = 'b6892453-1aca-43c5-ab83-7f8937f76598';
		const mockGetGroupRequest = (reqData: any): Request => {
			return {
				params: { id: reqData },
			} as any as Request;
		};
		const getGroupById = groupService.getGroupByIdReq();
		const req = mockGetGroupRequest(id);
		const res = mockResponse();

		await getGroupById(req, res);
		expect(res.json).toHaveBeenCalledWith(defaultGroups[0]);
	});
});

describe('createGroupReq', () => {
	it('should create group', async () => {
		const newGroup = {
			id: 'd45621c9-5ec1-47ea-8958-8f7db366d182',
			name: 'newGroup',
			permissions: ['DELETE'],
		};

		const mockCreateGroupRequest = (reqData: any): Request => {
			const { id, name, permissions } = reqData;
			return {
				body: { id: id, name: name, permissions: permissions },
			} as any as Request;
		};

		const createGroup = groupService.createGroupReq();
		const req = mockCreateGroupRequest(newGroup);
		const res = mockResponse();

		await createGroup(req, res);
		expect(res.json).toHaveBeenCalledWith(newGroup);
	});
});

describe('updateGroupReq', () => {
	it('should update group', async () => {
		const updatedGroup = {
			id: '4b7650e5-42d3-4ade-a95e-f9e14b964fca',
			name: 'Second Group',
			permissions: ['WRITE'],
		};

		const mockUpdateRequest = (reqData: any): Request => {
			const { id, name, permissions } = reqData;
			return {
				body: { id: id, name: name, permissions: permissions },
			} as any as Request;
		};

		const updateGroup = groupService.updateGroupReq();
		const req = mockUpdateRequest(updatedGroup);
		const res = mockResponse();

		await updateGroup(req, res);
		expect(res.json).toHaveBeenCalledWith(
			'Group with id 4b7650e5-42d3-4ade-a95e-f9e14b964fca was updated'
		);
	});
});

describe('deleteGroupReq', () => {
	it('should delete group with given id', async () => {
		const id = 'd45621c9-5ec1-47ea-8958-8f7db366d182';
		const mockRequest = (reqData: any): Request => {
			return {
				params: { id: reqData },
			} as any as Request;
		};
		const deleteGroup = groupService.deleteGroupReq();
		const req = mockRequest(id);
		const res = mockResponse();

		await deleteGroup(req, res);
		expect(res.json).toHaveBeenCalledWith(
			'Group with id d45621c9-5ec1-47ea-8958-8f7db366d182 was deleted'
		);
	});
});

describe('addUserToGroupReq', () => {
	it('should add user to group with given id', async () => {
		const groupId = 'd45621c9-5ec1-47ea-8958-8f7db366d182';
		const userId = '16c4f061-b629-4a49-9537-a86a8d8ac5f9';

		const addUserToGroupMockRequest = (
			groupId: string,
			userId: string
		): Request => {
			return {
				params: { groupId, userId },
			} as any as Request;
		};
		const addUserToGroup = groupService.addUserToGroupReq();
		const req = addUserToGroupMockRequest(groupId, userId);
		const res = mockResponse();
		await addUserToGroup(req, res);

		expect(res.json).toHaveBeenCalledWith({
			id: 'e3a13b49-715e-486b-ac17-59f9b89b7a75',
			UserId: '16c4f061-b629-4a49-9537-a86a8d8ac5f9',
			GroupId: 'd45621c9-5ec1-47ea-8958-8f7db366d182',
		});
	});
});
