import { WorkflowOperationError } from 'aura-workflow';

export class WorkflowCrashedError extends WorkflowOperationError {
	constructor() {
		super('Workflow did not finish, possible out-of-memory issue');
	}
}
