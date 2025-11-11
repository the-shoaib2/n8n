import type { IDataObject } from 'aura-workflow';

export interface ICompany {
	remote_created_at?: string;
	company_id?: string;
	name?: string;
	monthly_spend?: number;
	plan?: string;
	size?: number;
	website?: string;
	industry?: string;
	custom_attributes?: IDataObject;
}
