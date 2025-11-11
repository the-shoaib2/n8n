import { UserError } from 'aura-workflow';

export class TaskDeferredError extends UserError {
	constructor() {
		super('Task deferred until runner is ready');
	}
}
