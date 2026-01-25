# Web Dev Series: Workshop 2 - Building Forms and Search Dropdowns with SvelteKit and Svelte 5

Welcome to Workshop 2 of our Web Dev Series! In this workshop, we'll dive deep into building interactive forms and a dynamic search dropdown using SvelteKit and the new Svelte 5 runes. We'll leverage SvelteKit's powerful form actions for server-side data handling and validation, ensuring a robust and user-friendly experience.

## Workshop Goals

By the end of this workshop, you will be able to:

*   Understand and implement SvelteKit's form actions for handling `POST` requests.
*   Utilize `use:enhance` for progressive enhancement in forms.
*   Implement server-side form validation using Zod.
*   Create reusable form components with dynamic field rendering.
*   Build a custom search dropdown component.
*   Integrate Svelte 5 runes (`$state`, `$derived`, `$effect`, `$props`, `$bindable`) for efficient reactivity.

## Setup

To get started, navigate to the `workshop_2/start` directory.

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Run the Development Server:**
    ```bash
    npm run dev
    ```
    Open your browser to `http://localhost:5173` (or the port indicated in your terminal).

## Workshop Steps

### Step 1: Understanding the Starting Point (`workshop_2/start`)

The `workshop_2/start` directory contains a basic SvelteKit project with a navigation bar, a landing section, and a footer. We have already pre-populated some essential files and created placeholders for the components we'll be building.

### Step 2: Core Data Structures and Utilities

We've provided the foundational TypeScript files that define our data structures, validation schema, and utility functions. These files are fully populated and ready to use.

*   **`src/lib/types.ts`**: Defines custom types for our form fields, AI response, and other data.
*   **`src/lib/constants.ts`**: Holds static data like hackathon themes, durations, and the configuration for our form fields.
*   **`src/lib/schema.ts`**: Uses Zod to define the validation schema for our form data.
*   **`src/lib/utils.ts`**: Provides utility functions, such as `cn` for Tailwind CSS class merging.
*   **`src/lib/imports.ts`**: Centralizes exports for easier importing across the application.

You can review these files in `workshop_2/start/src/lib/`.

### Step 3: UI Components (Input, Select, etc.)

Our form relies on a set of pre-built UI components (Input, Select, Textarea, Field, Button, etc.) for a consistent look and feel.

**Action:** Copy the entire `ui` directory from `workshop_2/end/src/lib/components/` to `workshop_2/start/src/lib/components/`.

```bash
cp -r /home/donewithwork/Desktop/web_dev_series/workshop_2/end/src/lib/components/ui /home/donewithwork/Desktop/web_dev_series/workshop_2/start/src/lib/components/
```

### Step 4: Building the `Form.svelte` Component

The `Form.svelte` component is responsible for dynamically rendering our form fields. We've provided the basic structure, and now you'll complete the conditional rendering for each field type.

**File to modify:** `workshop_2/start/src/lib/components/Form.svelte`

**Current content:**
```svelte
<!-- src/lib/components/Form.svelte -->
<script lang="ts">
	import * as Field from '$lib/components/ui/field';
	import { Input } from '$lib/components/ui/input';
	import * as Select from '$lib/components/ui/select';
	import { Textarea } from '$lib/components/ui/textarea';
	import {
		durations,
		hackathonThemes,
		SearchDropdown,
		type hackathonThemesType
	} from '$lib/imports';
	import type { durationType, FormField } from '$lib/types';
	import type { ActionData } from '../../routes/$types';

	// TODO: Initialize themeVal state
	let themeVal = $state<hackathonThemesType>('AR / VR / Metaverse');

	let { fields, form }: { fields: FormField[]; form: ActionData } = $props();
	// TODO: Initialize selectValue state
	let selectValue = $state<durationType>('1 hr');
	const selectValueDerived = $derived(
		durations.find((f) => f === selectValue) ?? 'Select a duration'
	);
</script>

<Field.Set>
	<Field.Group class="gap-4">
		{#each fields as field (field.name)}
			<Field.Field>
				<Field.Label>{field.label}</Field.Label>

				<!-- TODO: Implement conditional rendering for different field types (input, textarea, select, search-select) -->
				<!-- Example for input type: -->
				{#if field.type === 'input'}
					<Input
						type={field.inputType ?? 'text'}
						name={field.name}
						placeholder={field.placeholder}
						required={field.required}
						min={field.min}
						max={field.max}
					/>
				{/if}

				{#if form && form.errors}
					<Field.Error>{form.errors[field.name as keyof typeof form.errors]}</Field.Error>
				{/if}
			</Field.Field>
		{/each}
	</Field.Group>
</Field.Set>
```

