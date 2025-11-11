import type { DateTime } from 'luxon';

export {};

declare global {
	type OutputItemWithoutJsonKey = {
		[key: string]: unknown;
	} & { json?: never };

	type OutputItemWithJsonKey = {
		json: {
			[key: string]: unknown;
		};
	};

	type MaybePromise<T> = Promise<T> | T;

	type OneOutputItem = OutputItemWithJsonKey | OutputItemWithoutJsonKey;
	type AllOutputItems = OneOutputItem | Array<OneOutputItem>;

	type OutputItem = MaybePromise<OneOutputItem>;
	type OutputItems = MaybePromise<AllOutputItems>;

	interface Json {
		[key: string]: any;
	}

	interface N8nBinary {
		id: string;
		fileName: string;
		fileExtension: string;
		fileType: string;
		fileSize: string;
		mimeType: string;
	}

	interface Vars {}

	// TODO: populate dynamically
	interface Parameter {}

	interface Item<J extends Json = Json, B extends string = string> {
		json: J & Json;
		binary: Record<B, Binary>;
	}

	interface CustomData {
		set(key: string, value: string): void;
		get(key: string): string;
		getAll(): Record<string, string>;
		setAll(values: Record<string, string>): void;
	}

	type ExecutionMode = 'test' | 'production';
	interface Execution {
		id: string;
		mode: ExecutionMode;
		resumeUrl?: string;
		resumeFormUrl?: string;
		customData: CustomData;
	}

	interface Workflow {
		id: string;
		active: boolean;
		name: string;
	}

	interface PrevNode {
		name: string;
		outputIndex: number;
		runIndex: number;
	}

	const $input: Input;
	const $execution: Execution;
	const $workflow: Workflow;
	const $prevNode: PrevNode;
	const $runIndex: number;
	const $now: DateTime;
	const $today: DateTime;

	const $parameter: Parameter;
	const $vars: Vars;
	const $nodeVersion: number;

	function $jmespath(object: Object | Array<any>, expression: string): any;
	function $if<B extends boolean, T, F>(
		condition: B,
		valueIfTrue: T,
		valueIfFalse: F,
	): B extends true ? T : T extends false ? F : T | F;
	function $ifEmpty<V, E>(value: V, valueIfEmpty: E): V | E;
	function $min(...numbers: number[]): number;
	function $max(...numbers: number[]): number;
	function $evaluateExpression(expression: string): any;
	function $getWorkflowStaticData(type: 'global' | 'node'): Json;

	type SomeOtherString = string & NonNullable<unknown>;
	// @ts-expect-error NodeName is created dynamically
	function $<K extends NodeName>(
		nodeName: K | SomeOtherString,
		// @ts-expect-error NodeDataMap is created dynamically
	): K extends keyof NodeDataMap ? NodeDataMap[K] : NodeData;
}
