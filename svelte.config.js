import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		appDir: 'app',
		adapter: adapter(),
		paths: {
			base: process.env.NODE_ENV === 'production' ? '/museum' : '',
		}
	}
};



export default config;

