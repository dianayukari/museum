<script>
	import { onMount } from 'svelte';
	import { csvParse } from 'd3-dsv';
	import { get } from 'svelte/store';
	import Tooltip from '$lib/components/Tooltip.svelte';
	import ButtonsMenu from '$lib/components/ButtonsMenu.svelte';

	export let data;
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
			subcategory: ['with artwork?'],
			subcategory2: ['person alone?', 'multiple people?']
		},
		{
			category: 'No people at all?',
			subcategory: ['Indoor gallery?', 'Outdoor setting?'],
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
		counts[`${image.category}-${image.subcategory}`] =
			(counts[`${image.category}-${image.subcategory}`] || 0) + 1;
		counts[`${image.category}-${image.subcategory2}`] =
			(counts[`${image.category}-${image.subcategory2}`] || 0) + 1;
		return counts;
	}, {});

</script>

<svelte:window on:scroll={handleScroll} />
<div class="top-container">
<p class="museum-name"><span class="back-arrow"><a href="/">&#10229;</a></span>@{museum}</p>
<p class="title-page">What did they post?</p>

<ButtonsMenu
	{categories}
	{imageCounts}
	currentPage={museum}
	bind:initialSelectedCategory={selectedCategory}
	bind:initialSelectedSubcategory={selectedSubcategory}
	bind:initialSelectedSubcategory2={selectedSubcategory2}
/>

</div>

<div class="gallery-container">
	<div class="gallery">
		<p class="gallery-title">Posted by the museum</p>
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
		<p class="gallery-title">Tagged the museum</p>
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

	p {
		text-align: center;
	}

	img.highlighted {
		border: 4px solid #1A068A;
	}

</style>
