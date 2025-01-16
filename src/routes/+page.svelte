<script>
	import museums from '$lib/data/museums.json';
	import { onMount } from 'svelte';

	let categoriesList = [];
	// $:console.log(museums);
</script>

<div class="mainContainer">
	<h1>How do museums and people portray the space in social media?</h1>
	<div class="museum-list">
		{#each museums as museum}
			<button class="museum">
				<a href="/{museum.id}">
					<p class="museum-name">{museum.name}</p>
					<p class="location">{museum.location}</p>
				</a>
			</button>
		{/each}
	</div>
</div>

<style>
	h1 {
		text-align: center;
		font-size: 34px;
		margin: 25% 5%;
	}

	.mainContainer {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.museum-list {
		display: flex;
		align-items: center;
		list-style-type: none;
		flex-wrap: wrap;
		justify-content: center;
	}

	.museum {
		margin: 1rem;
	}
</style>
