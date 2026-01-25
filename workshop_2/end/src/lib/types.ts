import type { durations, hackathonThemes } from '$lib/constants';

export type hackathonThemesType = (typeof hackathonThemes)[number];
export type durationType = (typeof durations)[number];

export type aiResponseType = {
	techStack?: string[];
	coreFeatures?: string[];
	teamAllocation?: Record<string, string>[];
	pitch: string;
	solution: string;
};
export type FieldKind = 'input' | 'textarea' | 'select' | 'search-select';

export type FormField = {
	label: string;
	name: string;
	type: FieldKind;
	placeholder?: string;
	inputType?: 'number' | 'text';
	options?: string[];
	min?: number;
	max?: number;
	required?: boolean;
};
