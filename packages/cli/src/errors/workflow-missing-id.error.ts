import type { Workflow, IWorkflowBase } from 'aura-workflow';
import { UnexpectedError } from 'aura-workflow';

export class WorkflowMissingIdError extends UnexpectedError {
	constructor(workflow: Workflow | IWorkflowBase) {
		super('Detected ID-less worklfow', { extra: { workflow } });
	}
}
