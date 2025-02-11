<script>
	import { onMount } from 'svelte';
    import Gallery from '$lib/components/Gallery.svelte';


    export let data

    let images = data.images

    let displayedImages = [];
    const imagesPerLoad = 30;
    let loading = false;

    // function loadMoreImages() {
	// 	if (loading) return;
	// 	loading = true;

	// 	const newImages = data.slice(
	// 		displayedImages.length,
	// 		displayedImages.length + imagesPerLoad
	// 	);

	// 	displayedImages = [...displayedImages, ...newImages];

	// 	loading = false;
	// }

	// function handleScroll() {
	// 	const bottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 500;
	// 	if (bottom) {
	// 		loadMoreImages();
	// 	}
	// }

	// onMount(async () => {
	// 	loadMoreImages();

	// 	window.addEventListener('scroll', handleScroll);

	// 	return () => window.removeEventListener('scroll', handleScroll);
	// });

</script>

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

	{:else}
		<p>No images</p>
	{/if}
</div>

<style>

.gallery {
    margin: 30px 20px
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