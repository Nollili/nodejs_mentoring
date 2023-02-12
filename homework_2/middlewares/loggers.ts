const requestLogger = (methodName: string, args: any[]) => {
	const calledMethod = `Method: ${methodName} was called`;
	const withArgs = args.length === 0 ? '' : ` with arguments: ${args}`;
	console.log(calledMethod, withArgs);
};

const requestErrorLogger = (methodName: string, args: any[], error: Error) => {
	const calledMethod = `Method: ${methodName} call failed`;
	const errorMessage = `on ${error}`;
	const withArgs = args.length === 0 ? '' : ` with arguments: ${args}`;
	console.log(calledMethod, errorMessage, withArgs);
};

export { requestLogger, requestErrorLogger };
