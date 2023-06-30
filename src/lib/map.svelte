<script>
	import Ring from '$lib/ring.svelte';

	export let map, rings, results;
	let svg;
	$: ringEntries = Object.entries(rings);
	function getMousePosition(evt) {
		const CTM = svg.getScreenCTM();
		if (evt.touches) evt = evt.touches[0];
		return {
			x: (evt.clientX - CTM.e) / CTM.a,
			y: (evt.clientY - CTM.f) / CTM.d
		};
	}
	var selectedId, offset;

	const idSuffix = '-user-ring';
	function getSelectRing() {
		return rings[
			selectedId.endsWith(idSuffix) ? selectedId.slice(0, -idSuffix.length) : selectedId
		];
	}

	function startDrag(evt) {
		if (evt.target.classList.contains('draggable')) {
			selectedId = evt.target.id;
			offset = getMousePosition(evt);
			offset.x -= getSelectRing().x;
			offset.y -= getSelectRing().y;
		}
	}

	function drag(evt) {
		if (selectedId) {
			evt.preventDefault();
			var coord = getMousePosition(evt);
			getSelectRing().x = coord.x - offset.x;
			getSelectRing().y = coord.y - offset.y;
			ringEntries = ringEntries;
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
					<Ring cx={ring.x} cy={ring.y} r={ring.radius} color={ring.color} draggable={false} />
				{/if}
			{/each}
		{/each}
	</g>
	{#each ringEntries as [key, value]}
		<Ring id={key + idSuffix} cx={value.x} cy={value.y} r={value.radius} />
	{/each}
</svg>
