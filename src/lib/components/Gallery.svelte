<script>
    import Tooltip from '$lib/components/Tooltip.svelte';
	export let images = [];
    export let title = '';
    export let selectedCategory = [];
    export let selectedSubcategory = [];
    export let selectedSubcategory2 = [];

	let hoverInfo = [];
	let isHovered = false;

	function handleImageClick(link) {
		window.open(link, '_blank');
	}

	function isHighlighted(image) {
		if (!selectedCategory) return false;
		if (selectedSubcategory) {
			return image.category === selectedCategory && image.subcategory === selectedSubcategory;
		}
		if (selectedSubcategory2) {
			return image.category === selectedCategory && image.subcategory2 === selectedSubcategory2;
		}
		return image.category === selectedCategory;
	}
</script>

<div class="gallery">
	<p class="gallery-title">{title}</p>
	{#if images.length > 0}
		{#each images as image}
			<img
				class="gallery-image"
				src={image.src}
				alt="tagged image"
				loading="lazy"
				class:highlighted={isHighlighted(image)}
				on:click={() => handleImageClick(image.link)}
				on:mouseover={() => {
					hoverInfo = image.date;
					isHovered = true;
				}}
				on:mouseleave={() => (isHovered = false)}
			/>
		{/each}

		{#if isHovered}
			<Tooltip data={hoverInfo} />
		{/if}
	{:else}
		<p>No tagged images</p>
	{/if}
</div>

<style>
    	.gallery-title {
		text-align: center;
		font-size: 16px
	}

	.gallery {
		width: 40%;
	}

	img {
		max-width: 100px;
		max-height: 100px;
		margin: 5px;
		cursor: pointer;
	}


	img.highlighted {
		border: 4px solid #1A068A;
	}

	@media (max-width:600px) {

		.gallery {
			width: 50%;
		}

        img {
            max-width: 80px;
			margin: 2px;
        }

    }

</style>
