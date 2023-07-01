<script>
	export let id,
		x,
		y,
		r,
		color = 'white',
		draggable = true;
</script>

<circle
	class={draggable ? 'draggable' : ''}
	{id}
	cx={x}
	cy={y}
	{r}
	stroke={color}
	stroke-width="2"
	fill-opacity="0"
/>
