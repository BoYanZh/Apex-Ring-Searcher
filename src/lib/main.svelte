<script>
	import Select from '$lib/select.svelte';
	import Search from '$lib/search.svelte';
	import Map from '$lib/map.svelte';
	import CheckList from '$lib/check_list.svelte';
	import Corner from '$lib/corner.svelte';
	let maps = [
			{ id: 'kc', name: 'Kings Canyon', ringRs: [159, 103, 63, 32, 16] },
			{ id: 'we', name: "World's Edge", ringRs: [173, 94, 58, 29, 14] },
			{ id: 'ol', name: 'Olympus', ringRs: [144, 94, 58, 29, 14] },
			{ id: 'sp', name: 'Storm Point', ringRs: [178, 95, 51, 25, 13] },
			{ id: 'bm', name: 'Broken Moon', ringRs: [196, 98, 60, 30, 15] }
		],
		map = maps[1],
		userRings = [
			{
				id: 'user-ring-1',
				x: 325,
				y: 325,
				r: 0
			},
			{
				id: 'user-ring-2',
				x: 325,
				y: 325,
				r: 0
			}
		],
		searchResults = [],
		visibilitys = [true, false, false, false, false],
		resultCount = 5;
</script>

<Corner />
<div class="flex flex-col">
	<section class="m-auto p-1">
		<Select bind:map bind:searchResults bind:userRings bind:resultCount {maps} />
		<Search bind:searchResults {map} {userRings} />
	</section>
	<section class="m-auto p-1">
		<Map bind:userRings {map} {searchResults} {resultCount} {visibilitys} />
	</section>
	<section class="m-auto p-1">
		<CheckList bind:searchResults {resultCount} bind:visibilitys />
	</section>
</div>
