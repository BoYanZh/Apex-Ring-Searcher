<script>
	import Ring from '$lib/ring.svelte';
	import datas from '$lib/assets/datas.json';
	import { onMount } from 'svelte';
	export let map, userRings, searchResults, resultCount, visibilitys;
	let svg, selectedId, offset;
	function getMousePosition(evt) {
		const CTM = svg.getScreenCTM();
		if (evt.touches) evt = evt.touches[0];
		return {
			x: (evt.clientX - CTM.e) / CTM.a,
			y: (evt.clientY - CTM.f) / CTM.d
		};
	}
	function getSelectedRing() {
		return userRings.find((element) => element.id === selectedId);
	}
	function startDrag(evt) {
		if (evt.target.classList.contains('draggable')) {
			selectedId = evt.target.id;
			offset = getMousePosition(evt);
			const ring = getSelectedRing();
			offset.x -= ring.x;
			offset.y -= ring.y;
		}
	}
	function drag(evt) {
		if (selectedId) {
			evt.preventDefault();
			var coord = getMousePosition(evt);
			const ring = getSelectedRing();
			ring.x = coord.x - offset.x;
			ring.y = coord.y - offset.y;
			userRings = userRings;
		}
	}
	function endDrag() {
		selectedId = null;
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
			score = (((score * 100) / (1 + ringCount)) * ringCount) / 2;
			return {
				gameID: data.gameID,
				score: score,
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

	onMount(() => endDrag());
</script>

<svg
	bind:this={svg}
	role="presentation"
	on:mousedown={startDrag}
	on:mousemove={drag}
	on:mouseup={endDrag}
	on:mouseleave={endDrag}
	on:touchstart={startDrag}
	on:touchmove={drag}
	on:touchup={endDrag}
	on:touchleave={endDrag}
	on:touchcancel={endDrag}
	id="svg-container"
	width="650"
	height="650"
>
	<image id="image" href={`./maps/${map?.id}.jpg`} width="650" height="650" />
	<g id="source-rings">
		{#each searchResults.slice(0, resultCount).reverse() as result, i}
			{#each result.rings as ring}
				{#if visibilitys[resultCount - 1 - i]}
					<Ring {...ring} draggable={false} />
				{/if}
			{/each}
		{/each}
	</g>
	<g id="user-rings">
		{#each userRings as ring}
			<Ring {...ring} />
		{/each}
	</g>
</svg>
