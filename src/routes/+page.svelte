<script>
	import { onMount } from 'svelte';
	import { base } from '$app/paths';

	let categoriesList = [];
</script>

<div class="mainContainer">
	<!-- <video class="video-player" autoplay muted loop>
		<source src="static/media/video.webm" type="video/webm">
	</video> -->
	<div class="video-player">
		<iframe src="https://player.vimeo.com/video/1061601049?autoplay=1&muted=1" width="1920" height="1080" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" title="The social museum"></iframe>
	</div>
	<div class="content">
		<p class="legend">This is the result of a research on how people interact with artwork in photos shared on Instagram, revealing the performative nature of museum visits</p>
		<div class="btn-container">
				<a href="{base}/images/">
					<button class="btn">
						<p class="btn-p">Explore the images</p>
					</button>
				</a>
				<a href="{base}/protocol/">
					<button class="btn">
						<p class="btn-p">Behind the research</p>
					</button>
				</a>
		</div>
	</div>
</div>

<style>
	.video-player {
		margin-top: 0;
		height: 100vh;
	}

	.mainContainer {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100vw;
		height: 80vh;
		overflow: hidden;
	}

	.content {
		width: 90%;
		position: fixed;
		margin-top: 55vh;
		font-weight: 300;
	}

	.legend {
		width: 40%;
		color: #fcfcfa;
		font-weight: 500;
		text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
	}

	.btn {
		font-size: 16px;
		padding: 0 12px;
		background-color: #fcfcfa;
		border: solid 2px #101010;
		color: #101010;
		border-radius: 3px;
		cursor: pointer;
		font-weight: 500;
	}

	.btn:hover {
		border: solid 2px #8827FF;
		color: #8827FF;
	}
	

</style>
