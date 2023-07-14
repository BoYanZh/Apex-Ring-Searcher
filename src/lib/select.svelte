<script>
	export let map, maps, resultCount, search, userRings, updateUrl;
	import { onMount } from 'svelte';
	function onMapChange() {
		userRings.forEach((item, idx) => (item.r = map.ringRs[idx]));
		userRings = userRings;
		search();
		updateUrl();
	}
	function onResultCountChange() {
		updateUrl();
	}
	onMount(() => onMapChange());
</script>

<span class="inline-block p-2">
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
<span class="inline-block p-2">
	<b>Count:</b>
	<select
		id="result-count"
		class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 w-24 p-2.5"
		bind:value={resultCount}
		on:change={onResultCountChange}
	>
		{#each [1, 2, 3, 4, 5] as x}
			<option value={x}>
				{x}
			</option>
		{/each}
	</select>
</span>
