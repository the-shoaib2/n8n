import type { ICredentialType, INodeProperties } from 'aura-workflow';

export class AutomizyApi implements ICredentialType {
	name = 'automizyApi';

	displayName = 'Automizy API';

	documentationUrl = 'automizy';

	properties: INodeProperties[] = [
		{
			displayName:
				'This service may no longer exist and will be removed from aura in a future release.',
			name: 'deprecated',
			type: 'notice',
			default: '',
		},
		{
			displayName: 'API Token',
			name: 'apiToken',
			type: 'string',
			typeOptions: { password: true },
			default: '',
		},
	];
}
