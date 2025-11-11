import type { INodeProperties } from 'aura-workflow';

import { commonOptions } from '../options';

export const toolsAgentProperties: INodeProperties[] = [
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		displayOptions: {
			show: {
				agent: ['toolsAgent'],
			},
		},
		default: {},
		placeholder: 'Add Option',
		options: [...commonOptions],
	},
];
