import { UserError } from 'aura-workflow';

export class DataTableValidationError extends UserError {
	constructor(msg: string) {
		super(`Validation error with data table request: ${msg}`, {
			level: 'warning',
		});
	}
}