**Action:** Replace the `<!-- TODO: Implement conditional rendering ... -->` comment block with the following code to handle `textarea`, `select`, and `search-select` field types. Also, ensure `themeVal` and `selectValue` are initialized correctly.

**Updated `Form.svelte` content:**
```svelte
<!-- src/lib/components/Form.svelte -->
<script lang="ts">
	import * as Field from '$lib/components/ui/field';
	import { Input } from '$lib/components/ui/input';
	import * as Select from '$lib/components/ui/select';
	import { Textarea } from '$lib/components/ui/textarea';
	import {
		durations,
		hackathonThemes,
		SearchDropdown,
		type hackathonThemesType
	} from '$lib/imports';
	import type { durationType, FormField } from '$lib/types';
	import type { ActionData } from '../../routes/$types';

	let themeVal = $state<hackathonThemesType>('AR / VR / Metaverse');

	let { fields, form }: { fields: FormField[]; form: ActionData } = $props();
	let selectValue = $state<durationType>('1 hr');
	const selectValueDerived = $derived(
		durations.find((f) => f === selectValue) ?? 'Select a duration'
	);
</script>

<Field.Set>
	<Field.Group class="gap-4">
		{#each fields as field (field.name)}
			<Field.Field>
				<Field.Label>{field.label}</Field.Label>

				{#if field.type === 'input'}
					<Input
						type={field.inputType ?? 'text'}
						name={field.name}
						placeholder={field.placeholder}
						required={field.required}
						min={field.min}
						max={field.max}
					/>
				{/if}

				{#if field.type === 'textarea'}
					<Textarea
						name={field.name}
						placeholder={field.placeholder}
						required={field.required}
						class="resize-none"
					/>
				{/if}

				{#if field.type === 'select'}
					<Select.Root name={field.name} type="single" bind:value={selectValue}>
						<Select.Trigger>
							{selectValueDerived}
						</Select.Trigger>

						<Select.Content>
							<Select.Group>
								{#each field.options ?? [] as opt}
									<Select.Item value={opt} label={opt}>
										{opt}
									</Select.Item>
								{/each}
							</Select.Group>
						</Select.Content>
					</Select.Root>
				{/if}

				{#if field.type === 'search-select'}
					<SearchDropdown items={hackathonThemes} name="theme" bind:value={themeVal} />
				{/if}

				{#if form && form.errors}
					<Field.Error>{form.errors[field.name as keyof typeof form.errors]}</Field.Error>
				{/if}
			</Field.Field>
		{/each}
	</Field.Group>
</Field.Set>
```

### Step 5: Building the `SearchDropdown.svelte` Component

The `SearchDropdown.svelte` component provides a searchable input with a dropdown list. You'll complete the filtering logic and the rendering of the filtered items.

**File to modify:** `workshop_2/start/src/lib/components/SearchDropdown.svelte`

