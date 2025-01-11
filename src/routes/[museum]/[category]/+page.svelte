<script>
	import { onMount } from 'svelte';
	export let data;

	$: ({ museum, category, taggedImages, postedImages } = data);

	function formatCategory(cat) {
		return cat.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
	}
</script>

<h1>{museum}</h1>
<h2>{formatCategory(category)}</h2>

<div class="gallery-container">
	<div class="gallery">
		<h3>Tagged Images</h3>
		{#if taggedImages.length > 0}
			{#each taggedImages as image}
				<img src={image} alt="tagged image" loading="lazy" />
			{/each}
		{:else}
			<p>No tagged images</p>
		{/if}
	</div>
	<div class="gallery">
		<h3>Posted Images</h3>
		{#if postedImages.length > 0}
			{#each postedImages as image}
				<img src={image} alt="posted image" loading="lazy" />
			{/each}
		{:else}
			<p>No posted images</p>
		{/if}
	</div>
</div>
