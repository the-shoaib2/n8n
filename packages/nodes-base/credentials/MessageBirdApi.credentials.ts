import type { ICredentialType, INodeProperties } from 'aura-workflow';

export class MessageBirdApi implements ICredentialType {
	name = 'messageBirdApi';

	displayName = 'MessageBird API';

	documentationUrl = 'messagebird';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'accessKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
		},
	];
}
