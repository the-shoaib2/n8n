import type { AllEntities } from 'aura-workflow';

type NodeMap = {
	text: 'message';
	image: 'analyze';
};

export type OllamaType = AllEntities<NodeMap>;