**Current content:**
```typescript
<!-- src/lib/components/SearchDropdown.svelte -->
<script lang="ts">
	import * as Field from '$lib/components/ui/field/index.js';
	import { cn } from '$lib/utils';
	import type { hackathonThemesType } from '../types';
	import { Input } from './ui/input';

	type Props = {
		items: readonly hackathonThemesType[];
		name: string;
		value: string;
		placeholder?: string;
	};

	let { items, name, value = $bindable(), placeholder = '' }: Props = $props();

	let open = $state(false);
	let query = $state('');

	// TODO: Implement filtering logic for items based on query
	let filtered = $derived(items.filter((i) => i.toLowerCase().includes(query.toLowerCase())));

	const close = () => (open = false);

	$effect(() => {
		window.addEventListener('click', close);
		return () => window.removeEventListener('click', close);
	});
</script>

<Field.Field>
	<div class="relative">
		<Input
			{name}
			readonly
			{value}
			{placeholder}
			class={cn(
				'w-full cursor-pointer focus:border-gray-400 focus-visible:ring-0 ',
				open ? 'rounded-b-none' : ''
			)}
			onclick={(e) => {
				e.stopPropagation();
				open = !open;
				query = '';
			}}
		/>

		{#if open}
			<div class="absolute top-0 z-10 w-full shadow-sm">
				<Input
					placeholder="Search..."
					class="w-full rounded-b-none  focus-visible:ring-0"
					bind:value={query}
					onclick={(e) => e.stopPropagation()}
				/>

				<div class="max-h-40 overflow-y-auto">
					<!-- TODO: Implement rendering of filtered items -->
					{#each filtered as item}
						<Field.Label
							class=" w-full bg-white px-3 py-2 text-left hover:bg-gray-100 "
							onclick={() => {
								value = item;
								open = false;
								query = '';
							}}
						>
							{item}
						</Field.Label>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</Field.Field>
```

**Action:** The `SearchDropdown.svelte` component is already fully implemented in the provided "Current content" above. The `TODO` comments are placeholders for the workshop, but the code is complete. No changes are needed for this step.

### Step 6: Implementing Server-Side Logic (`+page.server.ts`)

This file defines our SvelteKit form action for handling submissions, validating data, and interacting with the AI. We've provided the basic structure, and you'll complete the core logic.

**File to modify:** `workshop_2/start/src/routes/+page.server.ts`

**Current content:**
```typescript
// src/routes/+page.server.ts
import { env } from '$env/dynamic/private';
import { systemInstructions } from '$lib/constants';
import { chatSchema } from '$lib/schema';
import { GoogleGenAI } from '@google/genai';
import { fail } from '@sveltejs/kit';
import z from 'zod';
import type { Actions } from './$types';

const ai = new GoogleGenAI({
	apiKey: env.API_KEY!
});

export const actions = {
	chat: async (event) => {
		// TODO: Implement form data parsing and validation using chatSchema
		const data = await event.request.formData();
		const parsedData = chatSchema.safeParse(Object.fromEntries(data));

		if (!parsedData.success) {
			console.log(z.treeifyError(parsedData.error).properties);
			return fail(400, {
				success: false,
				errors: z.treeifyError(parsedData.error),
				response: null
			});
		}

		// TODO: Implement AI interaction using GoogleGenAI
		const response = await ai.models.generateContent({
			model: 'gemini-2.5-flash',
			config: {
				systemInstruction: systemInstructions
			},
			contents: `
			You are an AI Hackathon Idea Generator. Given the following input:

			- Hackathon Name: ${parsedData.data.title}
			- Description: ${parsedData.data.description}
			- Duration: ${parsedData.data.duration}
			- Theme: ${parsedData.data.theme}
			- Team Size: ${parsedData.data.members}

			Generate a **JSON object only**, parseable, with the following keys:

			{
			"pitch": "A one-liner describing the idea",
			"solution": "Brief explanation of the solution",
			"techStack": ["list of suggested technologies"],
			"coreFeatures": ["list of main features"],
			"teamAllocation": {
				"Frontend": "number of team members",
				"Backend": "number of team members",
				"Designer": "number of team members",
				"OtherRoles": "if any"
			},
			}

			`
		});

		if (!response.text) return fail(500, { success: false, errors: null, response: null });
		let jsonText = response.text.trim();

		if (jsonText.startsWith('```')) {
			jsonText = jsonText.replace(/^```(json)?\n?/, '').replace(/```$/, '');
		}

		const aiJson = JSON.parse(jsonText);

		return { success: true, response: aiJson, errors: null };
	}
} satisfies Actions;
```

**Action:** The `+page.server.ts` file is already fully implemented in the provided "Current content" above. The `TODO` comments are placeholders for the workshop, but the code is complete. No changes are needed for this step.

### Step 7: Integrating into the Main Page (`+page.svelte`)

Our main page (`+page.svelte`) will host the form and display the AI-generated response. You'll complete the `use:enhance` logic, loading state, and AI response handling.

**File to modify:** `workshop_2/start/src/routes/+page.svelte`

**Current content:**
```svelte
<!-- src/routes/+page.svelte -->
<script lang="ts">
	import AiResponse from '$lib/components/AiResponse.svelte';
	import Form from '$lib/components/Form.svelte';
	import { allFields } from '$lib/constants';
	import { Button, cn, Container, enhance, Footer, Landing, Nav } from '$lib/imports';

	import type { aiResponseType } from '$lib/imports';
	import { LoaderCircle } from 'svelte-lucide';

	let aiResponse = $state<aiResponseType | null>(null);

	let loading = $state<boolean>(false);
	let { form } = $props();
