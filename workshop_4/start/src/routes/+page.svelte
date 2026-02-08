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
						use:enhance={({}) => {
							loading = true;
								return async ({ result }) => {
								loading = false;
								if (result.type === 'success' && result?.data?.response) {
									aiResponse = result.data.response as aiResponseType;
								} else {
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
