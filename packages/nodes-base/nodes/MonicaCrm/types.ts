import type { IDataObject } from 'aura-workflow';

export type LoaderGetResponse = {
	data: Array<{
		id: string;
		name: string;
	}>;
} & IDataObject;

export type Option = {
	value: string;
	name: string;
};
