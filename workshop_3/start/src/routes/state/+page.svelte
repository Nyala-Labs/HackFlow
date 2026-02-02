<script lang="ts">
	import FancyInput from '$lib/components/FancyInput.svelte';
	let count = $state(0);
	let name = $state('Svelte');
	let message = $state('hello');

	// Derived state from the 'count' state
	let doubled = $derived(() => count * 2);

	// Effect that runs whenever 'count' changes
	$effect(() => {
		console.log(`Count changed to ${count}`);
	});

	// Inspection for debugging, logs state changes upon updates
	$inspect('count', count);
	$inspect('name', name);
</script>

<div class="max-w-2xl mx-auto">
	<!-- State -->
	<p>Hello {name}!</p>
	<input type="text" bind:value={name} />

	<!-- Derived -->
	<p>Count doubled is {doubled}</p>
	<button on:click={() => count++}>
		Clicked {count}
		{count === 1 ? 'time' : 'times'}
	</button>

	<!-- Bindable -->
	<FancyInput bind:value={message} />
	<p>{message}</p>
</div>
