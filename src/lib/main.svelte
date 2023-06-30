<script>
	import Select from '$lib/select.svelte';
	import Search from '$lib/search.svelte';
	import Map from '$lib/map.svelte';
	import CheckList from '$lib/check_list.svelte';
	let maps = [
			{ id: 'kc', name: 'Kings Canyon' },
			{ id: 'we', name: "World's Edge" },
			{ id: 'ol', name: 'Olympus' },
			{ id: 'sp', name: 'Storm Point' },
			{ id: 'bm', name: 'Broken Moon' }
		],
		map = maps[1],
		rings = {
			ring1: {
				x: 325,
				y: 325,
				radius: 173
			},
			ring2: {
				x: 325,
				y: 325,
				radius: 94
			}
		},
		results = [];
</script>

<div class="flex flex-col">
	<section class="m-auto p-2">
		<Select bind:map {maps} />
		<Search bind:results {rings} />
	</section>
	<section class="m-auto p-2">
		<Map bind:rings {map} {results} />
	</section>
	<section class="m-auto p-2">
		<CheckList bind:results />
	</section>
</div>
