<script>
	export let rings, results, map;
	function onSearch() {
		// TODO: search here
		console.log(map);
		results = [
			{
				score: 80,
				rings: [
					{ id: 'gameId1-ring-1', x: 330, y: 320, r: rings[0].r, color: 'red' },
					{ id: 'gameId1-ring-2', x: 330, y: 320, r: rings[1].r, color: 'red' }
				],
				visible: true
			},
			{
				score: 55,
				rings: [
					{ id: 'gameId2-ring-1', x: 523, y: 523, r: rings[0].r, color: 'cyan' },
					{ id: 'gameId2-ring-2', x: 523, y: 523, r: rings[1].r, color: 'cyan' }
				],
				visible: true
			}
		];
	}
	function onClear() {
		results = [];
	}
</script>

<button
	class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 w-24 p-2.5"
	on:click={onSearch}
>
	Search
</button>

<button
	class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 w-24 p-2.5"
	on:click={onClear}
>
	Clear
</button>
