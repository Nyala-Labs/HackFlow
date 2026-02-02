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
