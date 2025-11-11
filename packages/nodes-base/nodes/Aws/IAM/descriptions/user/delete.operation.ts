import type { INodeProperties } from 'aura-workflow';
import { updateDisplayOptions } from 'aura-workflow';

import { userLocator } from '../common';

const properties: INodeProperties[] = [
	{
		...userLocator,
		description: 'Select the user you want to delete',
	},
];

const displayOptions = {
	show: {
		resource: ['user'],
		operation: ['delete'],
	},
};

export const description = updateDisplayOptions(displayOptions, properties);
