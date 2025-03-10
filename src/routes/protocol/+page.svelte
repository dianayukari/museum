<script>
	import { base } from '$app/paths';
</script>

<div class="content-container">
	<h1>How do museums and people portray the museum space in social media?</h1>

	<p class="names">Diana Yukari, Kosara Keskinova</p>

	<p class="date">March 5, 2025</p>

	<p>
		<strong>The Social Museum</strong> explores how people interact with artworks in photos shared on
		Instagram, uncovering the performative side of museum visits. Are visitors truly engaging with the
		art, or are they performing in front of the camera to have a curated presence for social media? What
		defines engagement in this context?
	</p>

	<h2>Scraping data</h2>

	<p>
		We explored Instagram feeds, analyzing photos that tagged various museums as well as images from
		the museums' official profiles. Our selection of museums was based on the article
		<a href="https://en.wikipedia.org/wiki/List_of_most-visited_museums" target="_blank">
			List of most-visited museums by region
        </a>.
		We filtered this list to focus on modern and contemporary art museums, as we believed that modern art provides
		more opportunities for interaction. A notable limitation in our research is the absence of data on
		African museums, which we consider relevant.
	</p>

	<figure>
		<img src="{base}/media/screen1.png" alt="Screenshots of instagram museum profiles" />
		<figcaption>Screenshots from Instagram</figcaption>
	</figure>

	<p>
		To gather images from the museums' profiles, we utilized
		<a href="https://github.com/medialab/minet/blob/master/docs/cli.md" target="_blank"> “minet”</a>
		for scraping pictures and developed our own scraper for tagged photos. This process yielded nearly
		40,000 images for analysis.
	</p>

	<figure>
		<img src="{base}/media/screen2.png" alt="Screenshot of website" />
		<figcaption>Screenshot from the first version of the website</figcaption>
	</figure>

	<p>
		Later, we employed OpenAI’s GPT to classify the images and streamline our analysis. The
		classification criteria included the presence of individuals (either one or multiple), whether
		they were painted or drawn representations, the percentage of space they occupied in the image,
		and whether the photo was taken inside a gallery or outside a room featuring artwork. After
		experimenting with seven different prompts, we achieved satisfactory results and ultimately
		opted to use Gemini instead of GPT due to budget constraints. Our final prompt was as follows:
	</p>
	<p><i>
		“Consider for all questions: 1. artwork as paintings or drawings or installations or sculptures
		2. real human as a person that is not a drawn or painted representation (examine skin texture,
		light behavior, eye reflections, and overall realism of features) and 3. painted human as either
		a painted or drawn person from an artwork (examine proportions, stylized anatomy, subtle
		variations of skin tone, symmetry, sharp transitions with the background and unnatural
		lighting). Is there an artwork? Are there real humans in the picture? is there only one real
		human in the picture? Are there multiple real humans in the picture? are there painted humans in
		this picture? Is the picture taken inside a room? Are there real humans inside an art gallery?
		When there’s a real person in the picture, what percentage of the space in the picture does it
		occupy?”
        </i></p>
	<p>
		This process generated a CSV file with columns categorized as true or false, allowing us to sort
		images into specific categories (e.g., people inside a gallery with art), which facilitated a
		more focused analysis of our research.
	</p>

	<figure>
		<img src="{base}/media/screen3.png" alt="Screenshot of csv" />
		<figcaption>Screenshot of the CSV file</figcaption>
	</figure>

	<h2>Deepening the research</h2>
	<p>
		Upon further reflection, we determined that our primary interest lay in examining how
		individuals behave within gallery settings and how they present themselves in relation to
		artwork. We sought to ascertain whether these behaviors were consistent across museums
		globally—a hypothesis that proved accurate. We filtered images to include only those featuring
		people taken inside galleries.
	</p>
	<p>
		While our initial results were promising, they were not flawless; therefore, we manually reviewed
		each of the 2,251 pictures fitting this description to correct any misclassifications made by
		the AI.
	</p>
	<p>
		Once we had accurately filtered images depicting people in gallery settings, we proceeded to
		analyze their poses while taking pictures for Instagram. For this analysis, we utilized Google’s
		<a href="https://github.com/google-ai-edge/mediapipe" target="_blank">“MediaPipe”</a> to map their positions. Contrary to our expectations, we discovered that
		most individuals did not adopt extravagant poses in museums; instead, we could categorize their
		stances into five simple types: giving their back to the artwork, looking at the artwork, sideways, sitting, and unusual positions. 
        The distribution of these poses was as follows:
	</p>

	<figure>
		<img src="{base}/media/screen4.png" alt="Bar chart" />
		<figcaption>Bar chart showing the distribution of visitor poses in museum settings</figcaption>
	</figure>

	<h2>Building the experience</h2>

	<p>
		For the installation, we aimed to immerse visitors in our research and prompt them to question
		various aspects of museum interactions in the age of social media. We wanted to provoke thoughts
		such as: <i>"How does the presence of a camera alter our engagement with artwork? Are we truly
		interacting with the art, or are we more focused on crafting the perfect social media post? What
		does it signify when we face the camera instead of the artwork? Is this a performance for an
		audience, or does it represent a deeper connection to our self-image in relation to the art?
		When we turn our backs to the artwork, are we dismissing it, or engaging with the space in a
		different way?"</i>
	</p>
	<p>
		With these objectives in mind, we decided to begin the installation with a video introduction
		presenting our findings and posing open questions about our dataset.
	</p>
	<p>
		To create this video, we compiled all tagged images and categorized them based on visitor
		positioning: front-facing, side views, and back-facing, with further subcategories for
		variations in angle. Each image was manually aligned in Photoshop at 50% opacity to ensure
		precision—an approach we prioritized over automated solutions to maintain accuracy.
		Once aligned, we transferred the layered composition to After Effects, where we animated the
		sequence in a continuous 360-degree motion. Each image was displayed at 70% opacity for half a
		second, with the pacing adjusted to align seamlessly with the audio. The final result is a
		dynamic visualization of the patterns we uncovered, inviting viewers to immerse themselves in
		the ways people present themselves in museum spaces. The audio itself, a voiceover describing 
        our most pressing questions on the topic, was made by OpenAi's 
         <a href="https://github.com/openai/whisper" target="_blank">"Whisper"</a>.
	</p>

	<figure>
		<img src="{base}/media/screen5.png" alt="Screenshot of csv" />
		<figcaption>Screenshot from Photoshop's working progress</figcaption>
	</figure>

	<p>
		Following the introductory video, we sought to create an interactive experience that would
		engage visitors based on their physical positioning. We implemented a camera system to detect
		visitors' poses in real-time, categorizing them according to our established classification
		system. This allowed us to reveal images from our research that corresponded to similar poses
		adopted by museum-goers on social media.
	</p>
	<p>
		At the conclusion of the experience, we prompt visitors to reflect on how they might behave in a
		gallery space, considering the insights gained from our research. A photograph is then taken of
		the visitor, which is displayed on a website where one can view all the images captured that day
		and download their own picture.
	</p>

	<figure>
		<img src="{base}/media/screen7.png" alt="Screenshot of camera system" />
		<figcaption>Screenshot of the camera system</figcaption>
	</figure>

	<p>
		The website also serves as a comprehensive repository of our research data. It contains all
		2,251 photos of people in gallery settings that we analyzed, along with filters for each pose
		category we identified (side, back, front, sitting, and other). This allows visitors to explore
		the full dataset and observe the patterns we discovered in our study.
	</p>
	<p>
		Additionally, we included this detailed description of our research protocol, outlining the
		methodologies we employed. This transparency in our research process enables visitors to
		understand the rigor behind our findings and potentially inspire further investigations into the
		intersection of social media and museum experiences.
	</p>
	<p>
		This interactive approach allows visitors to engage with our research findings and also to
		become active participants in the ongoing dialogue about social media's impact on museum
		experiences. By seeing themselves reflected in the context of our study, visitors are encouraged
		to critically examine their own behaviors and motivations when interacting with art in gallery
		spaces.
	</p>
