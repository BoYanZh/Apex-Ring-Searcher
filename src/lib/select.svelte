<script>
	export let map, maps, resultCount, searchResults, userRings, datas;
	import { onMount } from 'svelte';
	import { search } from '$lib/utils.js';
	function onMapChange() {
		userRings.forEach((item, idx) => (item.r = map.ringRs[idx]));
		userRings = userRings;
		searchResults = search(userRings, datas[map.id].rings);
	}
	onMount(() => onMapChange());
</script>

<span class="p-2">
	<b>Map:</b>
	<select
		id="maps"
		class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 w-48 p-2.5"
		bind:value={map}
		on:change={onMapChange}
	>
		{#each maps as m}
			<option value={m}>
				{m.name}
			</option>
		{/each}
	</select>
</span>
<span class="p-2">
	<b>Count:</b>
	<select
		id="result-count"
		class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 w-24 p-2.5"
		bind:value={resultCount}
	>
		{#each [1, 2, 3, 4, 5] as x}
			<option value={x}>
				{x}
			</option>
		{/each}
	</select>
</span>
