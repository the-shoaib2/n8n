import { UserError } from 'aura-workflow';

export class DataTableColumnNotFoundError extends UserError {
	constructor(dataTableId: string, columnId: string) {
		super(`Could not find the column '${columnId}' in the data table: ${dataTableId}`, {
			level: 'warning',
		});
	}
}
