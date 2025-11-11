import type { PublicInstalledPackage } from 'aura-workflow';

export interface CommunityPackageMap {
	[name: string]: PublicInstalledPackage;
}
