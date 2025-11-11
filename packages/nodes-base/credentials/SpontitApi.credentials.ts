import type { ICredentialType, INodeProperties } from 'aura-workflow';

export class SpontitApi implements ICredentialType {
	name = 'spontitApi';

	displayName = 'Spontit API';

	documentationUrl = 'spontit';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
		},
		{
			displayName: 'Username',
			name: 'username',
			type: 'string',
			default: '',
		},
	];
}
