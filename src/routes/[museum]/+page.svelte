<script>
	import { onMount } from 'svelte';
	import {csvParse} from 'd3-dsv';
	import { get } from 'svelte/store';
	import Tooltip from '$lib/components/Tooltip.svelte';
	import ButtonsMenu from '$lib/components/ButtonsMenu.svelte';

	export let data;
	export let hoverData;
	let hoverInfo = [];
	let isHovered = false;

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
	const imagesPerLoad = 15;

	let categories = [
		{
			category: 'Are there people?',
			subcategory: ['people with artwork'],
			subcategory2: ['people alone', 'more than one person']
		},
		{
			category: "No people at all?",
			subcategory: ['no people in gallery', 'no people outside'],
			subcategory2: []
		}
	];

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

	onMount(async () => {
		loadMoreImages();

		window.addEventListener('scroll', handleScroll);

		return () => window.removeEventListener('scroll', handleScroll);
	});

	$: filteredTaggedImages = taggedImages.filter(
		(image) =>
			(!selectedCategory || image.category === selectedCategory) &&
			(!selectedSubcategory || image.subcategory === selectedSubcategory) &&
			(!selectedSubcategory2 || image.subcategory2 === selectedSubcategory2)

		);

	$: filteredPostedImages = postedImages.filter(
		(image) =>
			(!selectedCategory || image.category === selectedCategory) &&
			(!selectedSubcategory || image.subcategory === selectedSubcategory) &&
			(!selectedSubcategory2 || image.subcategory2 === selectedSubcategory2)

		);

	$: allImages = [...filteredTaggedImages, ...filteredPostedImages];

	$: imageCounts = allImages.reduce((counts, image) => {
		counts[image.category] = (counts[image.category] || 0) + 1;
		counts[`${image.category}-${image.subcategory}`] = (counts[`${image.category}-${image.subcategory}`] || 0) + 1;
		counts[`${image.category}-${image.subcategory2}`] = (counts[`${image.category}-${image.subcategory2}`] || 0) + 1;
		return counts;
	}, {});

</script>

<svelte:window on:scroll={handleScroll} />

<ButtonsMenu
	{categories}
	{imageCounts}
	currentPage={museum}
	bind:initialSelectedCategory={selectedCategory}
	bind:initialSelectedSubcategory={selectedSubcategory}
	bind:initialSelectedSubcategory2={selectedSubcategory2}
/>

<h1>{museum}</h1>

<div class="gallery-container">
	<div class="gallery">
		<h3>Posted Images</h3>
		{#if displayedPostedImages.length > 0}
			{#each displayedPostedImages as image}
				<img
					src={image.src}
					alt="posted image"
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
		{:else}
			<p>No posted images</p>
		{/if}
	</div>

	<div class="gallery">
		<h3>Tagged Images</h3>
		{#if displayedTaggedImages.length > 0}
			{#each displayedTaggedImages as image}
				<img
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
		width: 40%;
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

	img.highlighted {
		border: 3px solid #4caf50;
	}
</style>
