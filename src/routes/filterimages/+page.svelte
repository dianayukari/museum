<script>
	import { onMount } from 'svelte';
	import { csvParse } from 'd3-dsv';
	import { get } from 'svelte/store';
	import ButtonsMenu from '$lib/components/ButtonsMenu.svelte';
	import Gallery from '$lib/components/Gallery.svelte';
	import { base } from '$app/paths';

    export let data;

    $: ({images} = data)

    let displayedImages = [];
	let filteredImages = [];
	let selectedCategory = null;
	let loading = false;
	let x;
	let y;
	const imagesPerLoad = 50;

    let categories = [
        { category: 'front', name: 'Giving their back to the artwork' },
        { category: 'back', name: 'Facing the artwork' },
        { category: 'sitting', name: 'Sitting' },
        { category: 'side', name: 'On their side' },
        { category: 'other', name: 'Unusual' }
    ]

    
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

    $: imageCounts = images.reduce((counts, image) => {
		counts[image.category] = (counts[image.category] || 0) + 1;
		return counts;
	}, {});

</script>

<div class="top-container">
	<p class="title">How were people positioned in their pictures with artwork?</p>
    <div class="filter-container">
        <ButtonsMenu
            categories = {categories}
            {imageCounts}
            currentPage=''
            bind:selectedCategory
        />
    </div>
</div>

<div class="gallery-container">
		<Gallery
		images={displayedImages}
		{selectedCategory}
	/>
</div>


<style>

    .title {
        margin: 20px 20px 10px 1rem;
    }

    .filter-container {
        margin: 1rem;
        display: flex;
    }

    .gallery-container {
        margin: 0 1rem;
    }

    @media (max-width: 600px) {

        .title {
            margin: 20px 10px 0 10px;
        }

        .filter-container {
            margin: 15px 0 0 10px;
        }

        .gallery-container {
            margin: 0 10px;
        }
    }

</style>