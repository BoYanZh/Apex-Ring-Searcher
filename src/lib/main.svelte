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
				x: 325,
				y: 325,
				r: 173
			},
			{
				id: 'user-ring-2',
				x: 325,
				y: 325,
				r: 94
			}
		],
		searchResults = [],
		visibilitys = [true, false, false, false, false],
		resultCount = 5;
</script>

<div class="flex flex-col">
	<section class="m-auto p-2">
		<Select bind:map bind:resultCount {maps} />
		<Search bind:searchResults {map} {userRings} />
	</section>
	<section class="m-auto p-2">
		<Map bind:userRings {map} {searchResults} {resultCount} {visibilitys} />
	</section>
	<section class="m-auto p-2">
		<CheckList bind:searchResults {resultCount} bind:visibilitys />
	</section>
</div>
