import { UserError } from 'aura-workflow';

export class DisallowedModuleError extends UserError {
	constructor(moduleName: string) {
		super(`Module '${moduleName}' is disallowed`);
	}
}
