import { transports, format, createLogger } from 'winston';

const requestLogger = createLogger({
	transports: [
		new transports.Console(),
		new transports.File({
			level: 'info',
			filename: 'requests.log',
		}),
	],
	format: format.combine(
		format.json(),
		format.timestamp(),
		format.metadata(),
		format.prettyPrint()
	),
});

const warningErrorLogger = createLogger({
	transports: [
		new transports.Console(),
		new transports.File({
			level: 'warning',
			filename: 'warnings.log',
		}),
		new transports.File({
			level: 'error',
			filename: 'errors.log',
		}),
	],
	format: format.combine(
		format.json(),
		format.timestamp(),
		format.metadata(),
		format.prettyPrint()
	),
});

const internalErrorLogger = createLogger({
	transports: [
		new transports.File({
			filename: 'internalErrors.log',
		}),
	],
	format: format.combine(
		format.json(),
		format.timestamp(),
		format.metadata(),
		format.prettyPrint()
	),
});

export { requestLogger, warningErrorLogger, internalErrorLogger };
