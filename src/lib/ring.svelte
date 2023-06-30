<script>
	export let id,
		cx,
		cy,
		r,
		color = 'white',
		draggable = true;
</script>

<circle
	class={draggable ? 'draggable' : ''}
	{id}
	{cx}
	{cy}
	{r}
	stroke={color}
	stroke-width="2"
	fill-opacity="0"
/>
