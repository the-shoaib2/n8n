import { UnexpectedError } from 'aura-workflow';

export class DeduplicationError extends UnexpectedError {
	constructor(message: string) {
		super(`Deduplication Failed: ${message}`);
	}
}
