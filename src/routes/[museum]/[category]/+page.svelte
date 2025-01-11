<script>
	import { onMount } from 'svelte';
    import { categoryMap } from '$lib/categoryMap.js';
	export let data;

	$: ({ museum, category, taggedImages, postedImages } = data);

    let displayedTaggedImages = [];
    let displayedPostedImages = [];
    let loading = false;
    const imagesPerLoad = 10;

	function formatCategory(cat) {
		return categoryMap[cat] || cat;
	}

    function handleImageClick(link) {
        window.open(link, '_blank');
    }

    function loadMoreImages() {
        if (loading) return;
        loading = true;

        const newTaggedImages = taggedImages.slice(
            displayedTaggedImages.length,
            displayedTaggedImages.length + imagesPerLoad
        );

        const newPostedImages = postedImages.slice(
            displayedPostedImages.length,
            displayedPostedImages.length + imagesPerLoad
        );

        displayedTaggedImages = [...displayedTaggedImages, ...newTaggedImages];
        displayedPostedImages = [...displayedPostedImages, ...newPostedImages];
        
        loading = false;
    }

    function handleScroll() {
        const bottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 500;
        if (bottom) {
            loadMoreImages();
        }
    }

    onMount(() => {
        loadMoreImages();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    });

</script>

<svelte:window on:scroll={handleScroll} />

<h1>{museum}</h1>
<h2>{formatCategory(category)}</h2>

<div class="gallery-container">
	<div class="gallery">
		<h3>Tagged Images</h3>
		{#if displayedTaggedImages.length > 0}
			{#each displayedTaggedImages as image}
				<img src={image.src} alt="tagged image" loading="lazy" on:click={() => handleImageClick(image.link)}/>
			{/each}
		{:else}
			<p>No tagged images</p>
		{/if}
	</div>
	<div class="gallery">
		<h3>Posted Images</h3>
		{#if displayedPostedImages.length > 0}
			{#each displayedPostedImages as image}
				<img src={image} alt="posted image" loading="lazy" on:click={() => handleImageClick(image.link)} />
			{/each}
		{:else}
			<p>No posted images</p>
		{/if}
	</div>
</div>

{#if loading}
    <p>Loading more images</p>
{/if}

<style>

    .gallery-container {
        display: flex;
        justify-content: space-around;
    }

    .gallery {
        width: 45%;
    }

    img {
        max-width: 100px;
        max-height: 100px;
        margin: 5px;
        cursor: pointer;
    }

    p {
        text-align: center;
    }

</style>
