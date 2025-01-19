<script>
	export let categories = [];
	export let selectedCategory = null;
	export let selectedSubcategory = null;
	export let selectedSubcategory2 = null;
	export let imageCounts = {};
    export let currentPage = '';

	const inactivePages = [
		'tate',
		'centrepompidou',
		'institutotomieohtake',
		'mca',
		'themuseumofmodernart',
		'mca_australia'
	];

    function isInactivePage(currentPage) {
        return inactivePages.includes(currentPage);
    }

	function selectCategory(category) {
		if (selectedCategory === category) {
			selectedCategory = null;
			selectedSubcategory = null;
			selectedSubcategory2 = null;
		} else {
			selectedCategory = category;
			selectedSubcategory = null;
			selectedSubcategory2 = null;
		}
	}

	function selectSubcategory(subcategory) {
		if (selectedSubcategory === subcategory) {
			selectedSubcategory = null;
		} else {
			selectedSubcategory = subcategory;
			selectedSubcategory2 = null;
		}
	}

	function selectSubcategory2(subcategory2) {
		if (selectedSubcategory2 === subcategory2) {
			selectedSubcategory2 = null;
		} else {
			selectedSubcategory2 = subcategory2;
			selectedSubcategory = null;
		}
	}

	function isCategoryActive(category) {
		return selectedCategory === category && imageCounts[category] > 0;
	}

	function isCategoryDisabled(category) {
		return isInactivePage(currentPage) ||
         imageCounts[category] === 0;
	}

	function isSubcategoryActive(category, subcategory) {
		return (
			selectedCategory == category &&
			selectedSubcategory === subcategory &&
			imageCounts[`${category}-${subcategory}`] > 0
		);
	}

	function isSubcategoryDisabled(category, subcategory) {
		return isInactivePage(currentPage) ||
        selectedCategory !== category ||
        imageCounts[`${category}-${subcategory}`] === 0;
	}

	function isSubcategory2Active(category, subcategory2) {
		return (
			selectedCategory === category &&
			selectedSubcategory2 === subcategory2 &&
			imageCounts[`${category}-${subcategory2}`] > 0
		);
	}

	function isSubcategory2Disabled(category, subcategory2) {
		return isInactivePage(currentPage) ||
        selectedCategory !== category ||
        imageCounts[`${category}-${subcategory2}`] === 0;
	}

</script>

<div>
	<div class="filter-container">
		{#each categories as { category, subcategory, subcategory2 }}
            <div class="break"></div>
			<div class="category">
				<button
					class:active={isCategoryActive(category)}
					on:click={() => selectCategory(category)}
					disabled={isCategoryDisabled(category)}
				>
					{category}
				</button>
                </div>
                <div class="subcategoriesContainer">
				<!-- <span class="arrow">&#8594;</span> -->
				<div class="subcategories">
					{#each subcategory as sub}
						<button
							class:active={isSubcategoryActive(category, sub)}
							on:click={() => selectSubcategory(sub)}
							disabled={isSubcategoryDisabled(category, sub)}
						>
							{sub}
						</button>
					{/each}
				</div>
				<div class="subcategories2">
					{#each subcategory2 as sub2}
						<button
							class:active={isSubcategory2Active(category, sub2)}
							on:click={() => selectSubcategory2(sub2)}
							disabled={isSubcategory2Disabled(category, sub2)}
						>
							{sub2}
						</button>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.filter-container {
		margin: 20px 0;
        display: flex;
        flex-wrap: wrap;
	}

    .subcategoriesContainer {
        display: flex;
		align-items: center;
    }

    .break {
    flex-basis: 100%;
    height: 0;
    }
	
	button {
        font-family: 'InputMono';
        font-size: 14px;
		padding: 8px 10px;
        background-color: #FCFCFA;
        border: solid 2px #1A068A;
        margin: 6px;
        color: #1A068A;
        border-radius: 3px;
	}

	button.active {
		background-color: #1A068A;
		color: white;
	}

    button:disabled {
        background-color: #FCFCFA;
        color: #C7C7C7;
        border-color: #C7C7C7;
    }

	.arrow {
		font-size: 18px;
		margin: 0 10px;
		color: #1A068A;
	}

</style>