</div>

<footer>
	<hr />
	<p class="footer">
		2025 Project for the Design Academy Eindhoven. <br /> Tutored by Studio Calibro
	</p>
</footer>

<style>
	.content-container {
		display: block;
		margin-top: 20%;
		width: 75%;
		margin: 0 auto;
	}

	h1 {
		font-size: 36px;
		line-height: 106%;
		color: #222;
        margin: 60px 0 10px 0;
		width: 90%;
	}

	.names {
		font-size: 16px;
		line-height: 24px;
		color: #999;
		margin-bottom: 0;
	}

	.date {
		font-size: 12px;
		line-height: 24px;
		color: #999;
		margin-top: 0;
	}

	h2 {
		font-size: 24px;
		line-height: 106%;
		color: #8827ff;
		margin: 20px 0 10px 0;
	}

	p {
		font-size: 16px;
		line-height: 24px;
		color: #101010;
		margin-bottom: 30px;
	}

	img {
		width: 100%;
		height: auto;
		margin-top: 10px;
		border-radius: 5px;
	}

	figcaption {
		font-size: 14px;
		line-height: 20px;
		color: #999;
		margin: 4px 0 40px 0;
	}

	a {
		color: #333;
        text-decoration: underline;
	}

	a:hover {
		color: #8827ff;
	}

	hr {
		margin: 0;
		border: none;
		height: 1.5px;
		background-color: #999;
	}

	.footer {
		font-size: 14px;
		line-height: 20px;
		color: #999;
		margin-bottom: 24px;
		margin-left: 20px;
	}

	@media (max-width: 600px) {
		.content-container {
			width: 90%;
		}

		h1 {
			font-size: 32px;
			width: 100%;
		}
	}
</style>
