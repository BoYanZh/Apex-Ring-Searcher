<script>
	import Ring from '$lib/ring.svelte';

	export let map, rings, results;
	let svg;
	function getMousePosition(evt) {
		const CTM = svg.getScreenCTM();
		if (evt.touches) evt = evt.touches[0];
		return {
			x: (evt.clientX - CTM.e) / CTM.a,
			y: (evt.clientY - CTM.f) / CTM.d
		};
	}
	var selectedId, offset;

	function getSelectedRing() {
		return rings.find((element) => element.id === selectedId);
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
			rings = rings;
		}
	}

	function endDrag() {
		selectedId = null;
	}
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
		{#each results as result}
			{#each result.rings as ring}
				{#if result.visible}
					<Ring {...ring} draggable={false} />
				{/if}
			{/each}
		{/each}
	</g>
	<g id="user-rings">
		{#each rings as ring}
			<Ring {...ring} />
		{/each}
	</g>
</svg>
