<script>
	import museums from '$lib/data/museums.json';
	import { onMount } from 'svelte';

	let categoriesList = [];
    
</script>

<div class="mainContainer">
	<ul>
		{#each museums.museums as museum}
			<li>
				<h2>{museum}</h2>
				<ul>
					{#each museums.categories as category}
						<li>
							<a href="/{museum}/{category}">
								{category}
							</a>
						</li>
					{/each}
				</ul>
			</li>
		{/each}
	</ul>
</div>
