import { UserError } from 'aura-workflow';

export class DataTableNotFoundError extends UserError {
	constructor(dataTableId: string) {
		super(`Could not find the data table: '${dataTableId}'`, {
			level: 'warning',
		});
	}
}
