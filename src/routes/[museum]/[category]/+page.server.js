import { readdirSync, existsSync } from 'fs';
import { join } from 'path';

export function load({ params }) {
	const { museum, category } = params;

	const taggedPath = join(process.cwd(), 'static', 'images', museum, category, 'tagged');
	const postedPath = join(process.cwd(), 'static', 'images', museum, category, 'posted');

	let taggedImages = [];
	let postedImages = [];

	try {
		if (existsSync(taggedPath)) {
			taggedImages = readdirSync(taggedPath).map(
				(file) => `/images/${museum}/${category}/tagged/${file}`
			);
		}

		if (existsSync(postedPath)) {
			postedImages = readdirSync(postedPath).map(
				(file) => `/images/${museum}/${category}/posted/${file}`
			);
		}

		return {
			museum,
			category,
			taggedImages,
			postedImages
		};
	} catch (error) {
		console.error(`Error reading directories:`, error);
		return {
			status: 404,
			error: new Error(`Category not found: ${category}`)
		};
	}
}
