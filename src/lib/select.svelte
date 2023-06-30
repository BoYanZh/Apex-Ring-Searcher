<script>
	export let map, maps;
</script>

<select
	id="maps"
	class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 w-48 p-2.5"
	bind:value={map}
>
	{#each maps as m}
		<option value={m}>
			{m.name}
		</option>
	{/each}
</select>
