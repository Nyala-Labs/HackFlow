<script lang="ts">
	let { children } = $props();
</script>

<div class="flex min-h-screen flex-col bg-linear-to-b from-red-800 to-red-500">
	{@render children()}
</div>
