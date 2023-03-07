import jwt from 'jsonwebtoken';

export const authLogin = (req, res, next) => {
	const token = req.cookies.access_token;

	if (token) {
		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, userId) => {
			if (err) {
				return res.status(403).json('Invalid token');
			}
			req.user = {
				id: userId,
			};
		});
	} else {
		return res.status(401).json('Token is absent');
	}

	next();
};
