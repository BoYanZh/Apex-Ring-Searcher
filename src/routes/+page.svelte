<script>
	import Main from '$lib/main.svelte';
</script>

<div class="min-h-screen flex flex-col">
	<header class="text-center m-4">
		<h1 class="text-blue-600 text-5xl font-bold align-middle">Apex Ring Searcher</h1>
	</header>
	<main class="flex-1">
		<Main />
	</main>
	<footer class="text-center m-4">
		<p>
			Powered by <a class="text-blue-600 underline" href="https://kit.svelte.dev/">SvelteKit</a> +
			<a class="text-blue-600 underline" href="https://tailwindcss.com/">Tailwind CSS</a>.
		</p>
	</footer>
</div>
