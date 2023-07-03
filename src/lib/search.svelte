<script>
	import datas from '$lib/assets/datas.json';
	export let userRings, searchResults, map;
	function onSearch() {
		const similarity = (data) => {
			const scale = (x) => (x / 16384) * 650;
			let score = 0;
			const rings = data.rings;
			if (!rings) return score;
			let ringCount = Math.min(userRings.length, rings.length);
			for (let i = 0; i < ringCount; ++i) {
				const [x1, y1] = [scale(rings[i].x), scale(rings[i].y)];
				const [x2, y2] = [userRings[i].x, userRings[i].y];
				const d = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
				score += Math.exp(-d / 100) * (i + 1);
			}
			return {
				gameID: data.gameID,
				score: score * 100,
				rings: rings.map((item, idx) => {
					return {
						id: `${data.gameID}-ring-${idx}`,
						x: scale(item.x),
						y: scale(item.y),
						r: scale(item.r)
					};
				})
			};
		};
		const colorize = (data, idx) => {
			data.rings.map((x) => {
				x.color = ['#9400D3', '#FF1493', '#FF69B4', '#FFB6C1', '#FFC0CB'][idx];
				return x;
			});
			return data;
		};
		searchResults = datas
			.filter((x) => x.mapID == map.id)
			.map((x) => similarity(x))
			.sort((a, b) => b.score - a.score)
			.slice(0, 5)
			.map((x, idx) => colorize(x, idx));
	}
	function onClear() {
		searchResults = [];
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
