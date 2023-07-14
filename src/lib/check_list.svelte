<script>
	export let searchResults, resultCount, visibilitys, updateUrl;
</script>

{#each searchResults.slice(0, resultCount) as result, i}
	<div class="flex items-center mb-1">
		<input
			id="default-checkbox"
			type="checkbox"
			value=""
			class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
			bind:checked={visibilitys[i]}
			on:change={updateUrl}
		/>
		<label for="default-checkbox" class="w-auto ml-2 text-sm font-medium">
			<span style="color:{result.rings[0].color}">
				Score:
				<tt>
					{result.score.toFixed(2)}
				</tt>
			</span>
			<a
				class="text-blue-600 underline"
				href={`https://apexlegendsstatus.com/tournament/game/${result.gameID}`}
				target="_blank"
			>
				[src]
			</a>
		</label>
	</div>
{/each}
