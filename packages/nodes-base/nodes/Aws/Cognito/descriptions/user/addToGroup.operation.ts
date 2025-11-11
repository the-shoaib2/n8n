import type { INodeProperties } from 'aura-workflow';
import { updateDisplayOptions } from 'aura-workflow';

import {
	groupResourceLocator,
	userPoolResourceLocator,
	userResourceLocator,
} from '../common.description';

const properties: INodeProperties[] = [
	{
		...userPoolResourceLocator,
		description: 'Select the user pool to use',
	},
	{
		...userResourceLocator,
		description: 'Select the user you want to add to the group',
	},
	{
		...groupResourceLocator,
		description: 'Select the group you want to add the user to',
	},
];

const displayOptions = {
	show: {
		resource: ['user'],
		operation: ['addToGroup'],
	},
};

export const description = updateDisplayOptions(displayOptions, properties);
