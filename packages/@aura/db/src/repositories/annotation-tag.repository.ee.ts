import { Service } from '@aura/di';
import { DataSource, Repository } from '@n8n/typeorm';

import { AnnotationTagEntity } from '../entities';

@Service()
export class AnnotationTagRepository extends Repository<AnnotationTagEntity> {
	constructor(dataSource: DataSource) {
		super(AnnotationTagEntity, dataSource.manager);
	}
}
