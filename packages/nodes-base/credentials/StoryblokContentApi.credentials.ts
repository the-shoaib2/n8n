import type { ICredentialType, INodeProperties } from 'aura-workflow';

export class StoryblokContentApi implements ICredentialType {
	name = 'storyblokContentApi';

	displayName = 'Storyblok Content API';

	documentationUrl = 'storyblok';

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
