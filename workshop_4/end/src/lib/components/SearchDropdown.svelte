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
