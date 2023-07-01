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
		userRings = [
			{
				id: 'user-ring-1',
				round: 1,
				x: 325,
				y: 325,
				r: 173
			},
			{
				id: 'user-ring-2',
				round: 2,
				x: 325,
				y: 325,
				r: 94
			}
		],
		searchResults = [];
</script>

<div class="flex flex-col">
	<section class="m-auto p-2">
		<Select bind:map {maps} />
		<Search bind:results={searchResults} {map} rings={userRings} />
	</section>
	<section class="m-auto p-2">
		<Map bind:rings={userRings} {map} results={searchResults} />
	</section>
	<section class="m-auto p-2">
		<CheckList bind:results={searchResults} />
	</section>
</div>
