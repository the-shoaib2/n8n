import { Column, Entity, ManyToOne, PrimaryColumn } from '@aura/typeorm';
import { IConnections } from 'aura-workflow';
import type { INode } from 'aura-workflow';

import { JsonColumn, WithTimestamps } from './abstract-entity';
import { WorkflowEntity } from './workflow-entity';

@Entity()
export class WorkflowHistory extends WithTimestamps {
	@PrimaryColumn()
	versionId: string;

	@Column()
	workflowId: string;

	@JsonColumn()
	nodes: INode[];

	@JsonColumn()
	connections: IConnections;

	@Column()
	authors: string;

	@ManyToOne('WorkflowEntity', {
		onDelete: 'CASCADE',
	})
	workflow: WorkflowEntity;
}
