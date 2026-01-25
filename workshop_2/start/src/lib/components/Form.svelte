<script lang="ts">
	import * as Field from '$lib/components/ui/field';
	import { Input } from '$lib/components/ui/input';
	import { durations, type hackathonThemesType } from '$lib/imports';
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
			</Field.Field>
		{/each}
	</Field.Group>
</Field.Set>
