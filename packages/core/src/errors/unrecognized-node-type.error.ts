import { UserError } from 'aura-workflow';

export class UnrecognizedNodeTypeError extends UserError {
	constructor(packageName: string, nodeType: string) {
		super(`Unrecognized node type: ${packageName}.${nodeType}`);
	}
}
