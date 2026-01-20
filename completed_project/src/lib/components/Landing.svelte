<script>
	import Gemini from '$lib/assets/gemini.png';

	import Badge from './ui/badge/badge.svelte';
	import Button from './ui/button/button.svelte';
</script>

<section
	class="relative flex h-screen flex-col items-center justify-center px-4 pt-24 text-center md:pt-32"
>
	<span class="mb-4 flex items-center gap-2 text-lg font-bold text-white">
		Powered by
		<Badge class="flex items-center gap-2 rounded-md bg-white/10 px-3 py-1 backdrop-blur-sm">
			<img src={Gemini} alt="Gemini icon" class="mb-1 h-5 w-5" />
			<span class="text-sm font-bold text-blue-500">Gemini</span>
		</Badge>
	</span>

	<h1 class="mb-4 text-5xl leading-tight font-extrabold text-white md:text-6xl">
		Welcome to HackFlow
	</h1>

	<p class="mb-8 max-w-2xl text-xl text-white/80 md:text-2xl">Your AI Hackathon Idea Generator</p>

	<a href="#chat">
		<Button
			size="lg"
			class="rounded-lg bg-white px-8 py-4 font-semibold text-red-700 shadow-xl transition hover:scale-105 hover:bg-white/90"
		>
			Get Started
		</Button>
	</a>
</section>
