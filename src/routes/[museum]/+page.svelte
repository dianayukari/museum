<script>
	import { onMount } from 'svelte';
	import { csvParse } from 'd3-dsv';
	import { get } from 'svelte/store';
	import ButtonsMenu from '$lib/components/ButtonsMenu.svelte';
	import Gallery from '$lib/components/Gallery.svelte';
	import { base } from '$app/paths';

	export let data;


	$: ({ museum, taggedImages, postedImages } = data);

	let displayedTaggedImages = [];
	let displayedPostedImages = [];
	let filteredPostedImages = [];
	let filteredTaggedImages = [];
	let selectedCategory = null;
	let selectedSubcategory = null;
	let selectedSubcategory2 = null;
	let loading = false;
	let x;
	let y;
	const imagesPerLoad = 30;

	let categories = [
		{
			category: 'Are there people?',
			subcategory: ['with artwork?'],
			subcategory2: ['person alone?', 'multiple people?']
		},
		{
			category: 'No people at all?',
			subcategory: ['Indoor gallery?', 'Outdoor setting?'],
			subcategory2: []
		}
	];


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

	onMount(async () => {
		loadMoreImages();

		window.addEventListener('scroll', handleScroll);

		return () => window.removeEventListener('scroll', handleScroll);
	});

	function isImageInCategory(image) {
		return (!selectedCategory || image.category === selectedCategory) &&
			(!selectedSubcategory || image.subcategory === selectedSubcategory) &&
			(!selectedSubcategory2 || image.subcategory2 === selectedSubcategory2)
		}

	$: filteredTaggedImages = taggedImages.filter(isImageInCategory);
	$: filteredPostedImages = postedImages.filter(isImageInCategory);

	$: allImages = [...filteredTaggedImages, ...filteredPostedImages];

	$: imageCounts = allImages.reduce((counts, image) => {
		counts[image.category] = (counts[image.category] || 0) + 1;
		counts[`${image.category}-${image.subcategory}`] =
			(counts[`${image.category}-${image.subcategory}`] || 0) + 1;
		counts[`${image.category}-${image.subcategory2}`] =
			(counts[`${image.category}-${image.subcategory2}`] || 0) + 1;
		return counts;
	}, {});

</script>

<svelte:window on:scroll={handleScroll} />
<div class="top-container">
<p class="museum-name"><span class="back-arrow"><a href="{base}/">&#10229;</a></span>@{museum}</p>
<p class="title-page">What did they post?</p>

<ButtonsMenu
	{categories}
	{imageCounts}
	currentPage={museum}
	bind:selectedCategory
	bind:selectedSubcategory
	bind:selectedSubcategory2
/>

</div>

<div class="gallery-container">
		<Gallery
		images={displayedPostedImages}
		title="Posted by the museum"
		{selectedCategory}
		{selectedSubcategory}
		{selectedSubcategory2}
	/>
	<Gallery
		images={displayedTaggedImages}
		title="Tagged the museum"
		{selectedCategory}
		{selectedSubcategory}
		{selectedSubcategory2}
	/>
</div>

{#if loading}
	<p>Loading more images</p>
{/if}

<style>

	.top-container {
		margin: 0 50px;
	}

	.back-arrow {
		font-size: 30px;
		margin: 0 10px;
	}

	.museum-name {
		font-family: 'InputMonoCompressed';
		font-weight: bold;
		text-align: left;
	}

	.title-page {
		font-family: 'InputMonoCompressed';
		font-weight: bold;
		text-align: left;
		font-size: 24px;
	}

	.gallery-container {
		display: flex;
		justify-content: space-around;
	}

	p {
		text-align: center;
	}




</style>
