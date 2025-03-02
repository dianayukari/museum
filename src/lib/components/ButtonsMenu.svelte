<script>
	export let categories = [];
	export let selectedCategory = null;
	export let imageCounts = {};

	function selectCategory(category) {
		if (selectedCategory === category.category) {
			selectedCategory = null;
		} else {
			selectedCategory = category.category;
		}
	}

	function isCategoryActive(category) {
		return selectedCategory === category.category && 
		imageCounts[category.category] > 0;
	}

	function isCategoryDisabled(category) {
		return imageCounts[category.category] === 0;
	}

</script>

<div>
	<div class="filter-container">
		{#each categories as category}
			<div class="category">
				<button
					class:active={isCategoryActive(category)}
					on:click={() => selectCategory(category)}
					disabled={isCategoryDisabled(category)}
				>
					{category.name}
				</button>
                </div>
		{/each}
	</div>
</div>

<style>
	.filter-container {
        display: flex;
		flex-wrap: wrap;
	}

    /* .break {
		flex-basis: 100%;
		height: 0;
    } */
	
	button {
        font-size: 14px;
		font-weight: 600;
		padding: 8px 10px;
        background-color: #FCFCFA;
        border: solid 2px #101010;
        margin: 0 10px 30px 0;
        color: #101010;
        border-radius: 3px;
	}

	button.active {
		background-color: rgba(136,39,255, .2);
		border: solid 2px #8827FF;
		fill-opacity: 5%;
		color: #8827FF;
	}

    button:disabled {
        background-color: #FCFCFA;
        color: #C7C7C7;
        border-color: #C7C7C7;
    }

	@media (max-width: 600px) {

		button {
			margin: 5px 10px 5px 0;
		}
	}

</style>
