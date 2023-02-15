import Joi from 'joi';
import { Permission } from '../models/group-model';

export const userSchema = Joi.object().keys({
	login: Joi.string().alphanum().min(3).max(30).required(),
	password: Joi.string()
		.pattern(new RegExp('(?=.*[A-Za-z])(?=.*d)[A-Za-z0-9]{3,30}$'))
		.required(),
	age: Joi.number().integer().min(4).max(130).required(),
});

export const groupSchema = Joi.object().keys({
	name: Joi.string().alphanum().min(3).max(30).required(),
	permissions: Permission,
});

export const validateSchema = (schema) => {
	return (req, res, next) => {
		const { error } = schema.validate(req.body, {
			abortEarly: true,
			allowUnknow: false,
		});

		if (error && error.isJoi) {
			return res.status(400).json(error.details);
		}
		next();
	};
};
