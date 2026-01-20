<script lang="ts">
	import { Container, Footer, Landing, Nav } from '$lib/imports';
</script>

<Container>
	<Nav />
	<Landing />

	<section id="chat" class="flex w-full flex-col items-center px-4 py-24">
		<p class="mb-4 text-4xl font-semibold text-white">Generate Your Magnum Opus</p>
		<p class="mb-12 max-w-xl text-center text-white/80">
			Fill in your hackathon details and let AI craft a project idea tailored for your team.
		</p>
	</section>

	<Footer />
</Container>
