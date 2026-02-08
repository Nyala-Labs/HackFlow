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
