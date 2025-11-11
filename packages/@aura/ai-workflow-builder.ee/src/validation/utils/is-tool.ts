import type { INodeTypeDescription } from 'aura-workflow';

export function isTool(nodeType: INodeTypeDescription): boolean {
	return nodeType.codex?.subcategories?.AI?.includes('Tools') ?? false;
}
