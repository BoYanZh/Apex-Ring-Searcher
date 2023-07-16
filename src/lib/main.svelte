<script>
	import Select from '$lib/select.svelte';
	import Map from '$lib/map.svelte';
	import CheckList from '$lib/check_list.svelte';
	import Corner from '$lib/corner.svelte';
	import datas from '$lib/assets/datas.json';
	import { searchRings, scale, SIZE, USER_RINGS, MAX_RESULT_COUNT } from '$lib/utils.js';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { navigating } from '$app/stores';
	$: if ($navigating) updateStateFromUrl();
	let maps = Object.entries(datas).map(([k, v]) => ({
			id: k,
			name: `${v.mapName} (${Object.keys(v.rings).length})`,
			ringRs: Object.values(v.rings)[0].map((x) => scale(x[2]))
		})),
		map,
		userRings,
		searchResults,
		visibilitys,
		resultCount,
		invalidEndZones;
	const search = () => {
		searchResults = searchRings(userRings, datas[map.id].rings);
	};
	const updateStateFromUrl = () => {
		map = maps.find((e) => e.id == ($page.url.searchParams.get('map') || 'we'));
		userRings = [...Array(USER_RINGS).keys()].map((x) => {
			return {
				id: `user-ring-${x + 1}`,
				x: parseFloat($page.url.searchParams.get(`r${x + 1}x`)) || SIZE / 2,
				y: parseFloat($page.url.searchParams.get(`r${x + 1}y`)) || SIZE / 2,
				r: 0
			};
		});
		userRings.forEach((item, idx) => (item.r = map.ringRs[idx]));
		userRings = userRings;
		visibilitys = [...Array(MAX_RESULT_COUNT).keys()].map(
			(x) => ((parseInt($page.url.searchParams.get('vis')) || 1) & (1 << x)) != 0
		);
		resultCount = parseInt($page.url.searchParams.get('rc')) || MAX_RESULT_COUNT;
		invalidEndZones = datas[map.id].invalidEndZones;
		search();
	};
	const updateUrlFromState = () => {
		$page.url.searchParams.set('map', map.id);
		$page.url.searchParams.set('rc', resultCount);
		$page.url.searchParams.set(
			'vis',
			visibilitys.map((v, i) => v * 2 ** i).reduce((a, b) => a + b, 0)
		);
		for (const i of Array(USER_RINGS).keys()) {
			$page.url.searchParams.set(`r${i + 1}x`, userRings[i].x.toFixed(2));
			$page.url.searchParams.set(`r${i + 1}y`, userRings[i].y.toFixed(2));
		}
		goto(`?${$page.url.searchParams.toString()}`);
	};
	updateStateFromUrl();
</script>

<Corner />
<div class="flex flex-col">
	<section class="m-auto p-1">
		<Select bind:map bind:resultCount {maps} {search} {updateUrlFromState} />
	</section>
	<section class="m-auto p-1 w-full max-w-2xl">
		<Map bind:userRings {searchResults} {map} {resultCount} {visibilitys} {invalidEndZones} {search} {updateUrlFromState} />
	</section>
	<section class="m-auto p-1">
		<CheckList bind:visibilitys {searchResults} {resultCount} {updateUrlFromState} />
	</section>
</div>
