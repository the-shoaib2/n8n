import type { ICredentialType, INodeProperties } from 'aura-workflow';

export class HumanticAiApi implements ICredentialType {
	name = 'humanticAiApi';

	displayName = 'Humantic AI API';

	documentationUrl = 'humanticai';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
		},
	];
}
