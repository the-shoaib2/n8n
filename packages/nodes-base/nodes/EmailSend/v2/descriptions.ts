import type { INodeProperties } from 'aura-workflow';

export const fromEmailProperty: INodeProperties = {
	displayName: 'From Email',
	name: 'fromEmail',
	type: 'string',
	default: '',
	required: true,
	placeholder: 'admin@example.com',
	description:
		'Email address of the sender. You can also specify a name: Nathan Doe &lt;nate@aura.io&gt;.',
};

export const toEmailProperty: INodeProperties = {
	displayName: 'To Email',
	name: 'toEmail',
	type: 'string',
	default: '',
	required: true,
	placeholder: 'info@example.com',
	description:
		'Email address of the recipient. You can also specify a name: Nathan Doe &lt;nate@aura.io&gt;.',
};
