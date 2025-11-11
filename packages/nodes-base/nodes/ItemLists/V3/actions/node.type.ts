import type { AllEntities } from 'aura-workflow';

type NodeMap = {
	itemList:
		| 'concatenateItems'
		| 'limit'
		| 'removeDuplicates'
		| 'sort'
		| 'splitOutItems'
		| 'summarize';
};

export type ItemListsType = AllEntities<NodeMap>;
