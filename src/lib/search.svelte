<script>
	export let rings, results;
	function onSearch() {
		// TODO: search here
		results = [
			{
				score: 80,
				rings: [
					{ x: 330, y: 320, radius: rings.ring1.radius, color: 'red' },
					{ x: 330, y: 320, radius: rings.ring2.radius, color: 'red' }
				],
				visible: true
			},
			{
				score: 55,
				rings: [
					{ x: 523, y: 523, radius: rings.ring1.radius, color: 'cyan' },
					{ x: 523, y: 523, radius: rings.ring2.radius, color: 'cyan' }
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
