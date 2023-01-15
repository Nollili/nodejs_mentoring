const validateSchema = (schema) => {
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

export default validateSchema;
