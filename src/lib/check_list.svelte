<script>
	export let results;
</script>

{#each results as result}
	<div class="flex items-center mb-4">
		<input
			id="default-checkbox"
			type="checkbox"
			value=""
			class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
			bind:checked={result.visible}
		/>
		<label for="default-checkbox" class="ml-2 text-sm font-medium text-gray-900">
			Score: {result.score}
		</label>
	</div>
{/each}
