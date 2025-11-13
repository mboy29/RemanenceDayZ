<script lang="ts">
	import '../../app.css';
	import favicon from '$lib/assets/favicon.png';
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="min-h-screen bg-background text-foreground">
	<main class="max-w-4xl mx-auto px-4 py-8">
		<slot />
	</main>
</div>
