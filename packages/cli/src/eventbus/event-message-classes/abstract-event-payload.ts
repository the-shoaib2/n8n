import type { IWorkflowBase, JsonValue } from 'aura-workflow';

export interface AbstractEventPayload {
	[key: string]: JsonValue | IWorkflowBase | undefined;
}
