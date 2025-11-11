import type { IDataObject } from 'aura-workflow';

export interface IAttachment {
	fileName?: string;
	mimeType?: string;
	data?: string;
}

export interface IThread {
	createdAt?: string;
	customer?: IDataObject;
	imported?: boolean;
	text?: string;
	attachments?: IAttachment[];
}
