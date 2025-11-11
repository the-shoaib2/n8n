import { type IDataDeduplicator } from 'aura-workflow';

import { DeduplicationHelper } from './deduplication-helper';

export function getDataDeduplicationService(): IDataDeduplicator {
	return new DeduplicationHelper();
}
