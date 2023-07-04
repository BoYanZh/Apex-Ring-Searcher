<script>
	import Select from '$lib/select.svelte';
	import Map from '$lib/map.svelte';
	import CheckList from '$lib/check_list.svelte';
	import Corner from '$lib/corner.svelte';
	import datas from '$lib/assets/datas.json';
	import { searchRings, scale, SIZE, USER_RINGS, MAX_RESULT_COUNT } from '$lib/utils.js';
	let maps = Object.entries(datas).map(([k, v]) => ({
			id: k,
			name: `${v.mapName} (${Object.keys(v.rings).length})`,
			ringRs: Object.values(v.rings)[0].map((x) => scale(x[2]))
		})),
		map = maps.find((e) => e.id == 'we'),
		userRings = [...Array(USER_RINGS).keys()].map((x) => {
			return { id: `user-ring-${x + 1}`, x: SIZE / 2, y: SIZE / 2, r: 0 };
		}),
		searchResults = [],
		visibilitys = [...Array(MAX_RESULT_COUNT).keys()].map((x) => x == 0),
		resultCount = MAX_RESULT_COUNT;
	const search = () => {
		searchResults = searchRings(userRings, datas[map.id].rings);
	};
</script>

<Corner />
<div class="flex flex-col">
	<section class="m-auto p-1">
		<Select bind:map bind:resultCount {maps} {userRings} {search} />
	</section>
	<section class="m-auto p-1 w-full max-w-2xl">
		<Map bind:userRings {searchResults} {map} {resultCount} {visibilitys} {search} />
	</section>
	<section class="m-auto p-1">
		<CheckList bind:visibilitys {searchResults} {resultCount} />
	</section>
</div>
