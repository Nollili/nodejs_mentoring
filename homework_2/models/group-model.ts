enum Permission {
	'READ',
	'WRITE',
	'DELETE',
	'SHARE',
	'UPLOAD_FILES',
}

type Group = {
	id: string;
	name: string;
	permissions: Array<Permission>;
};

export { Permission, Group };
