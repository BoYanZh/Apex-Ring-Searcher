<script>
	import Ring from '$lib/ring.svelte';
	import { base } from '$app/paths';
	export let map, userRings, searchResults, resultCount, visibilitys, search, updateUrlFromState;
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
		if (!evt.target.classList.contains('draggable')) return;
		selectedId = evt.target.id;
		offset = getMousePosition(evt);
		const ring = getSelectedRing();
		offset.x -= ring.x;
		offset.y -= ring.y;
	}
	function drag(evt) {
		if (!selectedId) return;
		evt.preventDefault();
		var coord = getMousePosition(evt);
		const ring = getSelectedRing();
		ring.x = coord.x - offset.x;
		ring.y = coord.y - offset.y;
		userRings = userRings;
		search();
	}
	function endDrag() {
		selectedId = null;
		updateUrlFromState();
	}
	$: actualResultCount = Math.min(resultCount, searchResults.length);
</script>

<svg
	bind:this={svg}
	role="presentation"
	on:mousedown={startDrag}
	on:mousemove={drag}
	on:mouseup={endDrag}
	on:mouseleave={endDrag}
	on:touchstart|passive={startDrag}
	on:touchmove|passive={drag}
	on:touchup={endDrag}
	on:touchleave={endDrag}
	on:touchcancel={endDrag}
	id="svg-container"
	viewBox="0 0 1024 1024"
	preserveAspectRatio="xMidYMid meet"
>
	<image id="image" href={`${base}/maps/${map?.id}.jpg`} width="1024" height="1024" />
	<g id="source-rings">
		{#each searchResults.slice(0, actualResultCount).reverse() as result, i}
			{#each result.rings as ring}
				{#if visibilitys[actualResultCount - 1 - i]}
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
