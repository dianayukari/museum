<script>
    import Tooltip from '$lib/components/Tooltip.svelte';
	import { onMount } from 'svelte';

    export let data

    let images = data.images

    let displayedImages = [];
    const imagesPerLoad = 15;
    let loading = false;
    let hoverInfo = [];
	let isHovered = false;

    function handleImageClick(link) {
		window.open(link, '_blank');
	}

    function loadMoreImages() {
		if (loading) return;
		loading = true;

		const newImages = images.slice(
			displayedImages.length,
			displayedImages.length + imagesPerLoad
		);

		displayedImages = [...displayedImages, ...newImages];

		loading = false;
	}

	function handleScroll() {
		const bottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 500;
		if (bottom) {
			loadMoreImages();
		}
	}

	onMount(async () => {
		loadMoreImages();

		window.addEventListener('scroll', handleScroll);

		return () => window.removeEventListener('scroll', handleScroll);
	});

</script>
<svelte:window on:scroll={handleScroll} />
<div class="gallery">
	{#if images.length > 0}
		{#each images as image}
			<img
				class="gallery-image"
				src={image.src}
				alt="{image.type} image"
				loading="lazy"
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
		<p>No images</p>
	{/if}
</div>

<style>

.gallery {
    margin: 1rem
}

img {
    max-width: 200px;
    max-height: 200px;
    margin: 5px;
    cursor: pointer;
}

@media (max-width:600px) {

    img {
        max-width: 90px;
        margin: 2px;
    }

}

</style>