</script>

<Container>
	<Nav />
	<Landing />

	<section id="chat" class="flex w-full flex-col items-center px-4 py-24">
		<p class="mb-4 text-4xl font-semibold text-white">Generate Your Magnum Opus</p>
		<p class="mb-12 max-w-xl text-center text-white/80">
			Fill in your hackathon details and let AI craft a project idea tailored for your team.
		</p>

		<div class="h-full w-full max-w-7xl">
			<div
				class="flex h-full flex-col gap-8 rounded-xl bg-white/80 p-6 shadow-xl backdrop-blur-md md:flex-row"
			>
				<div class="flex-4 rounded-lg bg-white p-6 shadow-md">
					<p class="mb-6 text-xl font-semibold text-gray-900">Hackathon Details</p>

					<form
						action="?/chat#chat"
						method="POST"
						<!-- TODO: Implement use:enhance for progressive enhancement and AI response handling -->
						use:enhance={({})
							=> {
							loading = true;
									return async ({ result }) => {
							loading = false;
								if (result.type === 'success' && result?.data?.response) {
									aiResponse = result.data.response as aiResponseType;
								}
								else {
									aiResponse = null;
								}
							};
						}}
					>
						<Form fields={allFields} {form} />
						<Button
							type="submit"
							class={cn(
								'mt-5 w-full rounded-md px-4 py-2 text-white  focus:ring-2  focus:ring-offset-2 focus:outline-none',
								loading ? 'cursor-not-allowed opacity-50' : ''
							)}
							disabled={loading}
						>
							{#if loading}
								<LoaderCircle class="mr-2 inline-block animate-spin" size={'16'} />
								Generating...
							{:else}
								Generate Idea
							{/if}
						</Button>
					</form>
				</div>

				<AiResponse {aiResponse} />
			</div>
		</div>
	</section>

	<Footer />
</Container>
```

**Action:** The `+page.svelte` file is already fully implemented in the provided "Current content" above. The `TODO` comments are placeholders for the workshop, but the code is complete. No changes are needed for this step.

### Step 8: Displaying the AI Response (`AiResponse.svelte`)

The `AiResponse.svelte` component is responsible for displaying the AI-generated hackathon idea. You'll complete the rendering of the AI response details.

**File to modify:** `workshop_2/start/src/lib/components/AiResponse.svelte`

**Current content:**
```svelte
<!-- src/lib/components/AiResponse.svelte -->
<script lang="ts">
	import type { aiResponseType } from '$lib/types';
	import { cn } from '$lib/utils';

	let { aiResponse }: { aiResponse: aiResponseType | null } = $props();
</script>

<div class=" flex min-h-72 flex-6 shrink-0 flex-col rounded-lg bg-white/60 p-6 shadow-inner">
	<p class="mb-4 text-xl font-semibold text-gray-900">Your Winning AI Idea</p>

	<div
		class={cn(
			'flex flex-1 flex-col items-center justify-center rounded-md border border-dashed border-gray-300 p-4 transition-opacity duration-700 ease-in-out',
			aiResponse ? 'opacity-100' : 'opacity-0'
		)}
	>
		{#if aiResponse}
			<!-- TODO: Implement displaying AI response details here -->
			<p class="font-semibold text-gray-800">{aiResponse.pitch}</p>
			<p class="mt-2 whitespace-pre-wrap text-gray-700">{aiResponse.solution}</p>
		{:else}
			<p class="max-w-sm text-center text-gray-500">
				Your AI-generated hackathon idea will appear here once you submit the form.
			</p>
		{/if}
	</div>
</div>
```

**Action:** Replace the `<!-- TODO: Implement displaying AI response details here -->` comment block with the following code to display the full AI response.

**Updated `AiResponse.svelte` content:**
```svelte
<!-- src/lib/components/AiResponse.svelte -->
<script lang="ts">
	import type { aiResponseType } from '$lib/types';
	import { cn } from '$lib/utils';

	let { aiResponse }: { aiResponse: aiResponseType | null } = $props();
</script>

<div class=" flex min-h-72 flex-6 shrink-0 flex-col rounded-lg bg-white/60 p-6 shadow-inner">
	<p class="mb-4 text-xl font-semibold text-gray-900">Your Winning AI Idea</p>

	<div
		class={cn(
			'flex flex-1 flex-col items-center justify-center rounded-md border border-dashed border-gray-300 p-4 transition-opacity duration-700 ease-in-out',
			aiResponse ? 'opacity-100' : 'opacity-0'
		)}
	>
		{#if aiResponse}
			<!-- Pitch -->
			<p class="font-semibold text-gray-800">{aiResponse.pitch}</p>

			<!-- Solution / Description -->
			<p class="mt-2 whitespace-pre-wrap text-gray-700">{aiResponse.solution}</p>

			{#if aiResponse.techStack}
				<div class="mt-3 w-full">
					<p class="mb-1 font-semibold text-gray-800">Tech Stack:</p>
					<ul class="list-inside list-disc text-gray-700">
						{#each aiResponse.techStack as tech}
							<li>{tech}</li>
						{/each}
					</ul>
				</div>
			{/if}

			<!-- Core Features -->
			{#if aiResponse.coreFeatures}
				<div class="mt-3 w-full">
					<p class="mb-1 font-semibold text-gray-800">Core Features:</p>
					<ul class="list-inside list-disc text-gray-700">
						{#each aiResponse.coreFeatures as feature}
							<li>{feature}</li>
						{/each}
					</ul>
				</div>
			{/if}

			<!-- Team Allocation -->
			{#if aiResponse.teamAllocation}
				<div class="mt-3 w-full">
					<p class="mb-1 font-semibold text-gray-800">Team Allocation:</p>
					<ul class="list-inside list-disc text-gray-700">
						{#each Object.entries(aiResponse.teamAllocation) as [role, count]}
							<li>{role}: {count}</li>
						{/each}
					</ul>
				</div>
			{/if}
		{:else}
			<p class="max-w-sm text-center text-gray-500">
				Your AI-generated hackathon idea will appear here once you submit the form.
			</p>
		{/if}
	</div>
</div>
```

## Conclusion

You have now successfully implemented a dynamic form with a search dropdown, leveraging SvelteKit's form actions, server-side validation with Zod, and Svelte 5 runes for reactivity. This setup provides a solid foundation for building complex and interactive forms in your SvelteKit applications.

Feel free to experiment with adding more fields, custom validation rules, or enhancing the UI further!