module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es6: true,
		es2021: true,
		node: true,
		jest: true,
	},
	parser: '@typescript-eslint/parser',
	extends: 'eslint:recommended',
	overrides: [],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	rules: {},
};
