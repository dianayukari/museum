<script>
    import Tooltip from '$lib/components/Tooltip.svelte';
	import { mode } from 'd3';
	import { onMount } from 'svelte';

    export let data

    let images = data.images

    let displayedImages = [];
    const imagesPerLoad = 30;
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

    async function fetchLatestImages() {
        try {
            const response = await fetch('https://storage.googleapis.com/storage/v1/b/social-museum/o?prefix=captured/', 
				{
					headers: {
						'Content-Type': 'application/json'
					}
				}
			);

            if (!response.ok) throw new Error('Failed to fetch latest images');

			const data = await response.json();

			images = data.items
				.filter((file) => file.name.endsWith('.jpg'))
				.map((item) => ({
					src: `https://storage.googleapis.com/social-museum/${item.name}`,
					type: 'captured',
					link: `https://storage.googleapis.com/social-museum/${item.name}`,
					date: new Date(item.timeCreated).toLocaleDateString()
				}));

			loadMoreImages();

        } catch (error) {
            console.error('Error updating images:', error);
        }
    }


	onMount(async () => {
		fetchLatestImages();

		window.addEventListener('scroll', handleScroll);

		return () => window.removeEventListener('scroll', handleScroll);
	});


</script>
<svelte:window on:scroll={handleScroll} />
<div class="gallery">
	{#if displayedImages.length > 0}
		{#each displayedImages as image}
			<img
				class="gallery-image"
				src={image.src}
				alt="{image.type} image"
				loading="lazy"
				on:click={() => handleImageClick(image.link)}
			/>
		{/each}

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