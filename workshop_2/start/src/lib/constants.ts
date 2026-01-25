import type { FormField } from './types';

export const hackathonThemes = [
	'Artificial Intelligence & Machine Learning',
	'Web Development',
	'Mobile App Development',
	'HealthTech',
	'EdTech',
	'FinTech',
	'Climate Change & Sustainability',
	'Smart Cities',
	'Internet of Things (IoT)',
	'Cybersecurity',
	'Blockchain & Web3',
	'AR / VR / Metaverse',
	'Social Good & Nonprofits',
	'Accessibility & Inclusion',
	'Productivity & Automation',
	'Gaming & Entertainment',
	'Open Innovation',
	'Data Science & Analytics',
	'E-commerce & Retail',
	'Agriculture & FoodTech'
] as const;

export const durations = ['1 hr', '24 hrs', '48 hours', '1 week', 'A month', '> 1 month'] as const;

export const allFields: FormField[] = [
	{
		label: 'Hackathon Name',
		type: 'input',
		name: 'title',
		placeholder: 'e.g. AI for Good Hackathon',
		required: true
	},
	{
		label: 'Problem Statement',
		type: 'textarea',
		name: 'description',
		placeholder: 'Describe the problem your hackathon aims to solve',
		required: true
	},
	{
		label: 'Duration',
		type: 'select',
		placeholder: 'Select duration',
		name: 'duration',
		options: Array.from(durations)
	},
	{
		label: 'Theme',
		type: 'search-select',
		name: 'theme'
	},
	{
		label: 'Team Members',
		type: 'input',
		inputType: 'number',
		name: 'members',
		placeholder: 'Number of team members',
		required: true,
		min: 1
	}
] as const;

export const systemInstructions = `
			Ensure that:

			- The output is **valid JSON** only, no explanations, extra text or even any extra tags I MUST be able to use Json.parse to successfully one shot parse this response.
			- Use the team size to reasonably allocate members across roles.
			- The image prompt should be descriptive enough for AI image generation (e.g., futuristic hackathon project concept illustration).

			Output the following to me in plain text so I may parse it:
							`;
