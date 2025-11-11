import type { AllEntities } from 'aura-workflow';

type NodeMap = {
	text: 'message';
	image: 'analyze' | 'generate';
	video: 'analyze' | 'generate' | 'download';
	audio: 'transcribe' | 'analyze';
	document: 'analyze';
	file: 'upload';
};

export type GoogleGeminiType = AllEntities<NodeMap>;
