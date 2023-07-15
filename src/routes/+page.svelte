<script>
	import Main from '$lib/main.svelte';
</script>

<div class="min-h-screen flex flex-col">
	<header class="text-center p-1">
		<h1 class="text-blue-600 text-4xl font-bold align-middle">Apex Ring Searcher</h1>
	</header>
	<main class="flex-1 p-1">
		<Main />
	</main>
	<footer class="text-center p-1">
		<p>
			<span>
				Powered by <a class="text-blue-600 underline" href="https://kit.svelte.dev/">SvelteKit</a>
				+
				<a class="text-blue-600 underline" href="https://tailwindcss.com/">Tailwind CSS</a>.
			</span>
			<span id="busuanzi_container_page_pv">
				Page PV: <span id="busuanzi_value_page_pv">0</span>
			</span>
			<script async src="//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js"></script>
		</p>
	</footer>
</div>
