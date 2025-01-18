<script>
	import museums from '$lib/data/museums.json';
	import { onMount } from 'svelte';
	import { base } from '$app/paths';

	let categoriesList = [];
</script>

<div class="mainContainer">
	<h1>How do museums and people portray the space in social media?</h1>
	<div class="museum-list">
		{#each museums as museum}
			<a href="{base}/{museum.id}">
				<button class="museum">
					<p class="museum-name">{museum.name}</p>
					<p class="location">{museum.location}</p>
				</button>
			</a>
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
		margin-bottom: 50px;
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

	.museum-name {
		margin-bottom: 3px;
	}

	.location {
		font-size: 12px;
		margin-top: 0;
	}

	button {
		font-family: 'InputMono';
		font-size: 16px;
		padding: 0 12px;
		background-color: #fcfcfa;
		border: solid 2px #101010;
		margin: 6px;
		color: #101010;
		border-radius: 3px;
		cursor: pointer;
	}

	button:hover {
		border: solid 2px #1A068A;
		color: #1A068A;
	}
	

</style>
