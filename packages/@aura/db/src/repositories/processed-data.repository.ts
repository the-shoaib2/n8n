import { Service } from '@aura/di';
import { DataSource, Repository } from '@n8n/typeorm';

import { ProcessedData } from '../entities';

@Service()
export class ProcessedDataRepository extends Repository<ProcessedData> {
	constructor(dataSource: DataSource) {
		super(ProcessedData, dataSource.manager);
	}
}
