import { UserError } from 'aura-workflow';

export class InvalidSamlMetadataError extends UserError {
	constructor(detail: string = '') {
		super(`Invalid SAML metadata${detail ? ': ' + detail : ''}`);
	}
}
