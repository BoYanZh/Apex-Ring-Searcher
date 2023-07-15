<script>
	import { Canvg } from 'canvg';
	export let map, maps, resultCount, search, userRings, updateUrl;
	import { onMount } from 'svelte';
	import { SIZE } from '$lib/utils.js';
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

	async function copyImage() {
		const canvas = document.createElement('canvas');
		canvas.setAttribute('width', SIZE);
		canvas.setAttribute('height', SIZE);
		const ctx = canvas.getContext('2d');
		const element = document.querySelector('#svg-container');
		const v = await Canvg.from(ctx, element.outerHTML);
		v.start();
		await v.ready();
		canvas.toBlob(async (blob) => {
			await navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })]);
		});
	}
</script>

<span class="inline-block p-2">
	<label for="maps"><b>Map:</b></label>
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
	<label for="result-count"><b>Count:</b></label>
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
<button
	on:click={copyImage}
	type="button"
	class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
>
	Copy Image
</button>
