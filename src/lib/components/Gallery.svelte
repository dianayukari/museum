<script>
    import Tooltip from '$lib/components/Tooltip.svelte';
	export let images = [];
    export let title = '';
    export let selectedCategory = [];

	let hoverPlace = [];
	let hoverPosition = [];
	let isHovered = false;

	function handleImageClick(link) {
		window.open(link, '_blank');
	}

	function isHighlighted(image) {
		if (!selectedCategory) return false;
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
				alt="{image.type} image"
				loading="lazy"
				class:highlighted={isHighlighted(image)}
				class:notHighlighted={!isHighlighted(image) && selectedCategory}
				on:click={() => handleImageClick(image.link)}
				on:mouseover={() => {
					hoverPlace = image.museum;
					hoverPosition = image.category;
					isHovered = true;
				}}
				on:mouseleave={() => (isHovered = false)}
			/>
		{/each}

		{#if isHovered}
			<Tooltip place={hoverPlace} position={hoverPosition}/>
		{/if}
	{:else}
		<p>No images</p>
	{/if}
</div>

<style>
	.gallery-title {
		text-align: center;
		font-size: 16px
	}

	.gallery {
		width: 100%;
		/* text-align: center; */
	}

	img {
		max-width: 150px;
		max-height: 150px;
		margin: 5px;
		cursor: pointer;
	}


	img.highlighted {
		border: 4px solid #8827FF;
	}

	img.notHighlighted {
		opacity: 0.3;
	}

	@media (max-width:600px) {

        img {
            max-width: 80px;
			margin: 2px;
        }

    }

</style>
