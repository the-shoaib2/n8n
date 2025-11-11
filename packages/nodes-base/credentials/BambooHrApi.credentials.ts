import type { ICredentialType, INodeProperties } from 'aura-workflow';

export class BambooHrApi implements ICredentialType {
	name = 'bambooHrApi';

	displayName = 'BambooHR API';

	documentationUrl = 'bamboohr';

	properties: INodeProperties[] = [
		{
			displayName: 'Subdomain',
			name: 'subdomain',
			type: 'string',
			default: '',
		},
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
		},
	];
}
