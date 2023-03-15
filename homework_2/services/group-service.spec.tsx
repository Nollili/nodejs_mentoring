import { describe, expect, test } from '@jest/globals';
import * as groupController from '../controllers/group-controller';
import * as groupService from '../services/group-service';

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

const mockResponse = () => {
	const res = {
		status: {},
		json: {},
	};
	res.status = jest.fn().mockReturnValue(res);
	res.json = jest.fn().mockReturnValue(res);
	return res;
};

const mockRequest = (reqData: object) => {
	return {
		session: { data: reqData },
	};
};

describe('GET all groups', () => {
	it('should return all groups', async () => {
		const spyGroupService = jest.spyOn(groupService, 'getAllGroupsReq');
		const spyGroupController = jest.spyOn(groupController, 'getAllGroups');
		groupService.getAllGroupsReq();
		groupController.getAllGroups();

		expect(spyGroupService).toHaveBeenCalledTimes(1);
		expect(spyGroupController).toHaveBeenCalledTimes(1);
	});

	it('should return group by id, if exists', () => {
		const id = 'b6892453-1aca-43c5-ab83-7f8937f76598';
		const req = mockRequest({ id: 'b6892453-1aca-43c5-ab83-7f8937f76598' });
		const res = mockResponse();

		const spyGroupService = jest.spyOn(groupService, 'getGroupByIdReq');
		const spyGroupController = jest.spyOn(groupController, 'getGroupById');
		groupService.getGroupByIdReq();
		groupController.getGroupById(id);

		expect(spyGroupService).toHaveBeenCalledTimes(1);
		expect(spyGroupController).toHaveBeenCalledWith(id);
	});
});
