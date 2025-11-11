import type { ICredentialTestRequest, ICredentialType, INodeProperties } from 'aura-workflow';

export class CodaApi implements ICredentialType {
	name = 'codaApi';

	displayName = 'Coda API';

	documentationUrl = 'coda';

	properties: INodeProperties[] = [
		{
			displayName: 'Access Token',
			name: 'accessToken',
			type: 'string',
			typeOptions: { password: true },
			default: '',
		},
	];

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://coda.io/apis/v1/whoami',
			headers: {
				Authorization: '=Bearer {{$credentials.accessToken}}',
			},
		},
	};
}
